import { defineField, defineType } from "sanity";

export const speedRatingType = defineType({
  name: "speedRating",
  title: "Rango de Velocidad",
  type: "document",
  fields: [ defineField({ name: "value", title: "Rango", type: "string", validation: (Rule) => Rule.required(), }) ],
});