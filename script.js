"use strict";

import { buildProducts } from "./buildProduct.js";
import { products } from "./products.js";

document.addEventListener("DOMContentLoaded", () => {
  buildProducts(products);
  //   updateUI();
  //   document.body.addEventListener("click");
});
