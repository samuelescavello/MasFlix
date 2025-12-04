import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "../MovieSection/MovieSection.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SearchResultsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error("Errore nella ricerca");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error("Errore ricerca:", error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  if (loading) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Ricerca: "{query}"</h2>
        <div className="loading">Ricerca in corso...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Ricerca: "{query}"</h2>
        <div className="error">Errore: {error}</div>
      </main>
    );
  }

  if (movies.length === 0) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Ricerca: "{query}"</h2>
        <div className="loading">Nessun risultato trovato per "{query}"</div>
      </main>
    );
  }

  return (
    <main className="movie-section">
      <h2 className="section-title">Risultati per: "{query}"</h2>
      <p style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>Trovati {movies.length} risultati</p>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
            year={movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            rating={movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            genre="Film"
            description={movie.overview || "Nessuna descrizione disponibile"}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchResultsPage;
