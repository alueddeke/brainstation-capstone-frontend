import MainForm from "../../components/MainForm/MainForm";

import "./Home.scss";
import { useAuth } from "../../contexts/authContext";

function Home() {
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <div className="content-wrapper">
      <div
        className={
          userLoggedIn
            ? "content-wrapper__sections"
            : "content-wrapper__logged-out"
        }
      >
        <div className={userLoggedIn ? "content-wrapper__left" : ""}>
          <div className="main__content-container">
            {userLoggedIn && (
              <div className="main__content-container">
                <div className="library">this is your library</div>
              </div>
            )}
          </div>
        </div>
        <div
          className={
            userLoggedIn
              ? "content-wrapper__right"
              : "content-wrapper__logged-out"
          }
        >
          <div className="home__header-wrapper">
            <div className="home__header-container">
              <h1>
                {userLoggedIn
                  ? `Hello ${
                      currentUser.displayName
                        ? currentUser.displayName
                        : currentUser.email
                    }, welcome back!`
                  : "Welcome to gist! Login or create an account to save your responses!"}
              </h1>
            </div>
          </div>

          <div className="main__content-container">
            <main className="main">
              <MainForm />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
