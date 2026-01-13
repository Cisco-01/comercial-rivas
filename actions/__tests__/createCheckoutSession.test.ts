import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/stripe", () => {
  return {
    stripe: {
      customers: { list: vi.fn() },
      checkout: { sessions: { create: vi.fn() } },
    },
  };
});

vi.mock("@/lib/imageUrl", () => {
  return {
    imageUrl: (img: any) => ({ url: () => "https://example.com/image.jpg" }),
  };
});

import { CreateCheckoutSession } from "../createCheckoutSession";
import { stripe } from "@/lib/stripe";

describe("CreateCheckoutSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lanza error si algún producto no tiene precio", async () => {
    const items = [
      {
        product: { _id: "p1", name: "Prod 1", price: undefined, image: null },
        quantity: 1,
      },
    ];

    const metadata = {
      orderNumber: "123",
      customerName: "Cliente",
      customerEmail: "a@b.com",
      clerkUserId: "u1",
    } as const;

    await expect(CreateCheckoutSession(items as any, metadata as any)).rejects.toThrow(
      "Uno o más productos no tienen precio"
    );
  });

  it("crea sesión y retorna la url cuando todo es correcto", async () => {
    (stripe.customers.list as any).mockResolvedValue({ data: [] });

    const fakeSession = { url: "https://checkout.stripe.test/session/abc123" };
    (stripe.checkout.sessions.create as any).mockResolvedValue(fakeSession);

    const items = [
      {
        product: { _id: "p1", name: "Prod 1", price: 10.5, image: "img-ref" },
        quantity: 2,
      },
    ];

    const metadata = {
      orderNumber: "123",
      customerName: "Cliente",
      customerEmail: "a@b.com",
      clerkUserId: "u1",
    } as any;

    const url = await CreateCheckoutSession(items as any, metadata);

    expect(url).toBe(fakeSession.url);

    expect(stripe.checkout.sessions.create).toHaveBeenCalled();
    const callArgs = (stripe.checkout.sessions.create as any).mock.calls[0][0];
    expect(callArgs.line_items[0].price_data.unit_amount).toBe(Math.round(10.5 * 100));
    expect(callArgs.line_items[0].quantity).toBe(2);
  });
});
