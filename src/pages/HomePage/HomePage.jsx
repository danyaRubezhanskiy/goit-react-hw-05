import { Link, useLocation } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <h1 className={css.title}>Trending Today</h1>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>
              {movie.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
