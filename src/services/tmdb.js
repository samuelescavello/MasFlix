const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Funzione helper per fare le chiamate
const fetchFromTMDB = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "it-IT");

  // Aggiungi eventuali altri parametri
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    throw error;
  }
};

// Ottieni film popolari
export const getPopularMovies = async () => {
  return await fetchFromTMDB("/movie/popular");
};

// Ottieni film in tendenza
export const getTrendingMovies = async () => {
  return await fetchFromTMDB("/trending/movie/week");
};

// Ottieni film con rating più alto
export const getTopRatedMovies = async () => {
  return await fetchFromTMDB("/movie/top_rated");
};

// Cerca film
export const searchMovies = async (query) => {
  return await fetchFromTMDB("/search/movie", { query });
};

// Ottieni dettagli di un film
export const getMovieDetails = async (id) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=it-IT`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Errore nel recupero dettagli film:", error);
    throw error;
  }
};
