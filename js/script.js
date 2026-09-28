/* SCRIPT.JS


/*EVENTO QUE SE DISPARA CUANDO EL NAVEGADOR TERMINA DE LEER EL HTML, PARA PODER BUSCAR ELEMENTOS SIN ERRORES*/
document.addEventListener("DOMContentLoaded", () => {
    activarMenuMovil();
    activarLinksNavbar();

    renderizarFila(peliculas, "peliculasCards");
    renderizarFila(series, "seriesCards");

    activarFiltroGeneros();
    activarVolverAInicio();

    activarMejorValorados();

    activarFiltroFavoritos();

    activarBusqueda();

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

/* -----------------------------------------------------
   7. FAVORITOS (localStorage)
   -----------------------------------------------------
   localStorage solo guarda TEXTO. Para guardar una lista de
   ids la convertimos a texto con JSON.stringify, y al leerla
   la volvemos a convertir en lista con JSON.parse.
   Lo guardado se ve así:  ["pel-001","ser-004"]
----------------------------------------------------- */

// Nombre con el que guardamos la lista dentro de localStorage
const CLAVE_FAVORITOS = "cultmovies_favoritos";

/* Devuelve la lista de ids favoritos. Si todavía no se guardó
   nada, getItem devuelve null y usamos una lista vacía []. */
function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)) || [];
}

/* Devuelve true si ese id está en la lista de favoritos */
function esFavorito(id) {
    return obtenerFavoritos().includes(id);
}

/* Si el id ya era favorito lo quita; si no, lo agrega.
   Guarda la lista y devuelve true si ahora ES favorito. */
function alternarFavorito(id) {
    const favoritos = obtenerFavoritos();
    const posicion = favoritos.indexOf(id); // -1 significa "no está"

    if (posicion === -1) {
        favoritos.push(id); // agregar al final
    } else {
        favoritos.splice(posicion, 1); // quitar 1 elemento en esa posición
    }

    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
    return posicion === -1;
}

/* -----------------------------------------------------
   Filtro "Favoritos" del navbar
----------------------------------------------------- */
function activarFiltroFavoritos() {
    document.querySelectorAll('[data-nav="favoritos"]').forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const favoritos = obtenerFavoritos();
            const todos = [...peliculas, ...series];
            const resultados = todos.filter((titulo) => favoritos.includes(titulo.id));

            mostrarVistaFiltrada("Favoritos", resultados);

            document
                .querySelectorAll(".genre-btn")
                .forEach((genero) => genero.classList.remove("is-active"));
        });
    });
}

function activarBusqueda() {
    const formulario = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");
    const menu = document.getElementById("navMenu");

    if (!formulario || !input) return;

    // "submit" se dispara al apretar Enter o el botón de la lupa.
    // preventDefault() evita que un <form> haga lo que hace por
    // defecto (recargar la página y perder todo lo que hicimos en JS).
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        // .trim() quita espacios sueltos al principio/final,
        // .toLowerCase() pasa todo a minúsculas para poder comparar
        // sin que "Dune" y "dune" cuenten como distintos.
        const texto = input.value.trim().toLowerCase();
        if (!texto) return; // si el campo está vacío, no hacemos nada

        const todos = [...peliculas, ...series];

        // .includes() aquí es de texto, no de arreglo: revisa si
        // "texto" aparece en algún lugar del nombre, no solo al inicio.
        const resultados = todos.filter((titulo) =>
            titulo.nombre.toLowerCase().includes(texto)
        );

        mostrarVistaFiltrada(`Resultados para "${input.value}"`, resultados);

        document
            .querySelectorAll(".genre-btn")
            .forEach((genero) => genero.classList.remove("is-active"));

        // Si se buscó desde el menú móvil abierto, lo cerramos
        if (menu) menu.classList.remove("is-open");
    });
}