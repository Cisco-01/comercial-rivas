import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [defineField({ name: "value", title: "Servicio", type: "string", validation: (Rule) => Rule.required(), })],
});
