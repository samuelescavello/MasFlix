import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo.png";
import "./Header.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="link">MasFlix</div>

      {/* NAV DESKTOP */}
      <nav className="nav-desktop">
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
      </nav>

      {/* SEARCH + USER */}
      <div className="search-user-container">
        <SearchBar />
        <div className="user-menu">👤</div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="mobile-menu-button"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}
    </header>
  );
}
