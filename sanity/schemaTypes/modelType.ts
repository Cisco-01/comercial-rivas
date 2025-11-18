import { Component } from "lucide-react";
import { defineField, defineType } from "sanity";

export const modelType = defineType({
  name: "model",
  title: "Modelo",
  type: "document",
  icon: Component,
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
