import React, { useState } from "react";

import "./LoginModal.scss";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithFacebook,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Navigate } from "react-router-dom";

import googleIcon from "../../assets/icons/google-icon.svg";
import facebookIcon from "../../assets/icons/facebook-icon.svg";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAnimation, setErrorAnimation] = useState(false);

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setEmailError("");
    setPasswordError("");
    setErrorMessage("");
    setErrorAnimation(false);

    if (!email && !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setErrorAnimation(true);
      setIsSigningIn(false);
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      setIsLoading(false);
      setErrorAnimation(true);
      setIsSigningIn(false);
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      setIsLoading(false);
      setErrorAnimation(true);
      setIsSigningIn(false);
      return;
    }

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        alert("sign in successful!");
        navigate("/");
      } catch (error) {
        console.error(error);
        setErrorAnimation(true);
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();

        navigate("/");
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
      setIsLoading(false);
    }
    console.log("Google Login");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //for now this is okay...eventually replace with github
  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithFacebook();
        // alert("sign in successful!");
        navigate("/");
      } catch (error) {
        console.error(error);
        // setErrorMessage(error.message);
        setIsSigningIn(false);
      }
      setIsLoading(false);
    }
    console.log("Facebook Login");
  };

  return (
    <>
      <div className="modal">
        <div className="modal__upper-half">
          <h2 className="modal__title">Login</h2>
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
            <button
              disabled={isSigningIn}
              type="submit"
              className="modal__form-submit-button"
            >
              Sign In
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
              disabled={isSigningIn}
              onClick={handleGoogleLogin}
              className="modal__social-button"
            >
              <img
                src={googleIcon}
                alt="google icon"
                className="login__icon login__icon--google"
              />
              Google
            </button>
            <button
              disabled
              onClick={handleFacebookLogin}
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

export default LoginModal;
