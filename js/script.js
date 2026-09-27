/* SCRIPT.JS

   Por ahora solo manejamos 2 cosas:
   1. Abrir/cerrar el menú en móvil.
   2. Marcar/desmarcar favoritos (corazón) y el link activo.

   Proximos pasos:
    - Todo lo de localStorage, filtros y modal 
   */

   /*EVENTO QUE SE DISPARA CUANDO EL NAVEGADOR TERMINA DE LEER EL HTML, PARA PODER BUSCAR ELEMENTOS SIN ERRORES*/
document.addEventListener("DOMContentLoaded", () => {
  activarMenuMovil();
  activarLinksNavbar();
  activarBotonFavorito();
});

/*MENU MOVIL*/
function activarMenuMovil() {
  const botonToggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!botonToggle || !menu) return;

  botonToggle.addEventListener("click", () => {
    // classList.toggle: si el menú NO tiene la clase "is-open",
    // se la agrega. Si YA la tiene, se la quita. Así el mismo
    // botón sirve para abrir y para cerrar.
    menu.classList.toggle("is-open");
  });
}

/* -----------------------------------------------------
   2. LINK ACTIVO DEL NAVBAR
   -----------------------------------------------------
   Cuando el usuario hace clic en un link del navbar, quitamos
   la clase "is-active" de TODOS los links y se la ponemos
   solo al que acaba de clickear. Así siempre hay un solo
   link marcado como "activo".
----------------------------------------------------- */
function activarLinksNavbar() {
  const links = document.querySelectorAll(".navbar-link");
  const menu = document.getElementById("navMenu");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      // Le quitamos "is-active" a todos los links...
      links.forEach((otroLink) => otroLink.classList.remove("is-active"));

      // ...y se la ponemos solo al que se clickeó (this / link)
      link.classList.add("is-active");

      // Si estamos en móvil y el menú está abierto, lo cerramos
      // al elegir una opción (mejor experiencia de uso)
      if (menu) menu.classList.remove("is-open");
    });
  });
}

/* -----------------------------------------------------
   3. BOTÓN DE FAVORITO (corazón)
   -----------------------------------------------------
   Cambiamos el emoji del corazón entre blanco (no favorito)
   y rojo (favorito) cada vez que se hace clic.
   TODO: en un próximo paso, guardamos este estado en
   localStorage para que se recuerde al recargar la página.
----------------------------------------------------- */
function activarBotonFavorito() {
  const botonFav = document.getElementById("heroFavBtn");
  if (!botonFav) return;

  botonFav.addEventListener("click", () => {
    const corazon = botonFav.querySelector(".heart");
    const yaEsFavorito = corazon.textContent === "❤️";

    corazon.textContent = yaEsFavorito ? "🤍" : "❤️";
  });
}