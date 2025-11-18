import { Diameter } from "lucide-react";
import { defineField, defineType } from "sanity";

export const widthType = defineType({
  name: "width",
  title: "Ancho",
  type: "document",
  icon: Diameter,
  fields: [
    defineField({
      name: "value",
      title: "Ancho",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
