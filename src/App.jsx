import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Navigation = lazy(() => import("./components/Navigations/Navigations"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

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
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/movies"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MoviesPage />
              </Suspense>
            }
          />
          <Route
            path="/movies/:moviesId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetailsPage url={url} options={options} />
              </Suspense>
            }
          >
            <Route
              path="cast"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MovieCast />
                </Suspense>
              }
            />
            <Route
              path="reviews"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MovieReviews />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </main>
    </div>
  );
}

export default App;
