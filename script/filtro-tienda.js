// Hacer que aparezcan los elementos apropiados con sus respectivas animaciones, al hacer clic en un botón de filtro.

document.querySelector("#todo").addEventListener("click", () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll(".carpeta").forEach(item => item.style.display = 'none');
    document.querySelectorAll(".agenda").forEach(item => item.style.display = 'none');
    document.querySelectorAll(".escolar").forEach(item => item.style.display = 'none');
    setTimeout(() => {
      document.querySelectorAll(".carpeta").forEach(item => item.style.display = 'block');
    }, 1);
    setTimeout(() => {
      document.querySelectorAll(".agenda").forEach(item => item.style.display = 'block');
    }, 1);
    setTimeout(() => {
      document.querySelectorAll(".escolar").forEach(item => item.style.display = 'block');
      window.scroll({ top: scrollPosition, behavior: "instant" });
    }, 1);
  });
  
  document.querySelector("#carpeta").addEventListener("click", () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll(".carpeta").forEach(item => item.style.display = 'none');
    setTimeout(() => {
      document.querySelectorAll(".carpeta").forEach(item => item.style.display = 'block');
      window.scroll({ top: scrollPosition, behavior: "instant" });
    }, 1);
    document.querySelectorAll(".agenda").forEach(item => item.style.display = 'none');
    document.querySelectorAll(".escolar").forEach(item => item.style.display = 'none');
  });
  
  document.querySelector("#agenda").addEventListener("click", () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll(".carpeta").forEach(item => item.style.display = 'none');
    document.querySelectorAll(".agenda").forEach(item => item.style.display = 'none');
    setTimeout(() => {
      document.querySelectorAll(".agenda").forEach(item => item.style.display = 'block');
      window.scroll({ top: scrollPosition, behavior: "instant" });
    }, 1);
    document.querySelectorAll(".escolar").forEach(item => item.style.display = 'none');
  });
  
  document.querySelector("#escolar").addEventListener("click", () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll(".carpeta").forEach(item => item.style.display = 'none');
    document.querySelectorAll(".agenda").forEach(item => item.style.display = 'none');
    document.querySelectorAll(".escolar").forEach(item => item.style.display = 'none');
    setTimeout(() => {
      document.querySelectorAll(".escolar").forEach(item => item.style.display = 'block');
      window.scroll({ top: scrollPosition, behavior: "instant" });
    }, 1);
  });