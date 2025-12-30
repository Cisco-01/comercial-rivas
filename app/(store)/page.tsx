import BlackFridayBanner from "@/components/BlackFridayBanner";
import MarcasWall from "@/components/MarcasWall";
import ProductsView from "@/components/ProductsView";
import Slider from "@/components/Slider";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  //console.log(crypto.randomUUID().slice(0, 5) + `>>> Rerendered the home page cache with ${products.length} products and ${getEnabledCategories.length} categories`);
  
  return (
    <div>
      <Slider />
      <BlackFridayBanner />

      {/* Renderizar los productos */}
      <ProductsView products={products} categories={categories} />
      <MarcasWall />
    </div>
  );
}