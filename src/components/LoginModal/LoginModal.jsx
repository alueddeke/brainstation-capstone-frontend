import React, { useState, useEffect } from "react";
import "./LoginModal.scss";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Navigate } from "react-router-dom";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //logged in status
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  console.log(userLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        alert("sign in successful!");
        navigate("/");
      } catch (error) {
        console.error(error);
        // setErrorMessage(error.message);
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
        // alert("sign in successful!");
        navigate("/");
      } catch (error) {
        console.error(error);
        // setErrorMessage(error.message);
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

  const handleFacebookLogin = () => {
    // Implement Firebase Facebook authentication here
    console.log("Facebook Login");
  };

  //i want to set errormessage if there is any error, and display it in the appropriate place

  return (
    <>
      <div className="modal">
        <div className="modal__upper-half">
          <h2 className="modal__title">Login</h2>
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
            {/* this is kind of how you could display errors */}
            {/* {errorMessage && <span className="error">{errorMessage}</span>} */}
            <button
              disabled={isSigningIn}
              type="submit"
              className="modal__form-submit-button"
            >
              Sign In
            </button>
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
              Google
            </button>
            <button
              disabled={isSigningIn}
              onClick={handleFacebookLogin}
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

export default LoginModal;
