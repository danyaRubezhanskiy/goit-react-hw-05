import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  console.log(location);
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  useEffect(() => {
    const fetchSingleMovie = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${moviesId}?language=en-US`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGIyMTA1OGYzNGIyZDViM2MwNDkyZWRlMTVkNDJmNiIsIm5iZiI6MTcyMzk4OTcxMy41MDc0ODQsInN1YiI6IjY2YzFjZjAzZTUwNTA5NDZkMTFhODk3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y2QK3_O7efI9PeuhyxTWekul6jfBj3ijfLsGJ6Gnp3w",
          },
        };
        const { data } = await axios.get(url, options);
        setMovieData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchSingleMovie();
  }, [moviesId]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.mainContainer}>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={css.movieContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.original_title}
          width={300}
          height={450}
        />
        <ul className={css.list}>
          <li>
            <h2>{movieData.original_title}</h2>
            <p>User Score: {Math.round(movieData.popularity / 100)}%</p>
          </li>
          <li>
            <h2>Overview</h2>
            <p>{movieData.overview}</p>
          </li>
          <li>
            <h2>Genres</h2>
            <p>{movieData.genres?.map((genre) => genre.name).join(", ")}</p>
          </li>
        </ul>
      </div>
      <h2>Additional information</h2>
      <ul className={css.linkList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
