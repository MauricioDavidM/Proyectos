import { cartIcon } from "./carrito.js";


// Definir variables y leer localStorage
let total = parseFloat(localStorage.getItem("total")) || 0;
export let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

// Definir la función "checkCart" para activar instrucciones según el estado del carrito
export const checkCart = () => {

// Manejar cartIcon
  cartArray.forEach(product => {

    if (!document.querySelector(`.id${product.id}-li`)) {

      if (document.querySelector("#index")) {
        let li = document.createElement("li");
        li.className = `d-flex justify-content-between py-1 id${product.id}-li`;
        li.innerHTML = `
                    <img class="ms-2 rounded" src="../img/productos/miniaturas/${product.name}.webp" alt="${product.description}">
                    <span class="cart-span-description align-self-center text-wrap">${product.description}</span>
                    <div class="cart-span-amount align-self-center text-center d-flex justify-content-center">
                      <span class="id${product.id}-amount-display">${product.amount}</span>
                      <span class="px-1">u</span>
                    </div>
                    <span class="id${product.id}-cart-span-money cart-span-money align-self-center text-center">€ ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <div class="cart-buttons px-1 align-self-center">
                      <input type="button" value="-" class="mx-1 btn btn-custom button-scale-100 cart-button id${product.id}-cart-subtract-button">
                      <input type="button" value="+" class="mx-1 btn btn-custom button-scale-100 cart-button id${product.id}-cart-add-button">
                    </div>`
        cartIcon.appendChild(li);
      } else {
        let li = document.createElement("li");
        li.className = `d-flex justify-content-between py-1 id${product.id}-li`;
        li.innerHTML = `
                    <img class="ms-2 rounded" src="../img/productos/miniaturas/${product.name}.webp" alt="${product.description}">
                    <span class="cart-span-description align-self-center text-wrap">${product.description}</span>
                    <div class="cart-span-amount align-self-center text-center d-flex justify-content-center">
                      <span class="id${product.id}-amount-display">${product.amount}</span>
                      <span class="px-1">u</span>
                    </div>
                    <span class="id${product.id}-cart-span-money cart-span-money align-self-center text-center">€ ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <div class="cart-buttons px-1 align-self-center">
                      <input type="button" value="-" class="mx-1 btn btn-custom button-scale-100 cart-button id${product.id}-cart-subtract-button">
                      <input type="button" value="+" class="mx-1 btn btn-custom button-scale-100 cart-button id${product.id}-cart-add-button">
                    </div>`
        if (!document.querySelector("#checkout")) {
          cartIcon.appendChild(li);
        }
      }
    }
  });

// Manejar carrito vacio
document.querySelector(".emptyCart") && document.querySelector(".emptyCart").remove();

// "El carrito está vacío" Mensaje en el menú desplegable del carrito
if (!document.querySelector("#checkout") && cartIcon.childElementCount == 0) {
    localStorage.removeItem("cartIcon");
    let li = document.createElement("li");
    li.className = "d-flex justify-content-center py-1 emptyCart";
    li.innerText = "El carrito está vacío";
    cartIcon.appendChild(li);
    document.querySelector(".cart-icon-footer").style.display = "none";
    document.querySelector(".cart-icon-mobile-container") && (document.querySelector(".cart-icon-mobile-container").classList.add("d-none"));

// Instrucciones para vaciar el carrito manualmente(carrito.html)
if (document.querySelector("#cart-page")) {
      document.querySelector(".carrito__body__main").style.height = "100vh";
      document.querySelector("#cart-page").remove();
      document.querySelector("#cart-page-bottom-buttons").remove();
      Swal.fire({
        title: "¡El carrito fue vaciado!",
        text: "Redireccionando a Tienda...",
        icon: "success",
        iconColor: "#245178",
        color: "#245178",
        background: "#FFB334",
        showConfirmButton: false
      });
      setTimeout(() => {
        location.assign("./productos.html");
      }, 2000);
    };
  } else {
    document.querySelector(".cart-icon-footer").style.display = "flex";
    document.querySelector("#cart-icon-total") && (document.querySelector("#cart-icon-total").innerText = `€ ${total.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    document.querySelector("#cart-page-total") && (document.querySelector("#cart-page-total").innerText = `€ ${total.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    if (document.querySelector(".cart-icon-mobile-container")) {
      document.querySelector(".cart-icon-mobile-container").classList.remove("d-none");
      document.querySelector(".cart-icon-mobile-container").classList.add("d-inline-block");
      document.querySelector(".cart-icon-mobile-amount").innerText = cartArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    }
  }

// "Vaciar carrito" código del boton(carrito.html)
if (document.querySelector("#vaciar-carrito-button")) {
    document.querySelector("#vaciar-carrito-button").addEventListener("click", () => {

      Swal.fire({
        title: "¿Estás seguro/a?",
        icon: "warning",
        iconColor: "#245178",
        showCancelButton: true,
        confirmButtonColor: "#245178",
        cancelButtonColor: "#042537",
        color: "#245178",
        background: "#FFB334",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector(".carrito__body__main").style.height = "100vh";
          document.querySelector("#cart-page").remove();
          document.querySelector("#cart-page-bottom-buttons").remove();
          localStorage.removeItem("cartArray");
          localStorage.removeItem("total");
          localStorage.removeItem("cartIcon");

          Swal.fire({
            title: "¡El carrito fue vaciado!",
            text: "Redireccionando a Tienda...",
            icon: "success",
            iconColor: "#245178",
            color: "#245178",
            background: "#FFB334",
            showConfirmButton: false
          });

          setTimeout(() => {
            location.assign("./productos.html");
          }, 2000);
        }
      })
    })
  }
}


// Definir la funcion "agregar". Comprobar si un objeto del "cartArray" tiene el mismo id. Si es así, sumar 1 al contador. Si no es así, agregar 1 a la cantidad y agregar el objeto al "cartArray"
export const add = (product) => {
  let object = cartArray.find(object => object.id === product.id);
  object ? object.amount += 1 : (product.amount += 1, cartArray.push(product));
  total = cartArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount * currentValue.price, 0);
  document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
    element.innerText = `${product.amount}`;
  });
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  localStorage.setItem("total", total.toFixed(2));
};


// Definir la funcion "restar"
export const subtract = (product) => {
  if (product.amount > 0) {
    product.amount -= 1;
    cartArray = cartArray.filter((product) => product.amount > 0);
    total = cartArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount * currentValue.price, 0);
    document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
      element.innerText = `${product.amount}`;
    });
  };
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  localStorage.setItem("total", total.toFixed(2));
};


// Definir la función del controlador de clic del botón "Menos" del carrito
export const cartSubtractButtonHandler = (product) => {
  if (document.querySelectorAll(`.id${product.id}-cart-subtract-button`)) {

    document.querySelectorAll(`.id${product.id}-cart-subtract-button`).forEach(element => {
      element.addEventListener("click", () => {

        subtract(product);
        document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
          element.innerText = `${product.amount}`;
        });
        document.querySelectorAll(`.id${product.id}-cart-span-money`).forEach(element => {
          element.innerText = `€ ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        });

        if (product.amount == 0) {
          document.querySelector(`.id${product.id}-agregar-button`) && document.querySelector(`.id${product.id}-agregar-button`).classList.remove("d-none");
          document.querySelector(`.id${product.id}-subtract-button`) && document.querySelector(`.id${product.id}-subtract-button`).classList.add("d-none");

          if (document.querySelectorAll(`.id${product.id}-amount-display`)) {
            document.querySelectorAll(`.id${product.id}-amount-display`).forEach(display => {
              display.classList.add("d-none");
            });
          };

          document.querySelector(`.id${product.id}-add-button`) && document.querySelector(`.id${product.id}-add-button`).classList.add("d-none");
          document.querySelectorAll(`.id${product.id}-li`).forEach(element => {
            element.remove();
          });
        };
        checkCart();
      });
    });
  };
};

// Definir la función del controlador de clic del botón "Más" del carrito
export const cartAddButtonHandler = (product) => {
  if (document.querySelectorAll(`.id${product.id}-cart-add-button`)) {

    document.querySelectorAll(`.id${product.id}-cart-add-button`).forEach(element => {
      element.addEventListener("click", () => {

        add(product);
        document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
          element.innerText = `${product.amount}`;
        });
        document.querySelectorAll(`.id${product.id}-cart-span-money`).forEach(element => {
          element.innerText = `€ ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        });
        checkCart();
      });
    });
  };
};
