// DRY application
const createElement = element => document.createElement(element);
const append = (parent, el) => parent.appendChild(el);
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el);
    });
};


const confirmationContainer = document.getElementById("confirmationContainer");
const purchasedProducts = localStorage.getItem("purchasedProducts");
const purchasedProductsParse = JSON.parse(localStorage.getItem("purchasedProducts"));

const thankYou = createElement("h1");
thankYou.innerHTML = " Thank you for your order" + " " + purchasedProductsParse.name + " :";

const totalPurchase = createElement("p")
totalPurchase.innerHTML = "Your total order is : £ " + + purchasedProductsParse.price;

const idPurchase = createElement("p");
idPurchase.innerHTML = " Here is your id order : " + purchasedProductsParse.orderId;

const home = createElement("button");
home.textContent = "Home";
classElement(home, ["confirmGoBack", "btn"]);

home.addEventListener("click", () => {
  localStorage.clear()
  window.location = '../index.html' + "#ourProducts"
});

confirmationContainer.appendChild(thankYou);
confirmationContainer.appendChild(totalPurchase);
confirmationContainer.appendChild(idPurchase);
confirmationContainer.appendChild(home);
