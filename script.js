"use strict";

import { buildProducts } from "./buildProduct.js";
import { products } from "./products.js";

// selectors
const cart = document.querySelector(".shopping-cart");
// click handler function
const clickHandler = (e) => {
  console.dir(e.target);
  if (e.target.classList.contains("fa-cart-shopping")) {
    console.dir(cart);
    cart.classList.remove("hidden");
  }
  if (e.target.classList.contains("close")) {
    cart.classList.add("hidden");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  buildProducts(products);
  //   updateUI();
  document.body.addEventListener("click", clickHandler);
});
