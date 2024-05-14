import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCarousel = ({ movies }) => {
  
  return (
    <div className='hero'>
     <Carousel
        fade
        interval={4000}
        indicators={false}
        controls={false}
      >
        {movies.map((movie) => {
          return (
            <Carousel.Item className="carousel">
              <h2 className="carousel__movie-heading">
                <Link className="carousel__link" to={`/movie/${movie.id}`}>{movie.title} </Link>
              </h2>

                <img
                  className="carousel__img d-block w-100"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={`A ${movie.title} movie poster`}
                />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  )
}

export default MovieCarousel
