import { defineField, defineType } from "sanity";

export const icivType = defineType({
  name: "iciv",
  title: "ICIV",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Índice de Carga/Velocidad",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
