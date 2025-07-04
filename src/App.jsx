import React, { useState } from 'react';
import Weather from "./components/Weather";
import Home from "./components/Home";
import { WiDaySunny } from "react-icons/wi";
import './App.css';

export default function App() {
  const [showWeather, setShowWeather] = useState(false);
  const [user, setUser] = React.useState(null);
  const [showDropdown, setShowDropdown] = useState(false); 
  const [imgError, setImgError] = useState(false);

  const handleLogin = (googleUser) => {
    setUser(googleUser);
    setShowWeather(true);
  };

  const handleLogout = () => {
    setUser(null);
    setShowWeather(false);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.profile-bar')) setShowDropdown(false);
    };
    if (showDropdown) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDropdown]);

  // Add this handler:
  const handleLogoClick = () => {
    setShowWeather(false);
    setShowDropdown(false);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        {/* Weatherly logo/name on the left */}
        <div
          className="weatherly-topright"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <WiDaySunny size={28} color="#2563eb" /> {/* Reduced size */}
          <span className="weatherly-name" style={{ fontSize: "1.5rem" }}>Weatherly</span>
        </div>

        {/* Profile on the right */}
        {user && showWeather && (
          <div className="profile-bar">
            <span
              className="profile-circle"
              onClick={() => setShowDropdown((prev) => !prev)}
              title="Profile"
            >
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </span>
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-avatar">
                  {user.photoURL && !imgError ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span>{user.displayName ? user.displayName[0].toUpperCase() : "U"}</span>
                  )}
                </div>
                <div className="profile-dropdown-name">{user.displayName || "User"}</div>
                <div className="profile-dropdown-email">{user.email}</div>
                <button
                  className="home-btn"
                  onClick={() => {
                    setShowWeather(false);
                    setShowDropdown(false);
                  }}
                >
                  Home
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Centered greeting and search */}
      {user && showWeather && (
        <div className="center-content">
          <div className="greeting-bar">
            <span className="greeting">
              Hello, {user.displayName || user.email}
            </span>
          </div>
          <Weather />
        </div>
      )}

      {/* Home page */}
      {!showWeather && (
        <Home onLogin={handleLogin} onLogoClick={handleLogoClick} />
      )}
    </div>
  );
}