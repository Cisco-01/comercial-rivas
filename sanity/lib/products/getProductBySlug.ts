import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(`
        *[_type=="product" && slug.current == $slug]{
          name,
          slug,
          image,
          description,
          price,
          category->{
            title,
            slug
          },
          stock,
          brand->{
            name,
            logo
          },
          model->{
            name
          },
          width->{
            value
          },
          profile->{
            value
          },
          rim->{
            value
          },
          allowedRim->{
            value
          },
          application->{
            value
          },
          service->{
            value
          },
          iciv->{
            value
          },
          speedRating->{
            value
          },
          loadIndex->{
            value
          },
          pliets->{
            value
          },
          presentation->{
            value
          },
        } | order(name asc) [0]`);

  try {
    //Usar sanityFetch para envíar el Query
    const products = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });

    // Retorna la lista de productos, o un array vacío si no se encuentra ninguno.
    return products.data || [];
  } catch (error) {
    console.error("Error al solicitar los productos:", error);
    return [];
  }
};
