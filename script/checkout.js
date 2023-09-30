// Bootstrap: deshabilitar el envío de formularios si hay campos no válidos
(() => {
  "use strict"

  // Obtener todos los formularios a los que queremos aplicar estilos de validación Bootstrap
  const forms = document.querySelectorAll(".needs-validation");

  // Bucle sobre ellos y evitar la presentación
  Array.from(forms).forEach(form => {
    form.addEventListener("submit", event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        localStorage.removeItem("cartArray");
        localStorage.removeItem("total");
        localStorage.removeItem("cartIcon");
        Swal.fire({
          title: "¡Pedido completado!",
          text: "Te hemos enviado un mail con el detalle de tu compra",
          icon: "success",
          iconColor: "#245178",
          color: "#245178",
          background: "#FFB334",
          showConfirmButton: true,
          confirmButtonColor: "#245178"
        }).then((result) => {
          if (result.isConfirmed) {
            location.assign("../index.html");
          }
        })
      }
      form.classList.add("was-validated");
    }, false)
  })
})()

// EmailJS: agregar detalles del carrito al área de texto oculta. Enviaremos esto al cliente.

JSON.parse(localStorage.getItem("cartArray")).forEach(product => {
  document.querySelector("#emailDetail").textContent += `* ${product.description} x ${product.amount} u = € ${(product.price * product.amount).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`
});

// Mostrar detalles del precio total.
let total = parseFloat(localStorage.getItem("total")) || location.assign("../index.html");
let deliveryPrice = 0;
document.querySelector("#checkout-page-subtotal").innerText = `€ ${total.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;

if (total >= 15) {
  document.querySelector("#delivery-price").innerText = "€ 0,00";
  deliveryPrice = 0;
  document.querySelectorAll(".checkout-page-total").forEach(element => {
    element.innerText = `€ ${(total + deliveryPrice).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;
  });
} else {
  document.querySelector("#delivery-price").innerText = "€ 4,00";
  deliveryPrice = 4;
  document.querySelectorAll(".checkout-page-total").forEach(element => {
    element.innerText = `€ ${(total + deliveryPrice).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;
  });
}