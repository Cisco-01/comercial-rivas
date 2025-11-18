import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type=="product"] | order(name asc)`);

  try {
    //Usar sanityFetch para envíar el Query
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    // Retorna la lista de productos, o un array vacío si no se encuentra ninguno.
    return products.data || [];
  } catch (error) {
    console.error("Error al solicitar los productos:", error);
    return [];
  }
};