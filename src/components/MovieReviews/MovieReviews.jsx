import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [movieReview, setMovieReview] = useState([]);

  useEffect(() => {
    const fetchMovieReview = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${moviesId}/reviews`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGIyMTA1OGYzNGIyZDViM2MwNDkyZWRlMTVkNDJmNiIsIm5iZiI6MTcyMzk4OTcxMy41MDc0ODQsInN1YiI6IjY2YzFjZjAzZTUwNTA5NDZkMTFhODk3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y2QK3_O7efI9PeuhyxTWekul6jfBj3ijfLsGJ6Gnp3w",
          },
        };
        const { data } = await axios.get(url, options);
        setMovieReview(data.results);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchMovieReview();
  }, [moviesId]);

  return (
    <div>
      {movieReview.length > 0 ? (
        movieReview.map((review) => (
          <div key={review.id} className={clsx(css.review)}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default MovieReviews;
