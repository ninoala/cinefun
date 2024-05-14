import { createContext, useContext, useState, useEffect } from 'react';

//create context for favorites
const FavoritesContext = createContext();

//custom hook to consume favorites context
export const useFavorites = () => useContext(FavoritesContext);

//provider component to manage favorites state and provide context
export const FavoritesProvider = ({ children }) => {
  //initialize favorites state from local storage or empty array
  const [favs, setFavs] = useState(() => {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  });

  //update local storage when favorites state changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favs));
  }, [favs]);

  //function to toggle favorites on movie items
  const toggleFavorites = (movie) => {
    if (favs.find((m) => m.id === movie.id)) {
      setFavs((favourites) => favourites.filter((m) => m.id !== movie.id)); // Remove from favorites if already favorited
    } else {
      setFavs((favourites) => [...favourites, movie]); // Add to favorites
    }
  };

  return (
    <FavoritesContext.Provider value={{ favs, toggleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};