import { cart } from "./script.js";
import { total } from "./script.js";
import { body } from "./script.js";
export const cashPopOut = () => {
  cart.classList.add("hidden");
  const cashDiv = document.createElement("div");
  const cashForm = document.createElement("form");
  const cashLabel = document.createElement("label");
  const cashInput = document.createElement("input");
  const submitButton = document.createElement("button");
  const totalCost = document.createElement("p");
  const change = document.createElement("p");
  totalCost.textContent = `Total: $${total}`;
  submitButton.type = "submit";
  submitButton.textContent = "Pay Cash";
  cashInput.type = "text";
  submitButton.id = "sendCash";
  cashDiv.append(totalCost, cashForm, change);
  cashLabel.textContent = "Cash tendered";
  cashDiv.classList.add("cash-container");
  body.append(cashDiv);
  cashLabel.append(cashInput);
  cashForm.append(cashLabel, submitButton);

  cashForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //write onclick functionality here
    let inputAmount = cashInput.value;
    let changeAmount = (inputAmount - total).toFixed(2);
    change.textContent = `Your change: $${changeAmount}`;
    console.log(inputAmount);
  });
};
export const cardPopOut = () => {
  cart.classList.add("hidden");
};
