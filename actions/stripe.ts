"use server";
import { createPaymentIntent } from "@/lib/stripe";

export async function processPayment(amount: number) {
  try {
    const { clientSecret } = await createPaymentIntent(amount);
    return { success: true, clientSecret };
  } catch (error) {
    return { success: false, error: "Payment processing failed" };
  }
}