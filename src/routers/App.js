import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "../components/Header";
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import Footer from '../components/Footer';
import MovieDetails from '../components/MovieDetails';
import 'bootstrap';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<PageHome />} />
        <Route path="/about" exact element={<PageAbout />} />
        <Route path="/favorites" exact element={<PageHome isFavoriteContent={true} />} />
        <Route path="/movie/:movieId" exact element={<MovieDetails /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
