import MainForm from "../../components/MainForm/MainForm";

import "./Home.scss";
import { useAuth } from "../../contexts/authContext";

function Home() {
  const { currentUser } = useAuth();
  return (
    <div className="main__container">
      {/* <h1>{`Hello ${
        currentuser.displayName ? currentUser.displayName : currentUser.email
      }, welcome back!`}</h1> */}
      <main className="main">
        <MainForm />
      </main>
    </div>
  );
}

export default Home;
