import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=it-IT`);

        if (!response.ok) {
          throw new Error("Errore nel caricamento dei film");
        }

        const data = await response.json();
        // Prendiamo i primi 10 film trending
        setMovies(data.results.slice(0, 10));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Errore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-solid mx-auto mb-4"></div>
          <p className="text-white text-xl">Caricamento film in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">❌ {error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">🔥 Film di Tendenza</h1>
          <p className="text-gray-400 text-lg">I film più popolari della settimana</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null}
              year={movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
              rating={movie.vote_average ? movie.vote_average.toFixed(1) : null}
              genre={movie.genre_ids?.[0] ? getGenreName(movie.genre_ids[0]) : null}
              description={movie.overview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Funzione helper per convertire gli ID dei generi in nomi
const getGenreName = (genreId) => {
  const genres = {
    28: "Azione",
    12: "Avventura",
    16: "Animazione",
    35: "Commedia",
    80: "Crime",
    99: "Documentario",
    18: "Drammatico",
    10751: "Famiglia",
    14: "Fantasy",
    36: "Storico",
    27: "Horror",
    10402: "Musica",
    9648: "Mistero",
    10749: "Romantico",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "Guerra",
    37: "Western",
  };
  return genres[genreId] || "Vario";
};

export default MovieSection;
