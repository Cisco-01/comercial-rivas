import ProductGrid from "@/components/ProductGrid";
import { searchProductsBy } from "@/sanity/lib/products/searchProductsBy";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsBy(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No se encontraron productos para: {query}
          </h1>
          <p className="text-gray-600 text-center">
            Intenta buscando con otra coincidencia
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Resultados de la búsqueda para {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;
