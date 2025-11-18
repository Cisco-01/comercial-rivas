import { TrolleyIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const productType = defineField({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Producto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "ID del Producto",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Precio",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "model",
      title: "Modelo",
      type: "reference",
      to: [{ type: "model" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: select.subtitle,
        media: select.media,
      };
    },
  },
});
