import axios from "axios";
import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("query") || "";

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchParams({ query: newQuery });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.trim() === "") {
        setMovies([]);
        return;
      }

      try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGIyMTA1OGYzNGIyZDViM2MwNDkyZWRlMTVkNDJmNiIsIm5iZiI6MTcyMzk4OTcxMy41MDc0ODQsInN1YiI6IjY2YzFjZjAzZTUwNTA5NDZkMTFhODk3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y2QK3_O7efI9PeuhyxTWekul6jfBj3ijfLsGJ6Gnp3w",
          },
        };

        const { data } = await axios.get(url, options);
        setMovies(data.results);
      } catch (err) {
        console.error("Error fetching movie data:", err);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <ul className={css.list}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;
