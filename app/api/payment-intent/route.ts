import { createPaymentIntent } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    const { clientSecret } = await createPaymentIntent(amount);
    return NextResponse.json({ clientSecret });
  } catch (error) {
    return NextResponse.json({ error: `Failed to create payment intent: ${error}` }, { status: 500 });
  }
}