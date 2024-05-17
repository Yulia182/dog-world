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
  const newCartItem = { name: name, price: price, description: desc, img: img };
  cartList.push(newCartItem);
  buildUI();
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
    let itemIndex = cartList.findIndex((item) => {
      return item.name === e.target.parentNode.firstChild.textContent;
    });
    cartList.splice(itemIndex, 1);
    buildUI();
  }
};
const buildUI = () => {
  while (cartItemList.firstChild) {
    cartItemList.firstChild.remove();
  }
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

document.addEventListener("DOMContentLoaded", () => {
  buildProducts(products);
  //   updateUI();
  document.body.addEventListener("click", clickHandler);
});
