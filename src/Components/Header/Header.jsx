import Logo from "./Logo";
import Navigation from "./Navigations";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import "./Header.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      {/* LOGO */}
      <Logo />

      {/* NAV DESKTOP */}
      <nav className="nav-desktop">
        <Navigation />
      </nav>

      {/* SEARCH + USER */}
      <div className="search-user-container">
        <SearchBar />
        <UserMenu />
      </div>

      {/* MOBILE MENU BUTTON */}
      <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)}>
        ☰
      </button>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}
    </header>
  );
}
