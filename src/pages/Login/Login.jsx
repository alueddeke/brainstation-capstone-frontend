import "./Login.scss";
import LoginModal from "../../components/LoginModal/LoginModal";
import { AuthProvider } from "../../contexts/authContext";

function Login() {
  return (
    <div className="content-wrapper">
      <div className="main__content-container">
        <main className="main">
          <AuthProvider>
            <LoginModal />
          </AuthProvider>
        </main>
      </div>
    </div>
  );
}

export default Login;
