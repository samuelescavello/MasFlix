import React, { useState, useEffect } from 'react';
import './MovieDetails.css';
import { getMovieDetails } from '../../services/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movie.id);
        setDetails(data);

        // Carica i video/trailer
        const videosResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=it-IT`
        );
        const videosData = await videosResponse.json();
        
        // Cerca il trailer ufficiale
        const trailer = videosData.results?.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        ) || videosData.results?.find(
          video => video.site === 'YouTube'
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dettagli:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movie.id) {
      fetchDetails();
    }
  }, [movie.id]);

  const handleTrailerClick = () => {
    if (trailerKey) {
      setShowTrailer(true);
    } else {
      alert('Trailer non disponibile per questo film');
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="loading-spinner">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (!details) return null;

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const backdropUrl = details.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : details.poster_path 
    ? `https://image.tmdb.org/t/p/original${details.poster_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  const posterUrl = details.poster_path 
    ? `${IMAGE_BASE_URL}${details.poster_path}` 
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const runtime = details.runtime 
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}min`
    : 'N/A';

  const genres = details.genres?.slice(0, 3) || [];
  
  // Calcola le stelle per il rating
  const rating = details.vote_average || 0;
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = (rating / 2) % 1 >= 0.5;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>×</button>
          
          <svg style={{width:0, height:0, position:'absolute'}} aria-hidden="true" focusable="false">
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
            </linearGradient>
          </svg>

          <div className="movie-card-detail">
            <div className="movie-img-container">
              <div 
                className="movie-img" 
                style={{
                  backgroundImage: `url(${backdropUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              ></div>
              <div className="movie-overlay"></div>
            </div>
            
            <div className="movie-content">
              <div className="title-row">
                <h1 className="movie-title">
                  {details.title} 
                  <span className="year-badge">
                    {details.release_date ? details.release_date.split('-')[0] : 'N/A'}
                  </span>
                </h1>
                <span className="rating-badge">
                  {details.adult ? '18+' : 'PG'}
                </span>
              </div>

              <div className="metadata">
                <div className="duration">
                  <svg className="duration-icon" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  {runtime}
                </div>
              </div>

              <div className="genres">
                {genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>

              <div className="ratings-row">
                <div className="star-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, index) => {
                      if (index < fullStars) {
                        return (
                          <svg key={index} className="star star-filled" viewBox="0 0 24 24">
                            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                          </svg>
                        );
                      } else if (index === fullStars && hasHalfStar) {
                        return (
                          <svg key={index} className="star star-half" viewBox="0 0 24 24">
                            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                          </svg>
                        );
                      } else {
                        return (
                          <svg key={index} className="star star-empty" viewBox="0 0 24 24">
                            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                          </svg>
                        );
                      }
                    })}
                  </div>
                  <span className="rating-text">{rating.toFixed(1)}/10</span>
                </div>

                <div className="likes">
                  <svg className="heart-icon" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="likes-count">
                    {details.vote_count > 1000 
                      ? `${(details.vote_count / 1000).toFixed(1)}K` 
                      : details.vote_count}
                  </span>
                </div>
              </div>

              <div className="description-section">
                <h5 className="section-title">TRAMA</h5>
                <p className="movie-description">
                  {details.overview || 'Nessuna descrizione disponibile.'}
                </p>
              </div>

              {details.production_companies && details.production_companies.length > 0 && (
                <div className="cast-section">
                  <h5 className="section-title">PRODUZIONE</h5>
                  <div className="cast-list">
                    {details.production_companies.slice(0, 4).map((company) => (
                      <div key={company.id} className="cast-item">
                        {company.logo_path ? (
                          <img 
                            src={`${IMAGE_BASE_URL}${company.logo_path}`} 
                            className="cast-photo" 
                            alt={company.name}
                            style={{objectFit: 'contain', background: '#fff', padding: '5px'}}
                          />
                        ) : (
                          <div className="cast-photo" style={{
                            background: '#2a2a2a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                          }}>
                            🎬
                          </div>
                        )}
                        <span className="cast-name">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="action-row">
                <div 
                  className={`watch-btn ${!trailerKey ? 'disabled' : ''}`}
                  onClick={handleTrailerClick}
                  style={{ cursor: trailerKey ? 'pointer' : 'not-allowed', opacity: trailerKey ? 1 : 0.5 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="watch-btn-text">
                    {trailerKey ? 'GUARDA TRAILER' : 'TRAILER NON DISPONIBILE'}
                  </span>
                </div>

                {/* <div className="action-btn">
                  <svg className="action-icon" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                  </svg>
                </div>

                <div className="action-btn">
                  <svg className="action-icon" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>

                <div className="action-btn">
                  <svg className="action-icon" viewBox="0 0 24 24">
                    <path d="M15 4C12.8 4 11 5.8 11 8c0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.2-1.8-4-4-4zm4.9 8.5c.6 1 .8 2.3.8 3.5 0 2.8-2.2 5-5 5h-5.4c-3.1 0-5.6-2.5-5.6-5.6V15c0-1.1.9-2 2-2h4.6c.3 0 .5.1.7.3.5.5.8 1.1.8 1.7v.3c0 .3-.3.6-.6.6h-1.5c-.5 0-.9.4-.9.9s.4.9.9.9h2.4c1.1 0 2.1-.5 2.8-1.2.4-.4 1.2-1.5 1.2-1.5M9 17c-.8 0-1.5-.7-1.5-1.5S8.2 14 9 14s1.5.7 1.5 1.5S9.8 17 9 17z"/>
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Trailer */}
      {showTrailer && trailerKey && (
        <div className="trailer-modal-overlay" onClick={handleCloseTrailer}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="trailer-close-btn" onClick={handleCloseTrailer}>×</button>
            <div className="trailer-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;