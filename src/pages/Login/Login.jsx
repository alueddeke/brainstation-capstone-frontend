import "./Login.scss";
import LoginModal from "../../components/LoginModal/LoginModal";
import { AuthProvider } from "../../contexts/authContext";

function Login() {
  return (
    <div className="main__container">
      <main className="main">
        <AuthProvider>
          <LoginModal />
        </AuthProvider>
      </main>
    </div>
  );
}

export default Login;
