import Navigation from "./Navigations";
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
        <Navigation />
      </div>
    </div>
  );
}
