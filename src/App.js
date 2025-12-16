import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation"; // optional top nav if you have it
import Sidebar from "./components/Sidebar"; // the sidebar we just made
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Dashboard from "./pages/dashboard/Dashboard";
import Account from "./pages/dashboard/Account";
import Games from "./pages/dashboard/Games";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <Router>
      <div className="App flex">
        {/* Sidebar visible only if logged in */}
        {isLoggedIn && <Sidebar handleLogout={handleLogout} />}

        {/* Main content */}
        <div
          className={`flex-1 min-h-screen ${isLoggedIn ? "ml-[250px]" : ""}`}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogin={handleLogin}
                  />
                )
              }
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/account"
              element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
            />
            <Route
              path="/games"
              element={isLoggedIn ? <Games /> : <Navigate to="/login" />}
            />
            <Route
              path="/map"
              element={isLoggedIn ? <Map /> : <Navigate to="/login" />}
            />

            {/* Catch-all: redirect logged-in users to dashboard, others to login */}
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
