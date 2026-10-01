import type { Movie } from "../data/movies";
import { MovieCard } from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  favoriteIds: Set<string>;
  onAdd: (movie: Movie) => void;
  onRemove: (id: string) => void;
};

export function MovieList({ movies, favoriteIds, onAdd, onRemove }: MovieListProps) {
  return (
    <div className="movie-grid" aria-label="All movies" data-testid="list-movies">
      {movies.length ? movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} isFavorite={favoriteIds.has(movie.id)} onAdd={onAdd} onRemove={onRemove} />
      )) : (
        <div className="no-results" role="status" data-testid="status-no-movies">No films found. Try another title or genre.</div>
      )}
    </div>
  );
}