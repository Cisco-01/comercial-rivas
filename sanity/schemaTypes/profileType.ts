import { LoaderPinwheel } from "lucide-react";
import { defineField, defineType } from "sanity";

export const profileType = defineType({
  name: "profile",
  title: "Perfil",
  type: "document",
  icon: LoaderPinwheel,
  fields: [
    defineField({
      name: "value",
      title: "Perfil",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
