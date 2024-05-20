import { cartList, total, body, cart, subtotal, tax } from "./script.js";
// import { subtotal } from "/script.js";
export const cashPopOut = () => {
  cart.classList.add("hidden");
  const cashDiv = document.createElement("div");
  const cashForm = document.createElement("form");
  const cashLabel = document.createElement("label");
  const cashInput = document.createElement("input");
  const submitButton = document.createElement("button");
  const totalCost = document.createElement("p");
  const change = document.createElement("p");
  const cashCloseButton = document.createElement("button");
  const viewReceipt = document.createElement("button");

  totalCost.textContent = `Total: $${total}`;
  submitButton.type = "submit";
  submitButton.textContent = "Pay Cash";
  cashInput.type = "text";
  submitButton.id = "sendCash";
  cashCloseButton.id = "cash-close-button";
  cashCloseButton.classList.add("close");
  cashCloseButton.innerText = "X";
  viewReceipt.classList.add("view-receipt");
  viewReceipt.textContent = "View Receipt";
  cashDiv.append(cashCloseButton, totalCost, cashForm, change, viewReceipt);
  cashLabel.textContent = "Cash tendered";
  cashDiv.classList.add("cash-container");
  body.append(cashDiv);
  cashLabel.append(cashInput);
  cashForm.append(cashLabel, submitButton);

  cashForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //write onclick functionality here
    let inputAmount = cashInput.value;
    if (total <= inputAmount) {
      let changeAmount = (inputAmount - total).toFixed(2);
      change.textContent = `Your change: $${changeAmount}`;
    } else {
      alert("Enter the correct amount!");
    }
  });
};
export const cardPopOut = () => {
  cart.classList.add("hidden");
  //creating the elements in the card form
  const cardDiv = document.createElement("div");
  const cardCloseButton = document.createElement("button");
  const cardForm = document.createElement("form");
  const cardNumLabel = document.createElement("label");
  const cardNumInput = document.createElement("input");
  const cardSsvLabel = document.createElement("label");
  const cardSsvInput = document.createElement("input");
  const expirationDateLabel = document.createElement("label");
  const expirationDateInput = document.createElement("input");
  const submitButton = document.createElement("button");

  //Asigning values and text to page
  cardDiv.classList.add("card-container");
  cardDiv.style.display = "fixed";
  cardCloseButton.innerText = "X";
  cardCloseButton.classList.add("close");
  cardNumLabel.textContent = "Card number: ";
  cardNumInput.placeholder = "XXXX XXXX XXXX XXXX";
  cardNumInput.type = "password";
  cardSsvLabel.textContent = "SSV: ";
  cardSsvInput.placeholder = "XXX";
  expirationDateLabel.textContent = "Expiration Date: ";
  expirationDateInput.placeholder = "MM/YY";
  submitButton.textContent = "Submit";
  //appending elements to page
  body.append(cardDiv);
  cardDiv.append(cardCloseButton, cardForm);
  cardForm.append(
    cardNumLabel,
    cardSsvLabel,
    expirationDateLabel,
    submitButton
  );
  cardNumLabel.append(cardNumInput);
  cardSsvLabel.append(cardSsvInput);
  expirationDateLabel.append(expirationDateInput);

  //submit listener
  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(cardNumInput.value);

    //using regex to validate card

    let cardNumValid = false;
    let ssvValid = false;
    let expirationDateValid = false;

    const cardRegex =
      /([0-9]{16})|([0-9]{4})[- ]([0-9]{4})[- ]([0-9]{4})[- ]([0-9]{4})/;
    const ssvRegex = /([0-9]{3})/;
    const expirationDateRegex = /([0-9]{2}\/[0-9]{2})/;
    if (!cardRegex.test(cardNumInput.value)) {
      console.log("invalid card");
      cardNumInput.value = "INVALID CARD";
      cardNumInput.classList.add("invalid");
    } else {
      cardNumValid = true;
      cardNumInput.classList.remove("invalid");
    }
    if (!ssvRegex.test(cardSsvInput.value)) {
      console.log("invalid ssv");
      cardSsvInput.value = "INVALID SSV";
      cardSsvInput.classList.add("invalid");
    } else {
      ssvValid = true;
      cardSsvInput.classList.remove("invalid");
    }
    if (!expirationDateRegex.test(expirationDateInput.value)) {
      console.log("invalid ssv");
      expirationDateInput.value = "INVALID EXPIRATION DATE";
      expirationDateInput.classList.add("invalid");
    } else {
      expirationDateValid = true;
      expirationDateInput.classList.remove("invalid");
    }
    if (cardNumValid & ssvValid & expirationDateValid) {
      cardDiv.classList.add("hidden");
      printReceipt();
    }
  });
};
export const printReceipt = () => {
  const cashDiv = document.querySelector(".cash-container");
  cashDiv.classList.add("hidden");
  //popuating receipt
  const receiptDiv = document.createElement("div");
  const totalText = document.createElement("p");
  const subtotalText = document.createElement("p");
  const taxText = document.createElement("p");
  const cartItems = document.createElement("ul");
  const closeButton = document.createElement("button");
  receiptDiv.classList.add("receipt-container");
  closeButton.textContent = "X";
  closeButton.classList.add("close");
  cartList.forEach((element) => {
    let cartItem = document.createElement("li");
    let itemImage = document.createElement("img");
    let itemPrice = document.createElement("p");
    itemImage.classList.add("receipt-image");
    itemImage.src = element.img;
    itemPrice.textContent = element.price;
    cartItem.textContent = element.name;
    cartItems.append(cartItem, itemImage, itemPrice);
  });
  totalText.textContent = total;
  subtotalText.textContent = subtotal;
  taxText.textContent = (+tax * subtotal).toFixed(2);
  body.append(receiptDiv);
  receiptDiv.append(closeButton, subtotalText, taxText, totalText, cartItems);
};
