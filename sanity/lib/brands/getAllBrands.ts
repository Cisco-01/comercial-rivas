import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBrands = async () => {
  const ALL_BRANDS_QUERY = defineQuery(`
       *[_type=="brand"] | order(name asc)`);

  try {
    //Usar sanityFetch para envíar el Query
    const brands = await sanityFetch({
      query: ALL_BRANDS_QUERY,
    });

    // Retorna la lista de categorias, o un array vacío si no se encuentra ninguno.
    return brands.data || [];
  } catch (error) {
    console.error("Error al solicitar las marcas:", error);
    return [];
  }
};