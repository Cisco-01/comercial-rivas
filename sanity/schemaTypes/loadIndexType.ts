import { defineField, defineType } from "sanity";

export const loadIndexType = defineType({
  name: "loadIndex",
  title: "Índice de Carga",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Índice",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
