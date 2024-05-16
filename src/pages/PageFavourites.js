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
              isFavorite={true} //since these are favorites, all are marked as favorites
            />
          ))}
          {favs.length === 0 && (
            <div className="favourites__text-container">
              <p className="favourites__paragraph">
                Sorry, you don't have any favourite movies selected. Please return to the home
                page to add a favorite movie!
              </p>
            </div>
          )}
      </section>
    </main>
  )
}

export default PageFavourites;