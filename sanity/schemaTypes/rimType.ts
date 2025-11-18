import { CircleDotDashed } from "lucide-react";
import { defineField, defineType } from "sanity";

export const rimType = defineType({
  name: "rim",
  title: "Aro",
  type: "document",
  icon: CircleDotDashed,
  fields: [
    defineField({ name: "value", title: "Tamaño del Aro", type: "string", validation: (Rule) => Rule.required(), }),
  ],
});
