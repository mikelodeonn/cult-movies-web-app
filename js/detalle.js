document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  console.log("ID recibido:", id);

  const catalogo = [...peliculas, ...series];

  console.log("Catálogo:", catalogo);

  const contenido = catalogo.find(item => item.id === id);

  console.log("Contenido encontrado:", contenido);

  if (!contenido) {
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
    contenido.rate;

  document.getElementById("detailSynopsis").textContent =
    contenido.sinopsis;

});