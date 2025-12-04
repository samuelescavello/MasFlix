import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import "../MovieSection/MovieSection.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TrendingPage = () => {
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
          throw new Error("Errore nel caricamento dei film in tendenza");
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (error) {
        setError(error.message);
        console.error("Errore API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Film in Tendenza</h2>
        <div className="loading">Caricamento film in tendenza...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Film in Tendenza</h2>
        <div className="error">Errore: {error}</div>
      </main>
    );
  }

  return (
    <main className="movie-section">
      <div className="movie-section-container">
        <div className="movie-section-header">
          <h1 className="section-title">📈 Film in Tendenza</h1>
          <p className="section-subtitle">I film più popolari del momento</p>
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              title={movie.title}
              poster={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
              year={movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
              rating={movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              genre="Film"
              description={movie.overview || "Nessuna descrizione disponibile"}
            />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </main>
  );
};

export default TrendingPage;
