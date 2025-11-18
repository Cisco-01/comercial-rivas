import { defineField, defineType } from "sanity";

export const presentationType = defineType({
  name: "presentation",
  title: "Presentación",
  type: "document",
  fields: [ defineField({ name: "value", title: "Presentación", type: "string" }) ],
});