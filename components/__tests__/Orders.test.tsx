import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

// Mocks necesarios para componente server
vi.mock("server-only", () => ({}));
vi.mock("@clerk/nextjs/server", () => ({ auth: async () => ({ userId: "user_1" }) }));
vi.mock("@/sanity/lib/orders/getMyOrders", () => ({ getMyOrders: vi.fn(async () => [
  { orderNumber: "ORD-123", orderDate: new Date().toISOString(), status: "paid", totalPrice: 150, currency: "PEN", amountDiscount: 10, products: [{ product: { _id: "p1", name: "Neumático ejemplo", image: { _ref: "img-ref" }, price: 50 }, quantity: 1 }], receiptUrl: "https://example.com/receipt.pdf" }
] ) }));
vi.mock("@/lib/imageUrl", () => ({ imageUrl: () => ({ url: () => "/fake-image.png" }) }));

(globalThis as unknown as { React?: typeof React }).React = React;

import Orders from "@/app/(store)/orders/page";

describe("Orders (server)", () => {
  it("renderiza las órdenes del usuario usando getMyOrders", async () => {
    const jsx = await (Orders as unknown as () => Promise<unknown>)();
    render(jsx);

    expect(screen.getByText("Historial de pedidos")).toBeTruthy();
    expect(screen.getByText("ORD-123")).toBeTruthy();
    expect(screen.getByText("Ver comprobante")).toBeTruthy();
  });
});
