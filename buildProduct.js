const toyContainer = document.querySelector(".toys ul");
const foodContainer = document.querySelector(".food ul");
const clothesContainer = document.querySelector(".clothes ul");
export const buildProducts = (products) => {
  products.forEach((item, index) => {
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");
    const newDesc = document.createElement("p");
    const addToCartButton = document.createElement("button");
    const newPrice = document.createElement("p");
    newDiv.classList.add("surrounding-div");
    newImg.classList.add("product-img");
    newDesc.classList.add("desc");
    addToCartButton.classList.add("cart-button");
    newPrice.classList.add("price");
    newImg.src = item.img;
    if (item.category === "toy") {
      toyContainer.append(newImg);
    } else if (item.category === "food") {
      foodContainer.append(newImg);
    } else if (item.category === "clothes") {
      clothesContainer.append(newImg);
    }
  });
};
