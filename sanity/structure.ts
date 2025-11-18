import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Grupo IAL Ecommerce")
    .items([
      S.documentTypeListItem("category").title("Categorias"),
      S.documentTypeListItem("brand").title("Marcas"),
      S.documentTypeListItem("model").title("Modelos"),
      S.divider(),
      S.documentTypeListItem("product").title("Productos"),
      S.documentTypeListItem("order").title("Comprobantes"),
      S.documentTypeListItem("sale").title("Cupones"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "category",
            "brand",
            "model",
            "order",
            "product",
            "sale",
            "width",
            "profile",
            "rim",
            "speedRating",
            "allowedRim",
            "application",
            "service",
            "iciv",
            "pliets",
            "presentation",
            "loadIndex",
          ].includes(item.getId()!)
      ),
    ]);
