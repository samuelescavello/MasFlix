import SearchBar from "./SearchBar";

export default function MobileMenu({ close }) {
  return (
    <div className="mobile-menu-overlay">
      {/* Close */}
      <button className="mobile-close-button" onClick={close}>
        ✕
      </button>

      {/* Search */}
      <SearchBar />

      {/* Navigation */}
      <div className="mobile-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/trending" className="nav-link">
          Trending
        </Link>
        <Link to="/top-rated" className="nav-link">
          Top Rated
        </Link>
        <Link to="/favorites" className="nav-link">
          Preferiti
        </Link>
      </div>
    </div>
  );
}
