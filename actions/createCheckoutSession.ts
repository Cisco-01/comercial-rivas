"use server";

import { imageUrl } from "@/lib/imageUrl";
import { stripe } from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type groupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function CreateCheckoutSession(
  items: groupedBasketItem[],
  metadata: Metadata
) {
  try {
    // verifica si alguno de los productos agrupados no tiene precio
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Uno o más productos no tienen precio");
    }

    // Search for existing customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&order_number=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/cart`;

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: "pen",
          product_data: {
            name: item.product.name || "Producto sin nombre",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
          unit_amount: Math.round(item.product.price! * 100), // precio en centavos
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error("Error creando checkout session: ", error);
    throw error;
  }
}
