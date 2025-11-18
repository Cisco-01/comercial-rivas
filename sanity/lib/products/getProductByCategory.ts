import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categorySlug: string) => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
        *[_type=="product"
        && references(*[_type=="category" && slug.current == $categorySlug]._id)] | order(name asc)`);

  try {
    //Usar sanityFetch para envíar el Query
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });

    // Retorna la lista de productos, o un array vacío si no se encuentra ninguno.
    return products.data || [];
  } catch (error) {
    console.error("Error al solicitar los productos:", error);
    return [];
  }
}