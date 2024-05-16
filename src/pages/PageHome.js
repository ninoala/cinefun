import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PageFavorites from "./PageFavourites";
import MovieItem from '../components/MovieItem';
import MovieCarousel from "../components/MovieCarousel";
import MoviePagination from "../components/MoviePagination";

const PageHome = ({ isFavoriteContent }) => {
  //states for managing fetched data
  const [movies, setMovies] = useState([]); //movies data goes here
  const [filter, setFilter] = useState("popular"); //filter criteria
  //states for pagination
  const [page, setPage] = useState(1); //current page number
  const [totalPage, setTotalPage] = useState(1); //total number of pages
  //state for user input search term
  const [searchTerm, setSearchTerm] = useState('');

  const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=2cb68d27ae663dc4770f1487751583a0&query=";

  //function that fetches the data asynchronously based on filter and page
  const fetchData = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?page=${page}&api_key=872740d273c03dd90e09f632c6c02b2b`
    );
    const json = await api.json();
    setMovies(json.results);
    setTotalPage(json.total_pages);
  };

  //search function, fetches data based on the search term on submit, updates movies state w/ search results 
  //and clears the search term
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setSearchTerm('');
        });
    }
  };
  
  //update searchTerm state with the user entered value
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //call fetchData function when filter or page changes
  useEffect(() => {
    fetchData();
  }, [filter, page]);
  //reset page to 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  //initialize favorites state from local storage or empty array
  const [favs, setFavs] = useState(() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });

  //update local storage when favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favs));
  }, [favs]);

  //function to toggle favorites on movie items
  const toggleFavorites = (movie) => {
    if (favs.find((m) => m.id === movie.id)) {
      setFavs((favorites) => favorites.filter((m) => m.id !== movie.id));//remove from favourites if already favourited
    } else {
      setFavs((favorites) => [...favorites, movie]);//add to favourites
    }
  };

  //if statement that returns favourites page if there are any movies favourited by a user
   if (isFavoriteContent) {
    return <PageFavorites favs={favs} toggleFavorites={toggleFavorites} />;
  }

  if (!movies) return;

  return (
    <main className="site-main" id="main">
      <section className="section-movie-carousel">
        <MovieCarousel movies={movies} />
      </section>

      <section className="section-browse">
        <h2 className="section-browse__heading">
          <span className="u-pink-text">Browse</span> Movies
        </h2>

        <form className="section-browse__form" onSubmit={handleOnSubmit}>
          <input
            className="section-browse__input"
            type="search"
            placeholder="Search" 
            value={searchTerm}
            onChange={handleOnChange}
            aria-label="Search movies"
          />
          <button type="submit" className="section-browse__search-btn" aria-label="Submit search">
            <FontAwesomeIcon icon={faSearch} className="section-browse__icon"/>
          </button>
        </form>

        <div className="section-browse__filter">
          <label htmlFor="sort-by" className="section-browse__label">
            Display by:
          </label>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            name="sort-by"
            className="section-browse__select"
            aria-label="Select filter"
          >
            <option className="section-browse__option" value="popular">Popular</option>
            <option className="section-browse__option" value="now_playing">Now Playing</option>
            <option className="section-browse__option" value="top_rated">Top Rated</option>
            <option className="section-browse__option" value="upcoming">Upcoming</option>
          </select>
        </div>
      </section>

      <section className="section-grid">
        <div className="section-grid__container">
          {movies.map((movie) => (
            <MovieItem
              className="section-grid__item"
              key={movie.id}
              movie={movie}
              toggleFavorites={toggleFavorites}
              isFavorite={!!favs.find((m) => m.id === movie.id)}
            />
          ))}
        </div>

        <MoviePagination activePage={page} setPage={setPage} totalPage={totalPage} />
      </section>
    </main>
  );
}

export default PageHome;