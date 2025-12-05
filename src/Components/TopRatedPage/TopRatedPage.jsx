import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "../MovieSection/MovieSection.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=it-IT`
        );

        if (!response.ok) {
          throw new Error("Errore nel caricamento dei film più votati");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error("Errore API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Film Più Votati</h2>
        <div className="loading">Caricamento film più votati...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="movie-section">
        <h2 className="section-title">Film Più Votati</h2>
        <div className="error">Errore: {error}</div>
      </main>
    );
  }

  return (
    <main className="movie-section">
      <h2 className="section-title">Film Più Votati</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            title={movie.title}
            poster={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            year={
              movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"
            }
            rating={movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            genre="Film"
            description={movie.overview || "Nessuna descrizione disponibile"}
          />
        ))}
      </div>
    </main>
  );
};

export default TopRatedPage;
