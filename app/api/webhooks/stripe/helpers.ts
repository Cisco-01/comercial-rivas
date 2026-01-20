import { Metadata } from "@/actions/createCheckoutSession";
import { stripe } from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import Stripe from "stripe";

export async function createSanityOrder(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    productId: (item.price?.product as Stripe.Product)?.metadata?.id,
    quantity: item.quantity || 0,
  }));

  const paymentIntentId =
    typeof payment_intent === "string" ? payment_intent : payment_intent?.id;

  const chargesList = await stripe.charges.list({
    payment_intent: paymentIntentId,
    limit: 1,
  });

  const charge = chargesList.data[0];
  const receiptUrl = charge?.receipt_url ?? null;

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts.map((p) => ({
      _key: crypto.randomUUID(),
      product: { _type: "reference", _ref: p.productId },
      quantity: p.quantity,
    })),
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    receiptUrl,
  });

  await decrementStock(sanityProducts);

  return order;
}

interface ProductQuantity {
  productId: string;
  quantity: number;
}

export async function decrementStock(products: ProductQuantity[]): Promise<void> {
  const tx: ReturnType<typeof backendClient.transaction> = backendClient.transaction();

  products.forEach((item) => {
    tx.patch(item.productId, {
      inc: { stock: -item.quantity },
    });
  });

  await tx.commit();
}
