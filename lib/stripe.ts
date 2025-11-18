import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
  typescript: true, // Enable TypeScript support for better type safety
});

// Helper function to create a payment intent
export async function createPaymentIntent(amount: number, currency: string = "pen") {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

// Función auxiliar para recuperar una intención de pago
export async function getPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw new Error("Failed to retrieve payment intent");
  }
}