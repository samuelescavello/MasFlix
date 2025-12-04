import MovieCard from "../MovieCard/MovieCard";
import "./MovieSection.css";

export default function MovieSection() {
  const exampleMovies = [
    {
      id: 1,
      title: "Inception",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
      year: "2010",
      rating: "8.8",
      genre: "Sci-Fi",
      description:
        "Un ladro che ruba segreti aziendali attraverso l'uso della tecnologia di condivisione dei sogni riceve il compito inverso di piantare un'idea nella mente di un CEO.",
    },
    {
      id: 2,
      title: "The Dark Knight",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      year: "2008",
      rating: "9.0",
      genre: "Action",
      description:
        "Batman deve accettare una delle sfide più grandi per combattere l'ingiustizia quando il Joker semina il caos tra i cittadini di Gotham.",
    },
    {
      id: 3,
      title: "Interstellar",
      poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=450&fit=crop",
      year: "2014",
      rating: "8.6",
      genre: "Sci-Fi",
      description:
        "Un gruppo di esploratori spaziali si avventura attraverso un wormhole nello spazio nel tentativo di assicurare la sopravvivenza dell'umanità.",
    },
  ];

  return (
    <div className="movie-section">
      <h2 className="section-title">Film Popolari</h2>
      <div className="movies-grid">
        {exampleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            year={movie.year}
            rating={movie.rating}
            genre={movie.genre}
            description={movie.description}
          />
        ))}
      </div>
    </div>
  );
}
