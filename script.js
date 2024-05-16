"use strict";

import { buildProducts } from "./buildProduct.js";
import { products } from "./products.js";

// selectors
const cartItemList = document.getElementById("cart-items");
const cart = document.querySelector(".shopping-cart");

//variables
let total = 0;
let subtotal = 0;
let tax = 0.06;
let cartList = [];

const buildCart = (name, price, desc, img) => {
  while (cartItemList.firstChild) {
    cartItemList.firstChild.remove();
  }
  const newCartItem = { name: name, price: price, description: desc, img: img };
  cartList.push(newCartItem);
  cartList.forEach((item) => {
    const cartDiv = document.createElement("div");
    const cartItem = document.createElement("p");
    const cartItemPrice = document.createElement("p");
    const removeButton = document.createElement("Button");
    cartItem.textContent = item.name;
    cartItemPrice.textContent = item.price;
    removeButton.textContent = "Remove Item";
    removeButton.classList.add("remove-item");
    cartDiv.append(cartItem, cartItemPrice, removeButton);
    cartItemList.append(cartDiv);
  });
};
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
  if (e.target.classList.contains("cart-button")) {
    buildCart(
      e.target.parentNode.children[1].textContent,
      e.target.parentNode.children[3].textContent,
      e.target.parentNode.children[2].textContent,
      e.target.parentNode.children[0].textContent
    );
    console.log(cartList);
  }
  if (e.target.classList.contains("remove-item")) {
  }
};

document.addEventListener("DOMContentLoaded", () => {
  buildProducts(products);
  //   updateUI();
  document.body.addEventListener("click", clickHandler);
});
