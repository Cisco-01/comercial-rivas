import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { salesType } from "./salesType";
import { widthType } from "./widthType";
import { allowedRimType } from "./allowedRimType";
import { applicationType } from "./aplicationType";
import { brandType } from "./brandType";
import { icivType } from "./icivType";
import { loadIndexType } from "./loadIndexType";
import { modelType } from "./modelType";
import { plietsType } from "./plietsType";
import { presentationType } from "./presentationType";
import { profileType } from "./profileType";
import { rimType } from "./rimType";
import { serviceType } from "./serviceType";
import { speedRatingType } from "./speedRatingType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    productType,
    orderType,
    salesType,
    widthType,
    allowedRimType,
    applicationType,
    brandType,
    icivType,
    loadIndexType,
    modelType,
    plietsType,
    presentationType,
    profileType,
    rimType,
    serviceType,
    speedRatingType,
  ],
};
