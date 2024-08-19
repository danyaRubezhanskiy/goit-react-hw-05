import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieCast = () => {
  const { moviesId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const fetchMovieCasts = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${moviesId}/credits`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGIyMTA1OGYzNGIyZDViM2MwNDkyZWRlMTVkNDJmNiIsIm5iZiI6MTcyMzk4OTcxMy41MDc0ODQsInN1YiI6IjY2YzFjZjAzZTUwNTA5NDZkMTFhODk3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y2QK3_O7efI9PeuhyxTWekul6jfBj3ijfLsGJ6Gnp3w",
          },
        };
        const { data } = await axios.get(url, options);
        setMovieCast(data.cast);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchMovieCasts();
  }, [moviesId]);

  return (
    <div>
      {movieCast.length > 0 ? (
        <ul>
          {movieCast.map((actor) => (
            <li key={actor.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.original_name}
                width={200}
                height={300}
              ></img>
              <p>{actor.original_name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
