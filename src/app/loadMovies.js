import { client } from "./meili";

async function loadMovies() {
  try {
    const response = await fetch("/movies.json");
    const movies = await response.json();

    const index = client.index("movies");

    // Agrega los documentos a MeiliSearch
    const result = await index.addDocuments(movies);

    console.log("Datos cargados exitosamente", result);
  } catch (error) {
    console.log("Error al cargar los datos", error);
  }
}

loadMovies();
