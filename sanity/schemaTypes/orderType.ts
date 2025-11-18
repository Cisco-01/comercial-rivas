import { Receipt } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Órden",
  type: "document",
  icon: Receipt,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Número de Órden",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Store User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Nombre del Cliente",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email del Cliente",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "products",
      title: "Productos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Productos comprados",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Cantidad comprada",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Precio Total",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Monto de descuento",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "status",
      title: "Estado del pedido",
      type: "string",
      options: {
        list: [
          { title: "Pendiente", value: "pending" },
          { title: "Pagado", value: "paid" },
          { title: "Enviado", value: "shipped" },
          { title: "Recibido", value: "delivered" },
          { title: "Cancelado", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "orderDate",
      title: "Fecha de compra",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
        media: Receipt,
      };
    },
  },
});
