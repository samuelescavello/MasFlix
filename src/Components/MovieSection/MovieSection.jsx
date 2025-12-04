import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import "./MovieSection.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTrendingMovies = async (page = 1) => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=it-IT&page=${page}`);

        if (!response.ok) {
          throw new Error("Errore nel caricamento dei film");
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB limita a 500 pagine
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Errore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Caricamento film in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-text">❌ {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-section">
      <div className="movie-section-container">
        <div className="movie-section-header">
          <h1 className="section-title">🔥 Film di Tendenza</h1>
          <p className="section-subtitle">I film più popolari della settimana</p>
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              title={movie.title}
              poster={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null}
              year={movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
              rating={movie.vote_average ? movie.vote_average.toFixed(1) : null}
              genre={movie.genre_ids?.[0] ? getGenreName(movie.genre_ids[0]) : null}
              description={movie.overview}
            />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
