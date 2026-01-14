import { stripe } from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId)
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Obtener receipt (intenta por payment_intent -> charges)
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    let receiptUrl: string | null = null;
    // session may include vendor-specific fields; access safely
    const sessionRecord = session as unknown as Record<string, unknown>;
    if (typeof sessionRecord.receipt_url === "string") {
      receiptUrl = sessionRecord.receipt_url;
    }

    if (paymentIntentId) {
      const chargesList = await stripe.charges.list({
        payment_intent: paymentIntentId,
        limit: 1,
      });
      const charge = chargesList.data[0];
      receiptUrl = charge?.receipt_url ?? receiptUrl ?? null;
    }

    // Buscar la orden en Sanity por stripeCheckoutSessionId
    const order = await backendClient.fetch(
      `*[_type=="order" && stripeCheckoutSessionId == $sessionId][0]`,
      { sessionId: session.id }
    );

    let finalOrder = order;

    if (!order) {
      // Build products array from Stripe line items (try to expand product)
      const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] }
      );

      type OrderProduct = { _key?: string; product: { _type?: string; _ref?: string } | string; quantity: number };

      const sanityProducts: OrderProduct[] = lineItemsWithProduct.data.map((item: Stripe.LineItem) => ({
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: (() => {
            const prod = item.price?.product as Stripe.Product | string | undefined;
            const metaId = typeof prod === "object" ? (prod as Stripe.Product).metadata?.id : undefined;
            const prodId = typeof prod === "object" ? (prod as Stripe.Product).id : (typeof prod === "string" ? prod : undefined);
            if (metaId) return metaId;
            if (prodId) return prodId;
            const desc = item.description || (typeof prod === "object" && prod !== null ? (prod as Stripe.Product).description : undefined);
            if (desc) {
              const m = desc.match(/Product ID:\s*(\S+)/i);
              if (m) return m[1];
            }
            return undefined;
          })(),
        },
        quantity: item.quantity || 0,
      }));

      // Verify sanity products exist and try fallbacks
      const verifiedProducts: OrderProduct[] = [];
      for (const p of sanityProducts) {
        const candidate = typeof p.product === "string" ? p.product : p.product?._ref;
        const matchingLine = lineItemsWithProduct.data.find((li) => li.quantity === p.quantity) as Stripe.LineItem | undefined;
        const productName = matchingLine?.price && typeof matchingLine.price.product !== "string" ? (matchingLine.price.product as Stripe.Product).name : undefined;
        const resolved = await resolveSanityProduct(candidate, productName as string | undefined);
        if (resolved) {
          verifiedProducts.push({ ...p, product: { _type: "reference", _ref: resolved } });
        } else {
          console.warn("Skipping product for verify-session: could not resolve Sanity product for", candidate, productName);
        }
      }

      const productsToSave = verifiedProducts;

      const metadata = session.metadata || {};
      finalOrder = await backendClient.create({
        _type: "order",
        orderNumber: metadata.orderNumber ?? session.id,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: paymentIntentId ?? null,
        customerName: metadata.customerName ?? null,
        stripeCustomerId: session.customer ?? null,
        clerkUserId: metadata.clerkUserId ?? null,
        email: metadata.customerEmail ?? null,
        currency: session.currency ?? null,
        amountDiscount: session.total_details?.amount_discount
          ? session.total_details.amount_discount / 100
          : 0,
        totalPrice: session.amount_total ? session.amount_total / 100 : 0,
        products: productsToSave,
        status: session.payment_status === "paid" ? "paid" : "pending",
        orderDate: new Date().toISOString(),
        receiptUrl,
      });

      // Decrement stock in Sanity (best-effort)
      try {
        const tx = backendClient.transaction();
        productsToSave.forEach((item) => {
          let productId: string | undefined;
          if (typeof item.product === "string") productId = item.product;
          else if (item.product && "_ref" in item.product && typeof item.product._ref === "string") productId = item.product._ref;
          if (!productId) return;
          if (productId.startsWith("drafts.")) {
            productId = productId.replace(/^drafts\./, "");
          }
          tx.patch(productId, { inc: { stock: -(item.quantity || 0) } });
        });
        await tx.commit();
      } catch (err) {
        console.error("Error decrementing stock in verify-session:", err);
      }
    }

async function resolveSanityProduct(
  candidateId?: string,
  productName?: string
): Promise<string | undefined> {
  if (!candidateId) return undefined;
  let id = candidateId;
  if (id.startsWith("drafts.")) id = id.replace(/^drafts\./, "");

  try {
    const count = await backendClient.fetch('count(*[_type=="product" && _id == $id])', { id });
    if (count && count > 0) return id;

    const bySlug = await backendClient.fetch('*[_type=="product" && slug.current == $slug][0]._id', { slug: candidateId });
    if (bySlug) return bySlug;

    if (productName) {
      const byName = await backendClient.fetch('*[_type=="product" && name == $name][0]._id', { name: productName });
      if (byName) return byName;
    }
  } catch (err) {
    console.error("Error resolving Sanity product id:", err);
  }

  return undefined;
}

    return NextResponse.json(finalOrder);
  } catch (err) {
    console.error("Error verifying session:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}