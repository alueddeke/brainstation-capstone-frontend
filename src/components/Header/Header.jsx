import "./Header.scss";
import { Link } from "react-router-dom";
import whiteLogo from "../../assets/icons/gist_logo_white.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <div className="header__logo-container">
            <img
              src={whiteLogo}
              alt="white logo"
              className="header__logo
          "
            />
            <h1 className="header__title">ist</h1>
          </div>
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
