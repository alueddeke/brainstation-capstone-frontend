import SignupModal from "../../components/SignupModal/SignupModal";
import { AuthProvider } from "../../contexts/authContext";

function Signup() {
  return (
    <div className="content-wrapper">
      <div className="main__content-container">
        <main className="main">
          <AuthProvider>
            <SignupModal />
          </AuthProvider>
        </main>
      </div>
    </div>
  );
}

export default Signup;
