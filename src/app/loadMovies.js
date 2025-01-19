import { client } from "./meili";
import movies from "/root/movies.json";

async function loadMovies() {
  try {
    const index = client.index("movies");
    const response = await index.addDocuments(movies);
    console.log("Datos cargados exitosamente", response);
  } catch (error) {
    console.log("Error al cargar los datos", error);
  }
}

loadMovies();
