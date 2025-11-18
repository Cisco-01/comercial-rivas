"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/store/store";
import { verifyCheckoutSession } from "@/actions/verifyCheckoutSession";
import Loader from "@/components/Loader";

function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderNumber = searchParams.get("order_number");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function verifySession() {
      if (!sessionId || !orderNumber) {
        setError("Missing session ID or order number");
        setLoading(false);
        return;
      }

      try {
        const result = await verifyCheckoutSession(sessionId, orderNumber);
        if (result.success) {
          clearBasket(); // Clear basket only after successful verification
          setVerified(true);
        } else {
          setError(result.error || "Failed to verify payment");
        }
      } catch (err) {
        setError(`An unexpected error occurred: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, [sessionId, orderNumber, clearBasket]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
        <Link href="/">
          <Button className="mt-4">Regresar a Inicio</Button>
        </Link>
      </div>
    );
  }

  if (!verified) {
    return <div>Verifying payment...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-semibold mb-6 text-center">
          Pago completado con éxito <br />
        </h1>

        <div className="border-y border-gray-200 py-6 mb-6">
          <p className="text-gray-700 text-lg mb-4 text-center">
            Tu orden ha sido confirmada y se enviará en breve.
          </p>
          <div className="space-y-2 justify-center text-start items-center w-full flex">
            {orderNumber && (
              <p className="text-gray-600 flex items-center sm:items-end space-x-5">
                <span className="text-sm font-mono font-thin">
                  Tu n° de orden es:
                </span>
                <span className="text-sm font-mono font-thin text-green-600 text-end text-nowrap relative group cursor-pointer">
                  {orderNumber.length > 7
                    ? `${orderNumber.slice(0, 7)}...${orderNumber.slice(-7)}`
                    : orderNumber}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                    style={{ minWidth: "max-content" }}
                  >
                    {orderNumber}
                  </span>
                </span>
              </p>
            )}
            {/*sessionId && (
              <p className="text-gray-600 flex">
                <span>ID de la transacción:</span>
                <span className="font-mono text-sm">{sessionId}</span>
              </p>
            )*/}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 italic text-center text-sm font-serif">
            Un mail de confirmación ha sido enviado a tu correo electrónico
            conectado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">Ver detalle de la orden</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continuar comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
