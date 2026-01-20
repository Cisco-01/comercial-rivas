import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Product } from "@/sanity.types";

// Mocks mínimos
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => React.createElement("img", { src: String(props['src']), alt: String(props['alt']) }),
}));
vi.mock("next/link", () => ({ __esModule: true, default: (props: Record<string, unknown>) => React.createElement("a", { href: String(props['href']) }, props['children'] as React.ReactNode) }));
vi.mock("@/lib/imageUrl", () => ({ imageUrl: () => ({ url: () => "/fake-image.png" }) }));

(globalThis as unknown as { React?: typeof React }).React = React;

import ProductThumb from "@/components/ProductThumb";

const mockProduct = {
  _id: "prod-1",
  name: "Neumático ejemplo",
  slug: { current: "neumatico-ejemplo" },
  price: 50,
  image: { _ref: "img-ref" },
  description: [{ _type: "block", children: [{ text: "Descripción breve" }] }],
};

describe("ProductThumb", () => {
  it("muestra nombre, descripción y precio y enlaza al detalle", () => {
    render(<ProductThumb product={mockProduct as unknown as Product} />);

    expect(screen.getByText("Neumático ejemplo")).toBeTruthy();
    expect(screen.getByText("Descripción breve")).toBeTruthy();
    expect(screen.getByText("S/50.00")).toBeTruthy();
    expect(screen.getByRole("link")).toHaveAttribute("href", `/product/${mockProduct.slug.current}`);
  });
});
