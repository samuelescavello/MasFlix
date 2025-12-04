import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import MovieCard from "../MovieCard/MovieCard";
import "../MovieSection/MovieSection.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

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

  if (favorites.length === 0) {
    return (
      <main className="movie-section">
        <div className="movie-section-container">
          <div className="movie-section-header">
            <h1 className="section-title">❤️ I Tuoi Preferiti</h1>
            <p className="section-subtitle">Film che hai salvato come preferiti</p>
          </div>
          <div className="error-container" style={{ minHeight: "40vh" }}>
            <div className="error-content">
              <p className="loading-text">Non hai ancora aggiunto film ai preferiti</p>
              <p style={{ color: "#9ca3af", marginTop: "16px" }}>Esplora i film e clicca sul cuore per aggiungerli qui!</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="movie-section">
      <div className="movie-section-container">
        <div className="movie-section-header">
          <h1 className="section-title">❤️ I Tuoi Preferiti</h1>
          <p className="section-subtitle">
            Hai salvato {favorites.length} film{favorites.length !== 1 ? "" : "o"}
          </p>
        </div>

        <div className="movies-grid">
          {favorites.map((movie) => (
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
      </div>
    </main>
  );
};

export default FavoritesPage;
