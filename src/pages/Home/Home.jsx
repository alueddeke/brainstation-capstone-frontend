import MainForm from "../../components/MainForm/MainForm";

import "./Home.scss";
import { useAuth } from "../../contexts/authContext";

function Home() {
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <div className="content-wrapper">
      {userLoggedIn && (
        <div className="home__header-container">
          <h1>{`Hello ${
            currentUser.displayName
              ? currentUser.displayName
              : currentUser.email
          }, welcome back!`}</h1>
        </div>
      )}
      <div className="main__container">
        <main className="main">
          <MainForm />
        </main>
      </div>
    </div>
  );
}

export default Home;
