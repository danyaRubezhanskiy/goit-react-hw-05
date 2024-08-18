import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const { moviesId } = useParams();
  const [movieData, setMovieData] = useState([]);

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
        console.log(data);
        setMovieData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchSingleMovie();
  }, [moviesId]);

  return (
    <div className={css.mainContainer}>
      <button>Go back</button>
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
            <p>dfsaf</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;
