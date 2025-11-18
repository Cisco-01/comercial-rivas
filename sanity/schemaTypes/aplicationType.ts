import { defineField, defineType } from "sanity";

export const applicationType = defineType({
  name: "application",
  title: "Aplicación",
  type: "document",
  fields: [defineField({ name: "value", title: "Aplicación", type: "string" })],
});
