import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Header from "./Components/Header/Header";
import TrendingPage from "./Components/TrendingPage/TrendingPage";
import TopRatedPage from "./Components/TopRatedPage/TopRatedPage";
import FavoritesPage from "./Components/FavoritesPage/FavoritesPage";
import SearchResultsPage from "./Components/SearchResultsPage/SearchResultsPage";
import Footer from "./Components/Footer/Footeer";
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
      <Footer />
    </FavoritesProvider>
  );
}

export default App;
