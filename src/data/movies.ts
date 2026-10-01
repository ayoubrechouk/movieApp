export type Movie = {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  posterUrl: string;
};

const poster = (title: string, color: string, ink = "f7f0df") =>
  `https://placehold.co/480x700/${color}/${ink}.png?text=${title.replace(/ /g, "+")}`;

export const movies: Movie[] = [
  { id: "after-the-rain", title: "After the Rain", releaseYear: 2023, genre: "Drama", posterUrl: poster("AFTER%0ATHE%0ARAIN", "536f67") },
  { id: "little-astronaut", title: "Little Astronaut", releaseYear: 2024, genre: "Adventure", posterUrl: poster("LITTLE%0AASTRONAUT", "cf8a68") },
  { id: "blue-hour", title: "Blue Hour", releaseYear: 2022, genre: "Romance", posterUrl: poster("BLUE%0AHOUR", "3e5369") },
  { id: "the-last-postcard", title: "The Last Postcard", releaseYear: 2021, genre: "Mystery", posterUrl: poster("THE LAST%0APOSTCARD", "bf995c") },
  { id: "soft-landing", title: "Soft Landing", releaseYear: 2024, genre: "Comedy", posterUrl: poster("SOFT%0ALANDING", "b86554") },
  { id: "wild-current", title: "Wild Current", releaseYear: 2020, genre: "Thriller", posterUrl: poster("WILD%0ACURRENT", "3d625e") },
  { id: "paper-moons", title: "Paper Moons", releaseYear: 2023, genre: "Fantasy", posterUrl: poster("PAPER%0AMOONS", "87718d") },
  { id: "north-of-summer", title: "North of Summer", releaseYear: 2019, genre: "Drama", posterUrl: poster("NORTH OF%0ASUMMER", "73808a") },
  { id: "house-of-small-things", title: "House of Small Things", releaseYear: 2022, genre: "Family", posterUrl: poster("HOUSE OF%0ASMALL THINGS", "c38d5e") },
  { id: "electric-garden", title: "Electric Garden", releaseYear: 2024, genre: "Sci-Fi", posterUrl: poster("ELECTRIC%0AGARDEN", "637766") },
  { id: "second-sunday", title: "Second Sunday", releaseYear: 2021, genre: "Comedy", posterUrl: poster("SECOND%0ASUNDAY", "a36e6b") },
  { id: "a-place-between", title: "A Place Between", releaseYear: 2020, genre: "Romance", posterUrl: poster("A PLACE%0ABETWEEN", "64718b") },
];

export const genres = ["All films", ...Array.from(new Set(movies.map((movie) => movie.genre)))];