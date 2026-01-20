import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/sanity/lib/live", () => {
  return {
    sanityFetch: vi.fn(),
  };
});

import { getAllProducts } from "../getAllProducts";
import { sanityFetch } from "@/sanity/lib/live";

describe("getAllProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna la lista de productos cuando sanity responde", async () => {
    (sanityFetch as any).mockResolvedValue({ data: [{ _id: "p1", name: "Prod 1" }] });

    const res = await getAllProducts();

    expect(res).toEqual([{ _id: "p1", name: "Prod 1" }]);
  });

  it("retorna array vacío en caso de error", async () => {
    (sanityFetch as any).mockRejectedValue(new Error("Boom"));

    const res = await getAllProducts();

    expect(res).toEqual([]);
  });
});
