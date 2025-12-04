import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Header from "./Components/Header/Header";
import TrendingPage from "./Components/TrendingPage/TrendingPage";
import TopRatedPage from "./Components/TopRatedPage/TopRatedPage";
import FavoritesPage from "./Components/FavoritesPage/FavoritesPage";
import SearchResultsPage from "./Components/SearchResultsPage/SearchResultsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </>
  );
}

export default App;

// --- IGNORE ---
