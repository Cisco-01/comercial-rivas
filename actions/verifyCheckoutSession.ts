"use server";

import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function verifyCheckoutSession(
  sessionId: string,
  expectedOrderNumber: string
) {
  try {
    // Retrieve the checkout session from Stripe
    const session = (await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "payment_intent.charges"],
    }));

    // Verify the session status and metadata
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    // Verify the orderNumber matches the metadata
    if (session.metadata?.orderNumber !== expectedOrderNumber) {
      throw new Error("Invalid order number");
    }

    // --- Get the payment_intent ID and fetch charges ---
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (!paymentIntentId) {
      throw new Error("PaymentIntent not found");
    }

    // Fetch the latest charge for the payment intent
    const chargesList = await stripe.charges.list({
      payment_intent: paymentIntentId,
      limit: 1,
    });

    const charge = chargesList.data[0];
    const receiptUrl = charge?.receipt_url ?? null;

    // Return success with relevant data
    return {
      success: true,
      session: {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
        receipt_url: receiptUrl,
      },
    };
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return { success: false, error: "Failed to verify checkout session" };
  }
}
