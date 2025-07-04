import React from "react";
import { signInWithGoogle } from "../firebaseConfig";
import { WiDaySunny } from "react-icons/wi";

export default function Home({ onLogin, onLogoClick }) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (onLogin) onLogin(result.user); // Pass user info up
    } catch (err) {
      alert("Google sign-in failed");
    }
  };

  return (
    <div className="home-center">
      <div className="weatherly-logo" onClick={onLogoClick} style={{ cursor: "pointer" }}>
      </div>
      <h1>Welcome to Weatherly!</h1>
      <p>
        Get real-time weather updates and forecasts for any city.<br />
        Sign in to start exploring the weather around the world.
      </p>
      <button className="login-btn" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
