import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
}

function ProductsView({ products }: ProductsViewProps) {
  return (
    <div className="flex flex-col md:flex-row px-4">
      {/* Products */}
      <div className="flex-1">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default ProductsView;