import { TicketPercent } from "lucide-react";
import { defineField } from "sanity";

export const salesType = defineField({
  name: "sale",
  title: "Descuento",
  type: "document",
  icon: TicketPercent,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Nombre del descuento",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Descripción del descuento",
    }),
    defineField({
      name: "discountAmount",
      type: "number",
      title: "Monto del descuento",
      description: "Importe de descuento en porcentaje o valor fijo",
    }),
    defineField({
      name: "couponCode",
      type: "string",
      title: "Código de cupón",
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valido desde",
    }),
    defineField({
      name: "validUntil",
      type: "datetime",
      title: "Valido hasta",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Está Activo",
      description: "Alternar para activar/desactivar el descuento",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, discountAmount, couponCode, isActive } = selection;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      };
    },
  },
});
