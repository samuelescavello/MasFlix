import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input type="text" placeholder="Cerca..." value={query} onChange={(e) => setQuery(e.target.value)} className="search-input" />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
}
