import { useEffect, useState } from "react";
import axios from "axios";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGIyMTA1OGYzNGIyZDViM2MwNDkyZWRlMTVkNDJmNiIsIm5iZiI6MTcyMzk4OTcxMy41MDc0ODQsInN1YiI6IjY2YzFjZjAzZTUwNTA5NDZkMTFhODk3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y2QK3_O7efI9PeuhyxTWekul6jfBj3ijfLsGJ6Gnp3w",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(url, options);
        setMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
