"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  // Usar useEffect para establecer el isClient en true luego de que se monte el componente.
  // Esto asegura de que el componente solo se renderice en el lado del cliente. previniendo hydration errors debido al server/client mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-md">
        <button
          onClick={() => removeItem(product)}
          className={`w-8 h-8 rounded-full flex items-start justify-center  transition-colors duration-200 ${
            itemCount === 0
              ? "cursor-not-allowed"
              : ""
          }`}
          disabled={itemCount === 0 || disabled}
        >
          <span
            className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
          >
            -
          </span>
        </button>

        <span className="px-4 text-center font-light text-base">{itemCount}</span>
        <button
          onClick={() => addItem(product)}
          className={`w-8 h-8 rounded-full flex items-start justify-center transition-colors duration-200 ${
            disabled
              ? "cursor-not-allowed"
              : ""
          }`}
          disabled={disabled}
        >
          <span className="text-xl font-bold text-black">+</span>
        </button>
      </div>
    </div>
  );
}

export default AddToBasketButton;
