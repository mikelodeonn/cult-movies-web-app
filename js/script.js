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
    renderizarFila(peliculas, "peliculasCards");
    renderizarFila(series, "seriesCards");
   
    activarFiltroGeneros();
    activarVolverAInicio();

    activarMejorValorados();

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

/* -----------------------------------------------------
   4. CREAR TARJETAS A PARTIR DE data.js
   -----------------------------------------------------
   "peliculas" y "series" vienen de data.js, que se carga
   antes que este archivo (por eso podemos usarlas aquí
   directamente, sin importarlas).
----------------------------------------------------- */

/* Recibe UN título (un objeto del arreglo) y devuelve el
   HTML de su tarjeta como texto. Las comillas invertidas
   ` ` permiten escribir varias líneas, y ${...} inserta el
   valor de una variable dentro del texto. */
function crearTarjeta(titulo) {
    return `
    <article class="card" data-id="${titulo.id}">
      <img class="card-poster" src="${titulo.poster}" alt="${titulo.nombre}" />
      <div class="card-info">
        <h3 class="card-title">${titulo.nombre}</h3>
        <div class="card-meta">
          <span class="card-rate">⭐ ${titulo.rate}</span>
          <button class="card-fav" data-id="${titulo.id}">🤍</button>
        </div>
      </div>
    </article>
  `;
}

/* Recibe una lista (peliculas o series) y el id del
   contenedor donde deben aparecer las tarjetas. */
function renderizarFila(lista, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // .map recorre la lista y transforma cada título en el HTML de su
    // tarjeta. Devuelve una lista de textos, y .join("") los une en uno solo.
    contenedor.innerHTML = lista.map(crearTarjeta).join("");
}
/* Cambia a la vista de resultados: esconde las filas,
 muestra la grilla y la llena con las tarjetas de "lista".
 Es una función aparte porque más adelante la van a usar
 también Favoritos, Mejor Valorados y la búsqueda. */
function mostrarVistaFiltrada(titulo, lista) {
    document.getElementById("tituloFiltrado").textContent = titulo;
    document.getElementById("gridCards").innerHTML = lista.map(crearTarjeta).join("");

    document.getElementById("vistaInicio").classList.add("oculto");
    document.getElementById("vistaFiltrada").classList.remove("oculto");
}

/* Vuelve a la vista de las dos filas y quita el género marcado */
function mostrarVistaInicio() {
    document.getElementById("vistaFiltrada").classList.add("oculto");
    document.getElementById("vistaInicio").classList.remove("oculto");

    document
        .querySelectorAll(".genre-btn")
        .forEach((boton) => boton.classList.remove("is-active"));
}

function activarFiltroGeneros() {
    const botones = document.querySelectorAll(".genre-btn");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {

            const genero = boton.dataset.genero;
            const todos = [...peliculas, ...series];
            const resultados = todos.filter((titulo) => titulo.genero === genero);

            mostrarVistaFiltrada(genero, resultados);

            botones.forEach((otro) => otro.classList.remove("is-active"));
            boton.classList.add("is-active");


        });
    });

}

/* El logo y el link "Inicio" tienen data-nav="inicio".
Al hacer clic en cualquiera, volvemos a la vista de filas. */
function activarVolverAInicio() {
    document.querySelectorAll('[data-nav="inicio"]').forEach((enlace) => {
        enlace.addEventListener("click", mostrarVistaInicio);
    });

}

function activarMejorValorados() {
  const boton = document.getElementById("topRatedBtn");
  if (!boton) return;
 
  boton.addEventListener("click", () => {
    // [...peliculas, ...series] crea una lista NUEVA. Es importante,
    // porque .sort() cambia el orden de la lista sobre la que se
    // usa: si ordenáramos "peliculas" directamente, las filas del
    // inicio quedarían reordenadas también.
    const todos = [...peliculas, ...series];
 
    // .sort recibe una función que compara dos títulos (a y b).
    // Si b.rate - a.rate es positivo, b va primero: de mayor a menor.
    const ordenados = todos.sort((a, b) => b.rate - a.rate);
 
    mostrarVistaFiltrada("Mejor valorados", ordenados);
 
    // Quitamos el género marcado, para no tener dos filtros activos
    document
      .querySelectorAll(".genre-btn")
      .forEach((genero) => genero.classList.remove("is-active"));
  });
}