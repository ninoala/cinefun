import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';
import posterPlaceholder from '../assets/no-poster.png';

const MovieItem = ({ movie, isFavorite, toggleFavorites }) => {
  //tertiary operator for a movie poster/placeholder
  const poster = movie.poster_path
    ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
    : posterPlaceholder;

  return (
    <figure className="movie-item">
      <div className="movie-item__poster">
        <img src={poster} alt={movie.title} className="movie-item__img"/>
        
        {/*toggle favourites icons*/}
        {!isFavorite && (
          <a onClick={() => toggleFavorites(movie)}>
            <FontAwesomeIcon className="movie-item__icon--unclicked" icon={faHeartRegular} />
          </a>
        )}
        {isFavorite && (
          <a onClick={() => toggleFavorites(movie)}>
             <FontAwesomeIcon className="movie-item__icon--clicked" icon={faHeartSolid} />
          </a>
        )}

        <div className="movie-item__info">
          <a href={`/movie/${movie.id}`} id="movieTitle" className="movie-item__title">
            {movie.title}
          </a>

        <p className="movie-item__released">Released: {movie.release_date}</p>

        <div className="movie-item__rating">
           <StarRating voteAverage={movie.vote_average} />
        </div>
      </div>

        <div className="movie-item__hover">
          <p className="movie-item__paragraph">{movie.overview}</p>
          <Link to={`/movie/${movie.id}`}>
            <button type="button" className="btn btn-outline-danger">
              More info
            </button>
          </Link>
        </div>
      </div>
    </figure>
  );
}

export default MovieItem