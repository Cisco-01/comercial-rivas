import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Definir el query para obtener las ordenes basadas en el id, sorted by orderDate descendiente.
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
            ...,
            products[]{
                ...,
                product->
            }
        }
    `);

  try {
    //Usar sanityFetch para envíar el Query
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: {
        userId,
      },
    });

    // Retorna la lista de órdenes, o un array vacío si no se encuentra ninguna.
    return orders.data || [];
  } catch (error) {
    console.log("Error fetching orders: ", error);
    throw new Error("Error fetching orders");
  }
}
