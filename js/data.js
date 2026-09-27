const peliculas = [
  {
    id: "pel-001",
    nombre: "Coyote vs Acme",
    tipo: "pelicula",
    genero: "Comedia",
    anio: 2026,
    duracion: "2h 18min",
    rate: 4.2,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/coyote-vs-acme.jpg",
    sinopsis:
      "Después de que los productos de Acme le fallan demasiadas veces en su persecución del Correcaminos, Wile E. Coyote decide demandar a la compañía.",
    comentarios: []
  },
  {
    id: "pel-002",
    nombre: "Interstellar",
    tipo: "pelicula",
    genero: "Ciencia ficción",
    anio: 2014,
    duracion: "2h 49min",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/interstellar.jpg",
    sinopsis:
      "Un grupo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
    comentarios: []
  },
  {
    id: "pel-003",
    nombre: "The Dark Knight",
    tipo: "pelicula",
    genero: "Acción",
    anio: 2008,
    duracion: "2h 32min",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/the-dark-knight.jpg",
    sinopsis:
      "Batman enfrenta al Joker, un criminal que busca provocar el caos en Ciudad Gótica y desafiar los principios de sus habitantes.",
    comentarios: []
  },
  {
    id: "pel-004",
    nombre: "El Señor de los Anillos: El Retorno del Rey",
    tipo: "pelicula",
    genero: "Fantasía",
    anio: 2003,
    duracion: "3h 21min",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/el-retorno-del-rey.jpg",
    sinopsis:
      "Mientras las fuerzas de Sauron avanzan sobre la Tierra Media, Frodo y Sam continúan su viaje para destruir el Anillo Único.",
    comentarios: []
  },
  {
    id: "pel-005",
    nombre: "Spider-Man: Across the Spider-Verse",
    tipo: "pelicula",
    genero: "Animación",
    anio: 2023,
    duracion: "2h 20min",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/across-the-spider-verse.jpg",
    sinopsis:
      "Miles Morales viaja por el multiverso y conoce a una organización de Spider-People encargada de proteger distintas realidades.",
    comentarios: []
  },
  {
    id: "pel-006",
    nombre: "Dune: Parte Dos",
    tipo: "pelicula",
    genero: "Ciencia ficción",
    anio: 2024,
    duracion: "2h 46min",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/dune-parte-dos.jpg",
    sinopsis:
      "Paul Atreides se une a los Fremen mientras busca vengar la caída de su familia y cambiar el destino de Arrakis.",
    comentarios: []
  },
  {
    id: "pel-007",
    nombre: "Oppenheimer",
    tipo: "pelicula",
    genero: "Drama",
    anio: 2023,
    duracion: "3h",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/oppenheimer.jpg",
    sinopsis:
      "La historia del físico J. Robert Oppenheimer y su participación en el desarrollo de la primera bomba atómica.",
    comentarios: []
  },
  {
    id: "pel-008",
    nombre: "Guardianes de la Galaxia Vol. 3",
    tipo: "pelicula",
    genero: "Acción",
    anio: 2023,
    duracion: "2h 30min",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/guardianes-galaxia-vol-3.jpg",
    sinopsis:
      "Los Guardianes se enfrentan al pasado de Rocket mientras emprenden una misión que pone en riesgo a todo el equipo.",
    comentarios: []
  },
  {
    id: "pel-009",
    nombre: "Inception",
    tipo: "pelicula",
    genero: "Ciencia ficción",
    anio: 2010,
    duracion: "2h 28min",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/inception.jpg",
    sinopsis:
      "Un especialista en infiltrarse en los sueños recibe la misión de implantar una idea en la mente de un objetivo.",
    comentarios: []
  },
  {
    id: "pel-010",
    nombre: "Gladiator",
    tipo: "pelicula",
    genero: "Drama histórico",
    anio: 2000,
    duracion: "2h 35min",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/gladiator.jpg",
    sinopsis:
      "Un general romano traicionado pierde todo y termina convertido en gladiador mientras busca justicia contra el nuevo emperador.",
    comentarios: []
  },
  {
    id: "pel-011",
    nombre: "Mad Max: Fury Road",
    tipo: "pelicula",
    genero: "Acción",
    anio: 2015,
    duracion: "2h",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/mad-max-fury-road.jpg",
    sinopsis:
      "En un mundo posapocalíptico, Max se une a Furiosa en una peligrosa huida para escapar de un tirano.",
    comentarios: []
  },
  {
    id: "pel-012",
    nombre: "El Padrino",
    tipo: "pelicula",
    genero: "Crimen",
    anio: 1972,
    duracion: "2h 55min",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/el-padrino.jpg",
    sinopsis:
      "La familia Corleone enfrenta conflictos internos y externos mientras Michael comienza a involucrarse en el imperio criminal familiar.",
    comentarios: []
  },
  {
    id: "pel-013",
    nombre: "Whiplash",
    tipo: "pelicula",
    genero: "Drama",
    anio: 2014,
    duracion: "1h 47min",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/whiplash.jpg",
    sinopsis:
      "Un joven baterista de jazz entra en conflicto con un exigente profesor que lleva su talento y resistencia al límite.",
    comentarios: []
  },
  {
    id: "pel-014",
    nombre: "Coco",
    tipo: "pelicula",
    genero: "Animación",
    anio: 2017,
    duracion: "1h 45min",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/coco.jpg",
    sinopsis:
      "Miguel viaja accidentalmente al mundo de los muertos y descubre secretos relacionados con la historia de su familia.",
    comentarios: []
  },
  {
    id: "pel-015",
    nombre: "The Batman",
    tipo: "pelicula",
    genero: "Acción",
    anio: 2022,
    duracion: "2h 56min",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/the-batman.jpg",
    sinopsis:
      "Batman investiga una serie de asesinatos cometidos por un criminal que deja pistas relacionadas con la corrupción de Ciudad Gótica.",
    comentarios: []
  }
];

const series = [
  {
    id: "ser-001",
    nombre: "Breaking Bad",
    tipo: "serie",
    genero: "Drama",
    anio: 2008,
    duracion: "5 temporadas",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/breaking-bad.jpg",
    sinopsis:
      "Un profesor de química comienza a fabricar metanfetamina después de recibir un diagnóstico que cambia completamente su vida.",
    comentarios: []
  },
  {
    id: "ser-002",
    nombre: "Stranger Things",
    tipo: "serie",
    genero: "Ciencia ficción",
    anio: 2016,
    duracion: "5 temporadas",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/stranger-things.jpg",
    sinopsis:
      "La desaparición de un niño revela experimentos secretos, criaturas sobrenaturales y una dimensión paralela.",
    comentarios: []
  },
  {
    id: "ser-003",
    nombre: "Game of Thrones",
    tipo: "serie",
    genero: "Fantasía",
    anio: 2011,
    duracion: "8 temporadas",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/game-of-thrones.jpg",
    sinopsis:
      "Varias casas nobles luchan por controlar el Trono de Hierro mientras una antigua amenaza despierta en el norte.",
    comentarios: []
  },
  {
    id: "ser-004",
    nombre: "The Last of Us",
    tipo: "serie",
    genero: "Drama",
    anio: 2023,
    duracion: "2 temporadas",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/the-last-of-us.jpg",
    sinopsis:
      "Joel debe acompañar a Ellie a través de un mundo devastado por una infección mientras ambos intentan sobrevivir.",
    comentarios: []
  },
  {
    id: "ser-005",
    nombre: "Arcane",
    tipo: "serie",
    genero: "Animación",
    anio: 2021,
    duracion: "2 temporadas",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/arcane.jpg",
    sinopsis:
      "Dos hermanas quedan enfrentadas por un conflicto entre Piltover y Zaun mientras nuevas tecnologías alteran el equilibrio de poder.",
    comentarios: []
  },
  {
    id: "ser-006",
    nombre: "The Mandalorian",
    tipo: "serie",
    genero: "Ciencia ficción",
    anio: 2019,
    duracion: "3 temporadas",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/the-mandalorian.jpg",
    sinopsis:
      "Un cazarrecompensas mandaloriano termina protegiendo a un misterioso niño perseguido por fuerzas imperiales.",
    comentarios: []
  },
  {
    id: "ser-007",
    nombre: "Shogun",
    tipo: "serie",
    genero: "Drama histórico",
    anio: 2024,
    duracion: "10 episodios",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/shogun.jpg",
    sinopsis:
      "Un navegante inglés llega a Japón y queda atrapado en una compleja lucha política entre poderosos señores feudales.",
    comentarios: []
  },
  {
    id: "ser-008",
    nombre: "Dark",
    tipo: "serie",
    genero: "Ciencia ficción",
    anio: 2017,
    duracion: "3 temporadas",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/dark.jpg",
    sinopsis:
      "La desaparición de varios niños revela una compleja red de secretos familiares y viajes en el tiempo.",
    comentarios: []
  },
  {
    id: "ser-009",
    nombre: "Peaky Blinders",
    tipo: "serie",
    genero: "Drama",
    anio: 2013,
    duracion: "6 temporadas",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/peaky-blinders.jpg",
    sinopsis:
      "La familia Shelby construye un poderoso imperio criminal en Birmingham tras el final de la Primera Guerra Mundial.",
    comentarios: []
  },
  {
    id: "ser-010",
    nombre: "Better Call Saul",
    tipo: "serie",
    genero: "Drama",
    anio: 2015,
    duracion: "6 temporadas",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/better-call-saul.jpg",
    sinopsis:
      "Jimmy McGill intenta construir su carrera como abogado mientras poco a poco se transforma en Saul Goodman.",
    comentarios: []
  },
  {
    id: "ser-011",
    nombre: "House of the Dragon",
    tipo: "serie",
    genero: "Fantasía",
    anio: 2022,
    duracion: "3 temporadas",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/house-of-the-dragon.jpg",
    sinopsis:
      "La Casa Targaryen entra en una lucha interna por la sucesión al Trono de Hierro que amenaza con dividir el reino.",
    comentarios: []
  },
  {
    id: "ser-012",
    nombre: "The Boys",
    tipo: "serie",
    genero: "Acción",
    anio: 2019,
    duracion: "5 temporadas",
    rate: 4.6,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/the-boys.jpg",
    sinopsis:
      "Un grupo de vigilantes intenta exponer y detener a superhéroes corruptos protegidos por una poderosa corporación.",
    comentarios: []
  },
  {
    id: "ser-013",
    nombre: "Daredevil",
    tipo: "serie",
    genero: "Acción",
    anio: 2015,
    duracion: "3 temporadas",
    rate: 4.7,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/daredevil.jpg",
    sinopsis:
      "Matt Murdock trabaja como abogado durante el día y combate el crimen de Hell's Kitchen como vigilante durante la noche.",
    comentarios: []
  },
  {
    id: "ser-014",
    nombre: "Sherlock",
    tipo: "serie",
    genero: "Misterio",
    anio: 2010,
    duracion: "4 temporadas",
    rate: 4.8,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/sherlock.jpg",
    sinopsis:
      "Sherlock Holmes resuelve complejos casos criminales en el Londres moderno acompañado por el doctor John Watson.",
    comentarios: []
  },
  {
    id: "ser-015",
    nombre: "Avatar: The Last Airbender",
    tipo: "serie",
    genero: "Animación",
    anio: 2005,
    duracion: "3 temporadas",
    rate: 4.9,
    visitas: 0,
    favorito: false,
    poster: "assets/posters/avatar-the-last-airbender.jpg",
    sinopsis:
      "Aang, el último Maestro Aire y Avatar, debe dominar los cuatro elementos para detener la guerra iniciada por la Nación del Fuego.",
    comentarios: []
  }
];