import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import whiteLogo from "../../assets/icons/gist_logo_white.svg";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

function Header({ setLibraryViews }) {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

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
          {/* <div className="header__link-container">
            <Link to="/About" className="header__link">
              About
            </Link>
          </div> */}

          <div className="header__logged-in-container">
            {userLoggedIn ? (
              <button
                className="header__link-container logout-button"
                onClick={() => {
                  doSignOut().then(() => {
                    setLibraryViews([]);
                    alert("You have successfully logged out!");
                    navigate("/");
                  });
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <div className="header__link-container">
                  <Link to="/Login" className="header__link">
                    Login
                  </Link>
                </div>
                <div className="header__link-container">
                  <Link to="/Signup" className="header__link">
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
