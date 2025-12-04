import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
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
    </>
  );
}
