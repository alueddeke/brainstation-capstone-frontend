import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <h1 className="header__title">gist</h1>
        </Link>
        <div className="header__links">
          <div className="header__link-container">
            <p className="header__link">About</p>
          </div>
          <div className="header__link-container">
            <p className="header__link">Log in</p>
          </div>
          <div className="header__link-container">
            <p className="header__link">Sign up</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
