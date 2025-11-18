import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
       *[_type=="category"] | order(name asc)`);

  try {
    //Usar sanityFetch para envíar el Query
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    // Retorna la lista de categorias, o un array vacío si no se encuentra ninguno.
    return categories.data || [];
  } catch (error) {
    console.error("Error al solicitar las categorias:", error);
    return [];
  }
};
