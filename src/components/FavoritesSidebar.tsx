import type { Movie } from "../data/movies";

type FavoritesSidebarProps = {
  favorites: Movie[];
  isOpen: boolean;
  onRemove: (id: string) => void;
};

export function FavoritesSidebar({ favorites, isOpen, onRemove }: FavoritesSidebarProps) {
  return (
    <aside className={`favorites-panel${isOpen ? " is-open" : ""}`} aria-label="Your shortlist" data-testid="section-favorites">
      <div className="favorites-head">
        <h2>Tonight’s list</h2>
        <span className="favorites-total" aria-label={`${favorites.length} favorites`} data-testid="text-favorite-count">{favorites.length}</span>
      </div>
      <p className="favorites-intro">A few good possibilities, saved for when the credits roll.</p>
      {favorites.length ? (
        <ul className="favorite-list">
          {favorites.map((movie) => (
            <li className="favorite-row" key={movie.id} data-testid={`favorite-row-${movie.id}`}>
              <img className="favorite-thumb" src={movie.posterUrl} alt="" loading="lazy" />
              <div className="favorite-meta">
                <span className="favorite-title">{movie.title}</span>
                <span className="favorite-sub">{movie.releaseYear} · {movie.genre}</span>
              </div>
              <button
                type="button"
                className="remove-favorite"
                aria-label={`Delete ${movie.title} from favorites`}
                title={`Delete ${movie.title}`}
                data-testid={`button-delete-favorite-${movie.id}`}
                onClick={() => onRemove(movie.id)}
              >×</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-favorites" data-testid="empty-favorites">
          <span className="empty-mark" aria-hidden="true">+</span>
          <p>Your shortlist is still a blank reel.<br />Add a film that catches your eye.</p>
        </div>
      )}
      <div className="panel-footer">Saved on this device</div>
    </aside>
  );
}