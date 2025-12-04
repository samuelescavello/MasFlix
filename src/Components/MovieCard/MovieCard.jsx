import "./MovieCard.css";
import { useFavorites } from "../../context/FavoritesContext";

const MovieCard = ({ movie, title, poster, year, rating, genre, description }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Crea l'oggetto movie se non è stato passato
  const movieObj = movie || {
    id: `${title}-${year}`, // ID temporaneo per film senza ID
    title,
    poster_path: poster?.replace("https://image.tmdb.org/t/p/w500", ""),
    release_date: year ? `${year}-01-01` : null,
    vote_average: rating,
    genre_ids: [],
    overview: description,
  };

  const handleDetailsClick = () => {
    alert(`Dettagli per: ${title}\n\nAnno: ${year}\nGenere: ${genre}\nValutazione: ${rating}\n\nDescrizione: ${description}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movieObj);
  };

  const isMovieFavorite = isFavorite(movieObj.id);

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={poster || "https://via.placeholder.com/300x450?text=No+Image"} alt={title} className="movie-poster" />
        {rating && <div className="movie-rating">⭐ {rating}</div>}
        <button
          className={`favorite-btn ${isMovieFavorite ? "favorite" : ""}`}
          onClick={handleFavoriteClick}
          title={isMovieFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          {isMovieFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="movie-info">
        <div className="movie-header">
          <h3 className="movie-title">{title}</h3>
          {year && <span className="movie-year">{year}</span>}
        </div>

        {genre && (
          <div className="movie-genre-container">
            <span className="movie-genre">{genre}</span>
          </div>
        )}

        {description && <p className="movie-description">{description}</p>}

        <div className="movie-actions">
          <button className="movie-details-btn" onClick={handleDetailsClick}>
            Dettagli
          </button>
          <button className={`movie-favorite-btn ${isMovieFavorite ? "favorite" : ""}`} onClick={handleFavoriteClick}>
            {isMovieFavorite ? "Rimuovi" : "Preferiti"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
