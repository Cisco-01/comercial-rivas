"use client";
import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export default function DisableDraftMode() {
  const router = useRouter();
  const environment = useDraftModeEnvironment();

  // Solo mostrar el botón cuando se esté fuera de presentation tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  const handleClick = async () => {
    await fetch("/api/draft-mode/disable");
    router.refresh();
  };

  return (
    <button
      className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2 z-50"
      onClick={handleClick}
    >
      Desactivar Draft Mode
    </button>
  );
}
