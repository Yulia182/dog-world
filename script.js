"use strict";

import { buildProducts } from "./buildProduct.js";
import { products } from "./products.js";
import { cashPopOut, cardPopOut, printReceipt } from "./functions.js";

// selectors
const cartItemList = document.getElementById("cart-items");
const productContainer = document.querySelector(".products-container");
const numberOfItemsInCart = document.getElementById("num-of-items");
export const cart = document.querySelector(".shopping-cart");
export const body = document.querySelector("body");
numberOfItemsInCart.classList.add("hidden");
//variables
export let subtotal = 0;
export let total = 0;
export let tax = 0.06;
export let cartList = [];

const buildCart = (name, price, desc, img) => {
  const indexOfItem = cartList.findIndex((item) => {
    return item.name === name;
  });
  if (indexOfItem === -1) {
    const newCartItem = {
      name: name,
      price: price,
      description: desc,
      img: img,
      quantity: 1,
    };

    cartList.push(newCartItem);
  } else {
    cartList[indexOfItem].quantity++;
  }
  buildUI();
};

// click handler function
const clickHandler = (e) => {
  console.dir(e.target);
  if (e.target.classList.contains("fa-cart-shopping")) {
    console.dir(cart);
    cart.classList.remove("hidden");
    // hide menu when click on cart
    productContainer.classList.add("hidden");
  }
  if (e.target.classList.contains("close")) {
    //cart.classList.add("hidden");
    e.target.parentNode.classList.add("hidden");
    productContainer.classList.remove("hidden");
  }
  if (e.target.classList.contains("cart-button")) {
    numberOfItemsInCart.classList.remove("hidden");
    const itemName = e.target.parentNode.children[1].textContent;
    const newCartItem = products.find((product) => {
      return product.name === itemName;
    });
    buildCart(
      newCartItem.name,
      newCartItem.price,
      newCartItem.description,
      newCartItem.img
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
  if (e.target.classList.contains("view-receipt")) {
    const cashDiv = document.querySelector(".cash-container");
    e.target.parentNode.classList.add("hidden");
    printReceipt();
  }
};
const buildUI = () => {
  subtotal = 0;
  while (cartItemList.firstChild) {
    cartItemList.firstChild.remove();
  }
  let displayQuantity = 0;
  cartList.forEach((item) => {
    const cartDiv = document.createElement("div");
    const cartItem = document.createElement("p");
    const cartItemPrice = document.createElement("p");
    const quantity = document.createElement("p");
    const removeButton = document.createElement("Button");
    cartItem.classList.add("item-name");
    cartDiv.classList.add("list-item");
    cartDiv.append(cartItem, cartItemPrice, quantity, removeButton);

    quantity.textContent = item.quantity;
    console.log(item.quantity);
    cartItem.textContent = item.name;
    cartItemPrice.textContent = item.price;
    removeButton.textContent = "Remove Item";
    removeButton.classList.add("remove-item");

    cartItemList.append(cartDiv);
    displayQuantity += item.quantity;
    console.log(cartItemList);
  });
  numberOfItemsInCart.innerText = displayQuantity;
  // update and append subtotal tax and total
  const subtotalPrice = document.querySelector(".subtotal-price");
  const taxRate = document.querySelector(".tax-rate");
  const totalPrice = document.querySelector(".total-price");
  for (let i = 0; i < cartList.length; i++) {
    console.log(cartList[i]);
    if (cartList[i].quantity >= 1) {
      subtotal += +cartList[i].price * cartList[i].quantity;
    }
    console.log(subtotal, tax, total);
  }
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
