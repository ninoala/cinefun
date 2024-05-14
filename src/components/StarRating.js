import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ voteAverage }) => {
  // Calculations to transform movie's vote average into a displayed star rating
  const fullStarCount = Math.floor(voteAverage / 2);
  const halfStarCount = voteAverage - Math.floor(voteAverage) >= 0.5 ? 1 : 0;
  const emptyStarCount = 5 - (fullStarCount + halfStarCount);

  return (
    <div className="movie-item__rating">
      {[...Array(fullStarCount).keys()].map((i) => (
        <FontAwesomeIcon key={i} className="movie-item__star" icon={solidStar} />
      ))}
      {!!halfStarCount &&
        [...Array(halfStarCount).keys()].map((i) => (
          <FontAwesomeIcon key={i} className="movie-item__star" icon={halfStar} />
        ))}
      {[...Array(emptyStarCount).keys()].map((i) => (
        <FontAwesomeIcon key={i} className="movie-item__star" icon={regularStar} />
      ))}
    </div>
  );
}

export default StarRating;