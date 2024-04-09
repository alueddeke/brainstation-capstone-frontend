import React, { useState } from "react";
import "./SignupModal.scss";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithFacebook,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Navigate } from "react-router-dom";

const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  //logged in status
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      //do i need to add auth to this?
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleGoogleSignup = async (e) => {
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doSignInWithGoogle();
        navigate("/");
      } catch (error) {
        console.error("Error signing up with Google:", error.message);
      }
      setIsRegistering(false);
    }
  };

  const handleFacebookSignup = async (e) => {
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doSignInWithFacebook();
        navigate("/");
      } catch (error) {
        console.error("Error signing up with Facebook:", error.message);
      }
      setIsRegistering(false);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="modal">
        <div className="modal__upper-half">
          <h2 className="modal__title">Sign up to Create an Account</h2>
          <form className="modal__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="modal__form-input modal__form-email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="modal__form-input modal__form-password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="modal__form-input modal__form-password"
            />
            {/* display appropriate error, is about password show above password */}
            {/* {errorMessage && <span className="error">{errorMessage}</span>} */}
            <button type="submit" className="modal__form-submit-button">
              Sign Up
            </button>
          </form>
        </div>
        <div className="modal__lower-half">
          <p className="modal__social-login-options">Or sign in with:</p>
          <div className="modal__social-buttons">
            <button
              onClick={handleGoogleSignup}
              className="modal__social-button"
            >
              Google
            </button>
            <button
              onClick={handleFacebookSignup}
              className="modal__social-button"
            >
              Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
