import MovieItem from "../components/MovieItem";

const PageFavourites = ({ favs, toggleFavorites }) => {
  return (
     <main className="site-main">
      <h2 className="favourites__heading">
        <span className="u-pink-text">Favourite Movies</span>
      </h2>

      <section className="favourites__movie-container">
          {favs.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              toggleFavorites={toggleFavorites}
              isFavorite={true} // Since these are favorites, all are marked as favorites
            />
          ))}
          {favs.length === 0 && (
            <div className="sorry-text">
              <p>
                Sorry you have no favorite movies. Please return to the home
                page to add a favorite movie!
              </p>
            </div>
          )}
      </section>
    </main>
  )
}

export default PageFavourites