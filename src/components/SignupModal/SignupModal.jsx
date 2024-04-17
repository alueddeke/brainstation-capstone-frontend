import React, { useState } from "react";
import "./SignupModal.scss";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithFacebook,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Navigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-icon.svg";
import facebookIcon from "../../assets/icons/facebook-icon.svg";

const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { userLoggedIn } = useAuth();
  const [errorAnimation, setErrorAnimation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      setErrorAnimation(true);
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      setErrorAnimation(true);
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      setErrorAnimation(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Your passwords must match");
      setErrorAnimation(true);
      return;
    }

    setIsRegistering(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      alert("Sign up successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorAnimation(true);
      setErrorMessage(error.message);
    }
    setIsRegistering(false);
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
            {emailError && (
              <span
                className={`login__error ${
                  errorAnimation ? "login__error--animate" : ""
                }`}
              >
                {emailError}
              </span>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="modal__form-input modal__form-email"
            />
            {passwordError && (
              <span
                className={`login__error ${
                  errorAnimation ? "login__error--animate" : ""
                }`}
              >
                {passwordError}
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="modal__form-input modal__form-password"
            />
            {confirmPasswordError && (
              <span
                className={`login__error ${
                  errorAnimation ? "login__error--animate" : ""
                }`}
              >
                {confirmPasswordError}
              </span>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="modal__form-input modal__form-password"
            />
            <button type="submit" className="modal__form-submit-button">
              Sign Up
            </button>
            {errorMessage && (
              <span className="login__error">{errorMessage}</span>
            )}
          </form>
        </div>
        <div className="modal__lower-half">
          <p className="modal__social-login-options">Or sign in with:</p>
          <div className="modal__social-buttons">
            <button
              onClick={handleGoogleSignup}
              className="modal__social-button"
            >
              {" "}
              <img
                src={googleIcon}
                alt="google icon"
                className="login__icon login__icon--google"
              />
              Google
            </button>
            <button
              disabled
              onClick={handleFacebookSignup}
              className="modal__social-button"
            >
              <img
                src={facebookIcon}
                alt="facebook icon"
                className="login__icon"
              />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
