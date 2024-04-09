import SignupModal from "../../components/SignupModal/SignupModal";
import { AuthProvider } from "../../contexts/authContext";

function Login() {
  return (
    <div className="main__container">
      <main className="main">
        <AuthProvider>
          <SignupModal />
        </AuthProvider>
      </main>
    </div>
  );
}

export default Login;
