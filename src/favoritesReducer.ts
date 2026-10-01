import type { Movie } from "./data/movies";

export type FavoritesAction =
  | { type: "ADD_FAVORITE"; movie: Movie }
  | { type: "REMOVE_FAVORITE"; id: string }
  | { type: "HYDRATE_FAVORITES"; favorites: Movie[] };

export function favoritesReducer(state: Movie[], action: FavoritesAction): Movie[] {
  switch (action.type) {
    case "ADD_FAVORITE":
      return state.some((movie) => movie.id === action.movie.id) ? state : [...state, action.movie];
    case "REMOVE_FAVORITE":
      return state.filter((movie) => movie.id !== action.id);
    case "HYDRATE_FAVORITES":
      return action.favorites;
    default:
      return state;
  }
}