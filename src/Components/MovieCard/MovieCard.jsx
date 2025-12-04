import "./MovieCard.css";

const MovieCard = ({ title, poster, year, rating, genre, description }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={poster || "https://via.placeholder.com/300x450?text=No+Image"} alt={title} className="movie-poster" />
        {rating && <div className="movie-rating">⭐ {rating}</div>}
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

        <button className="movie-details-btn">Dettagli</button>
      </div>
    </div>
  );
};

export default MovieCard;
