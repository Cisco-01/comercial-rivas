"use server";

import { stripe } from "@/lib/stripe";

export async function verifyCheckoutSession(
  sessionId: string,
  expectedOrderNumber: string
) {
  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"], // Optional: Expand payment_intent for additional details
    });

    // Verify the session status and metadata
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    // Verify the orderNumber matches the metadata
    if (session.metadata?.orderNumber !== expectedOrderNumber) {
      throw new Error("Invalid order number");
    }

    // Return success with relevant data
    return {
      success: true,
      session: {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
      },
    };
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return { success: false, error: "Failed to verify checkout session" };
  }
}
