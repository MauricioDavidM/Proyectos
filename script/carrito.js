import { cartArray, checkCart, cartSubtractButtonHandler, cartAddButtonHandler } from "./funciones.js";

// Definir variables y leer localStorage
export const cartIcon = document.querySelector("#cart-icon");
checkCart();
document.querySelector("#cart-page") && (document.querySelector("#cart-page").innerHTML = cartIcon.innerHTML);


// Evitar que el menú desplegable "cartIcon" se cierre al hacer click dentro 
document.querySelector(".dropdown-menu").addEventListener("click", (event) => { event.stopPropagation() });

// Manipular elementos almacenados en "cartIcon"
cartArray.forEach(product => {
  cartSubtractButtonHandler(product);
  cartAddButtonHandler(product);
});