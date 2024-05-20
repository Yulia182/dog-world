"use strict";

import { buildProducts } from "./buildProduct.js";
import { products } from "./products.js";
import { cashPopOut } from "./functions.js";
import { cardPopOut } from "./functions.js";

// selectors
const cartItemList = document.getElementById("cart-items");
export const cart = document.querySelector(".shopping-cart");
export const body = document.querySelector("body");

//variables
export let total = 0;
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
    //cart.classList.add("hidden");
    e.target.parentNode.classList.add("hidden");
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
  if (e.target.id === "cash-payment") {
    cashPopOut();
  }
  if (e.target.id === "card-payment") {
    cardPopOut();
  }
};

const buildUI = () => {
  while (cartItemList.firstChild) {
    cartItemList.firstChild.remove();
  }
  let subtotal = 0;
  let tax = 0.06;
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
    // update subtotal
    subtotal += +item.price;
  });
  // update and append subtotal tax and total
  const subtotalPrice = document.querySelector(".subtotal-price");
  const taxRate = document.querySelector(".tax-rate");
  const totalPrice = document.querySelector(".total-price");
  subtotalPrice.textContent = subtotal.toFixed(2);
  taxRate.textContent = (subtotal * tax).toFixed(2);
  total = (subtotal + subtotal * tax).toFixed(2);
  totalPrice.textContent = total;

  const cashButton = document.createElement("button");
  const cardButton = document.createElement("button");

  cashButton.textContent = "Pay with cash";
  cardButton.textContent = "Pay with card";

  cardButton.id = "card-payment";
  cashButton.id = "cash-payment";

  cartItemList.append(cashButton, cardButton);
  console.dir(cashButton);
};

document.addEventListener("DOMContentLoaded", () => {
  buildProducts(products);
  document.body.addEventListener("click", clickHandler);
});
