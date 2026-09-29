document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  console.log("ID recibido:", id);

  const catalogo = [...peliculas, ...series];

  console.log("Catálogo:", catalogo);

  const contenido = catalogo.find(item => item.id === id);

  console.log("Contenido encontrado:", contenido);

  if (!contenido) {
    document.querySelector(".comments-section").hidden = true;
    document.querySelector(".detail-container").innerHTML = `
      <div class="detail-error">
        <h1>Contenido no encontrado</h1>
        <p>ID recibido: ${id ?? "ninguno"}</p>
        <a href="index.html" class="btn-back">
          Volver al catálogo
        </a>
      </div>
    `;

    return;
  }

  const poster = document.getElementById("detailPoster");

  poster.src = contenido.poster;
  poster.alt = `Poster de ${contenido.nombre}`;

  document.getElementById("detailTitle").textContent =
    contenido.nombre;

  document.getElementById("detailType").textContent =
    contenido.tipo === "pelicula"
      ? "PELÍCULA"
      : "SERIE";

  document.getElementById("detailYear").textContent =
    contenido.anio;

  document.getElementById("detailGenre").textContent =
    contenido.genero;

  document.getElementById("detailDuration").textContent =
    contenido.duracion;

  document.getElementById("detailRate").textContent =
    obtenerPromedio(contenido).toFixed(1);

  document.getElementById("detailSynopsis").textContent =
    contenido.sinopsis;



  /* -----------------------------------------------------
     Botón de favorito
     -----------------------------------------------------
     esFavorito() y alternarFavorito() ya existen en script.js
     (se cargó antes que este archivo), así que no hace falta
     escribir de nuevo la lógica de localStorage aquí.
  ----------------------------------------------------- */
  const botonFav = document.getElementById("detailFavBtn");

  function pintarBotonFav() {
    botonFav.textContent = esFavorito(contenido.id)
      ? "❤️ En favoritos"
      : "🤍 Agregar a favoritos";
  }

  pintarBotonFav(); // refleja el estado guardado al abrir la página

  botonFav.addEventListener("click", () => {
    alternarFavorito(contenido.id);
    pintarBotonFav();
  });

  activarComentarios(contenido);
});

/* Cada título tiene su propia lista de comentarios en este navegador. */
function activarComentarios(contenido) {
  const clave = `cultmovies_comentarios_${contenido.id}`;
  const formulario = document.getElementById("commentForm");
  const input = document.getElementById("commentInput");
  const puntuacionInput = document.getElementById("commentRating");
  const lista = document.getElementById("commentsList");
  const estado = document.getElementById("commentStatus");

  function obtenerComentarios() {
    const comentarios = JSON.parse(localStorage.getItem(clave) || "[]");
    if (!Array.isArray(comentarios) || comentarios.some(comentario =>
      !comentario || typeof comentario.texto !== "string" ||
      typeof comentario.fecha !== "string" ||
      !Number.isFinite(Date.parse(comentario.fecha))
    )) {
      throw new Error("Comentarios guardados no válidos");
    }
    return comentarios;
  }

  function mostrarComentarios(comentarios) {
    lista.replaceChildren();

    if (comentarios.length === 0) {
      const mensaje = document.createElement("p");
      mensaje.textContent = "Aún no hay reseñas. ¡Sé el primero en comentar!";
      lista.append(mensaje);
      return;
    }

    // Las reseñas más recientes aparecen primero. textContent evita interpretar HTML.
    comentarios.slice().reverse().forEach(comentario => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "comment-item";
      const texto = document.createElement("p");
      texto.textContent = comentario.texto;
      if (esPuntuacionValida(comentario.puntuacion)) {
        const puntuacion = document.createElement("p");
        puntuacion.textContent = `★ ${comentario.puntuacion} / 5`;
        tarjeta.append(puntuacion);
      }
      const fecha = document.createElement("time");
      fecha.dateTime = comentario.fecha;
      fecha.textContent = new Date(comentario.fecha).toLocaleString("es-MX", {
        dateStyle: "medium",
        timeStyle: "short"
      });
      tarjeta.append(texto, fecha);
      lista.append(tarjeta);
    });
  }

  try {
    mostrarComentarios(obtenerComentarios());
  } catch {
    estado.textContent = "No se pudieron leer las reseñas guardadas en este navegador.";
  }

  input.addEventListener("input", () => {
    input.setCustomValidity("");
    estado.textContent = "";
  });

  puntuacionInput.addEventListener("change", () => {
    puntuacionInput.setCustomValidity("");
  });

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    const texto = input.value.trim();
    if (!texto) {
      input.setCustomValidity("Escribe una reseña antes de publicarla.");
      input.reportValidity();
      return;
    }

    const puntuacion = Number(puntuacionInput.value);
    if (!esPuntuacionValida(puntuacion)) {
      puntuacionInput.setCustomValidity("Selecciona una puntuación de 1 a 5 estrellas.");
      puntuacionInput.reportValidity();
      return;
    }

    try {
      const comentarios = obtenerComentarios();
      comentarios.push({ texto, puntuacion, fecha: new Date().toISOString() });
      localStorage.setItem(clave, JSON.stringify(comentarios));
      mostrarComentarios(comentarios);
      document.getElementById("detailRate").textContent = obtenerPromedio(contenido).toFixed(1);
      formulario.reset();
      estado.textContent = "Reseña guardada.";
    } catch {
      estado.textContent = "No se pudo guardar la reseña. Tu texto sigue aquí para que puedas intentarlo de nuevo.";
    }
  });
}
