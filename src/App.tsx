import { useEffect, useMemo, useReducer, useState } from "react";
import { FavoritesSidebar } from "./components/FavoritesSidebar";
import { MovieList } from "./components/MovieList";
import { genres, movies } from "./data/movies";
import { favoritesReducer } from "./favoritesReducer";
import "./index.css";

const FAVORITES_KEY = "movie-discovery-favorites";

function App() {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All films");
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((item): item is typeof movies[number] =>
            item && typeof item === "object" &&
            typeof item.id === "string" &&
            movies.some((movie) => movie.id === item.id)
          ).map((item) => movies.find((movie) => movie.id === item.id)!);
          dispatch({ type: "HYDRATE_FAVORITES", favorites: valid });
        }
      }
    } catch {
      window.localStorage.removeItem(FAVORITES_KEY);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, isHydrated]);

  useEffect(() => {
    document.title = `Movies | ${favorites.length} Favorites`;
  }, [favorites.length]);

  const favoriteIds = useMemo(() => new Set(favorites.map((movie) => movie.id)), [favorites]);
  const filteredMovies = useMemo(() => movies.filter((movie) => {
    const matchesQuery = `${movie.title} ${movie.genre} ${movie.releaseYear}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (genre === "All films" || movie.genre === genre);
  }), [query, genre]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Films for tonight home">
          <span className="brand-mark" aria-hidden="true">F.</span>
          <span className="brand-name">Films for tonight</span>
        </a>
        <span className="topbar-note">A little cinema, close at hand</span>
      </header>
      <main className="page-wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">A considered watchlist</p>
            <h1 id="hero-title">Find your<br /><em>next favorite.</em></h1>
            <p className="hero-copy">Good films have a way of finding us. Browse a hand-picked shelf and save the ones you want to come back to.</p>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <div className="stamp-inner">Your own little<strong>cinema</strong>starts here</div>
          </div>
        </section>
        <section aria-labelledby="all-movies-heading">
          <div className="toolbar">
            <div className="section-heading">
              <h2 id="all-movies-heading">On the shelf</h2>
              <span className="count" data-testid="text-results-count">{filteredMovies.length.toString().padStart(2, "0")} FILMS</span>
            </div>
            <div className="controls">
              <label className="search-wrap">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input className="search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a film…" aria-label="Search films" data-testid="input-search-movies" />
              </label>
              <label>
                <span className="sr-only">Filter by genre</span>
                <select className="filter-select" value={genre} onChange={(event) => setGenre(event.target.value)} aria-label="Filter by genre" data-testid="select-genre">
                  {genres.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
            </div>
          </div>
          <button type="button" className="favorites-toggle" aria-expanded={favoritesOpen} aria-controls="section-favorites" onClick={() => setFavoritesOpen((open) => !open)} data-testid="button-toggle-favorites">
            {favoritesOpen ? "Close" : "View"} shortlist <span aria-hidden="true">·</span> {favorites.length}
          </button>
          <div className="content-layout">
            <MovieList
              movies={filteredMovies}
              favoriteIds={favoriteIds}
              onAdd={(movie) => dispatch({ type: "ADD_FAVORITE", movie })}
              onRemove={(id) => dispatch({ type: "REMOVE_FAVORITE", id })}
            />
            <FavoritesSidebar favorites={favorites} isOpen={favoritesOpen} onRemove={(id) => dispatch({ type: "REMOVE_FAVORITE", id })} />
          </div>
        </section>
        <footer className="page-footer">
          <span>Made for choosing slowly</span>
          <span>12 films · 01 shelf</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
