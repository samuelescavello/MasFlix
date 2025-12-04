import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";

// Componenti temporanei per le rotte
const TrendingPage = () => (
  <main>
    <h1>Trending Movies</h1>
  </main>
);
const TopRatedPage = () => (
  <main>
    <h1>Top Rated Movies</h1>
  </main>
);
const FavoritesPage = () => (
  <main>
    <h1>I tuoi Preferiti</h1>
  </main>
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;

// --- IGNORE ---
