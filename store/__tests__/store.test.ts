import { describe, it, expect, beforeEach } from "vitest";
import useBasketStore from "../store";

describe("Basket store", () => {
  beforeEach(() => {
    useBasketStore.getState().clearBasket();
  });

  it("agrega items y calcula total respetando stock", () => {
    const product = { _id: "p1", price: 5, stock: 2 } as any;

    const store = useBasketStore.getState();

    store.addItem(product);
    expect(store.getItemCount("p1")).toBe(1);

    store.addItem(product);
    expect(store.getItemCount("p1")).toBe(2);

    // intentar agregar más allá del stock no aumenta
    store.addItem(product);
    expect(store.getItemCount("p1")).toBe(2);

    expect(store.getTotalPrice()).toBe(10);
  });

  it("remueve items y limpia correctamente", () => {
    const product = { _id: "p2", price: 3, stock: 5 } as any;
    const store = useBasketStore.getState();

    store.addItem(product);
    store.addItem(product);
    expect(store.getItemCount("p2")).toBe(2);

    store.removeItem(product as any);
    expect(store.getItemCount("p2")).toBe(1);

    store.removeItem(product as any);
    expect(store.getItemCount("p2")).toBe(0);
  });
});
