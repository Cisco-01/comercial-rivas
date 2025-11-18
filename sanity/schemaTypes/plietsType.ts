import { defineField, defineType } from "sanity";

export const plietsType = defineType({
  name: "pliets",
  title: "Pliegues",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Pliets",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
