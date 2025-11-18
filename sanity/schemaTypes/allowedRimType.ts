import { defineField, defineType } from "sanity";

export const allowedRimType = defineType({
  name: "allowedRim",
  title: "Aro permitido",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Aro permitido",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
