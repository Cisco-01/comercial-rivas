import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe", () => {
  return {
    stripe: {
      checkout: { sessions: { listLineItems: vi.fn() } },
      charges: { list: vi.fn() },
    },
  };
});

vi.mock("@/sanity/lib/backendClient", () => {
  return {
    backendClient: {
      create: vi.fn(),
      transaction: vi.fn(),
    },
  };
});

import { stripe } from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { createSanityOrder } from "../helpers";

describe("createSanityOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crea orden y decrementa stock en Sanity", async () => {
    const fakeSession: unknown = {
      id: "sess_1",
      amount_total: 1500,
      currency: "usd",
      metadata: {
        orderNumber: "123",
        customerName: "Cliente",
        customerEmail: "a@b.com",
        clerkUserId: "u1",
      },
      payment_intent: "pi_1",
      customer: "cus_1",
      total_details: { amount_discount: 0 },
    };

    // Mock line items
    (stripe.checkout.sessions.listLineItems as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({
      data: [
        {
          price: { product: { metadata: { id: "prod_1" } } },
          quantity: 2,
        },
      ],
    });

    // Mock charges list
    (stripe.charges.list as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({ data: [{ receipt_url: "https://r" }] });

    // Mock backendClient.create
    (backendClient.create as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({ _id: "order_1" });

    // Mock transaction
    type PatchObj = { inc?: { stock?: number } } | unknown;
    const patches: { id: string; patchObj: PatchObj }[] = [];
    const txMock = {
      patch: (id: string, patchObj: PatchObj) => {
        patches.push({ id, patchObj });
      },
      commit: vi.fn().mockResolvedValue(true),
    };

    (backendClient.transaction as unknown as { mockReturnValue: (v: unknown) => void }).mockReturnValue(txMock);

    await (createSanityOrder as unknown as (s: unknown) => Promise<unknown>)(fakeSession);

    expect(backendClient.create).toHaveBeenCalled();
    // Verificar que se hicieron patches para descontar stock
    expect(patches.length).toBe(1);
    expect(patches[0].id).toBe("prod_1");
    expect(patches[0].patchObj).toEqual({ inc: { stock: -2 } });

    // Verificar que commit fue llamado
    expect(txMock.commit).toHaveBeenCalled();
  });
});
