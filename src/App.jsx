import React, { useState } from 'react';
import Weather from "./components/Weather";
import Home from "./components/Home";
import './App.css';

export default function App() {
  const [showWeather, setShowWeather] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = (userObj) => {
    setUser(userObj);
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

  return (
    <div className="app-container">
      {/* Profile circle at top left */}
      {user && (
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
                {user.photoURL ? (
                  <img src={user.photoURL} alt="profile" />
                ) : (
                  <span>{user.displayName ? user.displayName[0].toUpperCase() : "U"}</span>
                )}
              </div>
              <div className="profile-dropdown-name">{user.displayName || "User"}</div>
              <div className="profile-dropdown-email">{user.email}</div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Greeting and logout centered at top */}
      {user && (
        <div className="greeting-bar">
          <span className="greeting">
            Hello, {user.displayName || user.email}
          </span>
        </div>
      )}

      {/* Main content */}
      {showWeather ? (
        <Weather />
      ) : (
        <Home onLogin={handleLogin} />
      )}
    </div>
  );
}