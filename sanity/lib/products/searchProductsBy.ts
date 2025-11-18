import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsBy = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && (
       name match $searchParam ||
       pt::text(description) match $searchParam
    )] | order(name asc)
  `);

  try {
    //Usar sanityFetch para envíar el Query
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`, // Append wildcard for partial match
      },
    });

    // Retorna la lista de productos, o un array vacío si no se encuentra ninguno.
    return products.data || [];
  } catch (error) {
    console.error("Error al solicitar los productos:", error);
    return [];
  }
};