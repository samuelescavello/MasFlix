import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Ricerca per:", query);
    alert(`Ricerca per: ${query}`);
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
