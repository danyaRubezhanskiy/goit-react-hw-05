import { Route, Routes } from "react-router-dom";

import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import axios from "axios";
import { lazy, useEffect, useState } from "react";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Navigation = lazy(() =>
  import("./pages/components/Navigation/Navigation")
);
const MovieCast = lazy(() => import("./pages/components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./pages/components/MovieReviews/MovieReviews")
);
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));

function App() {
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
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />}></Route>
          <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
          <Route
            path="/movies/:moviesId"
            element={<MovieDetailsPage url={url} options={options} />}
          >
            <Route path="cast" element={<MovieCast />}></Route>
            <Route path="reviews" element={<MovieReviews />}></Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
