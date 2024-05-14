import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import StarRating from './StarRating';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const { pathname } = useLocation();

  //function to fetch movie details based on the movieID
  const fetchData = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=872740d273c03dd90e09f632c6c02b2b`
    );
    const json = await api.json();
    setMovie(json);
  };

  //fetch movie details when the component mounts or when movieId changes
  useEffect(() => {
    fetchData();
  }, [movieId]);

   //state to manage favorite movies
  const [favs, setFavs] = useState(() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });

  //function to toggle favorite status of a movie(repeated code from other component, could be its own component)
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favs));
  }, [favs]);
  if (!movie) return null;
  const toggleFavorites = (movie) => {
    if (favs.find((m) => m.id === movie.id)) {
      setFavs((favorites) => favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavs((favorites) => [...favorites, movie]);
    }
  };
  const isFavorite = !!favs.find((m) => m.id === movie.id);

  //obtain the movie poster and the backdrop
  const poster = movie.poster_path
    ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
    : "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png";
  const backdrop = `https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path}`;

  //function to convert pure minutes from API into hours and minutes format
  const runtimeInHoursAndMins = (pureMinutes) => {
    const hours = Math.floor(pureMinutes / 60);
    const minutes = pureMinutes % 60;
    return hours + 'h ' + minutes + 'm';
  };



  return (
    <>
      <div className="movie-details">
        <img className="movie-details__poster" src={poster} alt={movie.title} />

        <div className="movie-details__text-container">
          <h1 className="movie-details__heading">{movie.title}</h1>

          <div className="movie-details__flex-container">
            <p className="movie-details__release">Release Date: {movie.release_date}</p>
            <p className="movie-details__runtime">{runtimeInHoursAndMins(movie.runtime)}</p>
            <StarRating voteAverage={movie.vote_average} />
          </div>

          {movie.tagline && (
            <div className="movie-details__tagline">
              <p>{movie.tagline}</p>
            </div>
          )}

          <p className="movie-details__overview">{movie.overview}</p>

          <div className="movie-details__genre-info">
            <h2>Genre</h2>

            <div className="movie-details__genre-flex-container">
              {movie.genres.length > 0 ? (
                movie.genres.map((genre, i) => <p key={i}>{genre.name}</p>)
              ) : (
                <p>Genre coming soon...</p>
              )}
            </div>
          </div>
        </div>

        <img className="bg-cover" src={backdrop} />
      </div>

      <div className="movie-details__buttons">
        {!isFavorite && (
          <a
            href="#"
            className="btn btn-outline-danger"
            onClick={() => toggleFavorites(movie)}
          >
            Add to Favorites
          </a>
        )}
        {isFavorite && (
          <a
            href="#"
            className="btn btn-danger"
            onClick={() => toggleFavorites(movie)}
          >
            Remove from Favorites
          </a>
        )}

      <a className="btn btn-outline-danger">
        <Nav.Link href="/" active={pathname === "/"}>
          Back to Home
        </Nav.Link>
      </a>
    </div>
    </>
  );
};

export default MovieDetails;