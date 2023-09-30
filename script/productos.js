import { cartArray, add, subtract, checkCart, cartSubtractButtonHandler, cartAddButtonHandler } from "./funciones.js";
import { cartIcon } from "./carrito.js";

// Definir clases y objetos. Pushear objetos al array "cardList"
let id = 0;

class Product {
  constructor(id, amount, type, name, description, price) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.name = name;
    this.description = description;
    this.price = price;
  };
};

const crp0001 = new Product(id += 1, 0, "carpeta", "crp0001", "Archivador Cherry", 1.75);
const crp0002 = new Product(id += 1, 0, "carpeta", "crp0002", "Archivador Summer", 1.50);
const crp0003 = new Product(id += 1, 0, "carpeta", "crp0003", "Archivador Spring", 1.60);
const crp0004 = new Product(id += 1, 0, "carpeta", "crp0004", "Archivador Rainbow", 2.00);
const agn0001 = new Product(id += 1, 0, "agenda", "agn0001", "Agenda Abstrac Marfil", 1.25);
const agn0002 = new Product(id += 1, 0, "agenda", "agn0002", "Agenda Difuminado Azul", 2.00);
const agn0003 = new Product(id += 1, 0, "agenda", "agn0003", "Agenda Flores Turquesa", 1.00);
const agn0004 = new Product(id += 1, 0, "agenda", "agn0004", "Agenda Colors Azul", 1.50);
const scl0001 = new Product(id += 1, 0, "escolar", "scl0001", "Bolígrafos Hannai", 3.50);
const scl0002 = new Product(id += 1, 0, "escolar", "scl0002", "Estuche Pink", 3.25);
const scl0003 = new Product(id += 1, 0, "escolar", "scl0003", "Estuche Cream", 3.00);
const scl0004 = new Product(id += 1, 0, "escolar", "scl0004", "Estuche Blue", 3.75);

const cardList = [];
cardList.push(crp0001, crp0002, crp0003, crp0004, agn0001, agn0002, agn0003, agn0004, scl0001, scl0002, scl0003, scl0004);

// Definir variables
const container = document.querySelector("#cards-container");

// Mensaje Tienda ToastifyJS
if (document.querySelector(".tienda__body-bg")) {
  Toastify({
    text: "¡Envíos gratis desde 15€!",
    gravity: "bottom",
    stopOnFocus: false,
    offset: {
      y: 40
    },
    style: {
      color: "#fff",
      background: "#245178",
   },
    duration: 3000
  }).showToast();
}

// Generar cards en HTML
cardList.forEach(product => {
  product = cartArray.find(previousProduct => previousProduct.id === product.id) || product;

  let div = document.createElement("div");
  div.className = `col ${product.type} fadein-up`;

  if (cartArray.includes(product)) {
    div.innerHTML = `
    <div class="card border-2 mb-5 mx-auto" style="width: 18rem;">
    <img src="../img/productos/${product.name}.webp" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">€ ${product.price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div class="d-flex justify-content-around">
          <div class="d-none btn btn-custom button-scale-100 id${product.id}-agregar-button">Agregar</div>
          <input type="button" value="-" class="btn btn-custom btn-minus-plus button-scale-100 id${product.id}-subtract-button">
          <div class="fs-5 align-self-center id${product.id}-amount-display">${product.amount}</div>
          <input type="button" value="+" class="btn btn-custom btn-minus-plus button-scale-100 id${product.id}-add-button">
        </div>
      </div>
    </div>`;
  } else {
    div.innerHTML = `
    <div class="card border-2 mb-5 mx-auto" style="width: 18rem;">
    <img src="../img/productos/${product.name}.webp" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">€ ${product.price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div class="d-flex justify-content-around">
          <div class="btn btn-custom button-scale-100 id${product.id}-agregar-button">Agregar</div>
          <input type="button" value="-" class="d-none btn btn-custom btn-minus-plus button-scale-100 id${product.id}-subtract-button">
          <div class="d-none fs-5 align-self-center id${product.id}-amount-display">${product.amount}</div>
          <input type="button" value="+" class="d-none btn btn-custom btn-minus-plus button-scale-100 id${product.id}-add-button">
        </div>
      </div>
    </div>`;
  }

  container && container.appendChild(div);

  let agregarButton = div.querySelector(`.id${product.id}-agregar-button`);
  let subtractButton = div.querySelector(`.id${product.id}-subtract-button`);
  let amountDisplay = div.querySelector(`.id${product.id}-amount-display`);
  let addButton = div.querySelector(`.id${product.id}-add-button`);

  // Boton "Agregar"
  agregarButton.addEventListener("click", () => {
    agregarButton.classList.add("d-none");
    subtractButton.classList.remove("d-none");
    amountDisplay.classList.remove("d-none");
    addButton.classList.remove("d-none");
    add(product);

  // Crear item de lista en "cartIcon"
  checkCart();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
    cartSubtractButtonHandler(product);
    cartAddButtonHandler(product);
  });

  // Boton "Menos" 
  subtractButton.addEventListener("click", () => {
    subtract(product);

    if (document.querySelector(`.id${product.id}-cart-span-money`)) {
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `€ ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (product.amount == 0) {
      subtractButton.classList.add("d-none");
      amountDisplay.classList.add("d-none");
      addButton.classList.add("d-none");
      agregarButton.classList.remove("d-none");
      document.querySelector(`.id${product.id}-li`) && document.querySelector(`.id${product.id}-li`).remove();
    };
    checkCart();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
  });

  // Boton "Sumar"
  addButton.addEventListener("click", () => {
    add(product);

    if (document.querySelector(`.id${product.id}-cart-span-money`)) {
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `€ ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };
    checkCart();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
  });
});