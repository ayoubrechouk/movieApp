import type { Movie } from "../data/movies";

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  index: number;
  onAdd: (movie: Movie) => void;
  onRemove: (id: string) => void;
};

export function MovieCard({ movie, isFavorite, index, onAdd, onRemove }: MovieCardProps) {
  return (
    <article className="movie-card" data-testid={`card-movie-${movie.id}`} style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }}>
      <div className="poster-frame">
        <img src={movie.posterUrl} alt={`${movie.title} poster`} loading="lazy" data-testid={`img-poster-${movie.id}`} />
        <span className="card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 12</span>
        <button
          type="button"
          className={`favorite-action${isFavorite ? " is-saved" : ""}`}
          aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          aria-pressed={isFavorite}
          data-testid={`${isFavorite ? "button-remove" : "button-add"}-favorite-${movie.id}`}
          onClick={() => isFavorite ? onRemove(movie.id) : onAdd(movie)}
        >
          {isFavorite ? "Remove" : "+"}
        </button>
      </div>
      <div className="movie-info">
        <div className="movie-title-row">
          <h3 className="movie-title" data-testid={`text-title-${movie.id}`}>{movie.title}</h3>
          <span className="movie-year">{movie.releaseYear}</span>
        </div>
        <p className="movie-genre">{movie.genre}</p>
      </div>
    </article>
  );
}