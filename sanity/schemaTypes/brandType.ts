import { Tags } from "lucide-react";
import { defineType, defineField } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "Marca",
  type: "document",
  icon: Tags,
  fields: [
    defineField({
      name: "name",
      title: "Nombre de la marca",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});