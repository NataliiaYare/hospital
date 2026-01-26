import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";         // Sidebar navigation
import MobileHeader from "./components/MobileHeader"; // Mobile top header

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/dashboard/Games";
import Appointments from "./pages/dashboard/Appointment";
import Medicines from "./pages/dashboard/Medicines";
import Learn from "./pages/dashboard/Learn";

function App() {
  // ----------------------------
  // AUTH STATE
  // ----------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Tracks if user is logged in
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle

  // ----------------------------
  // ON INITIAL LOAD: CHECK LOCAL STORAGE
  // ----------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true); // User is logged in if data exists in localStorage
    }
  }, []);

  // ----------------------------
  // HANDLERS
  // ----------------------------
  const handleLogin = () => {
    setIsLoggedIn(true); // Called after successful login
  };

  const handleLogout = () => {
    // Clear user data & reset auth/sidebar states
    localStorage.removeItem("user");
    localStorage.removeItem("buddy");
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* ---------------- MOBILE HEADER ---------------- */}
        {isLoggedIn && (
          <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        )}

        {/* ---------------- SIDEBAR ---------------- */}
        {isLoggedIn && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            handleLogout={handleLogout}
          />
        )}

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main
          className={`
            flex-1 min-h-screen
            ${isLoggedIn ? "pt-14 md:pt-0 md:ml-64" : ""} // Adjust for sidebar/header
          `}
        >
          <Routes>
            {/* ---------------- ROOT ROUTE ---------------- */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace /> // Redirect logged-in users to dashboard
                ) : (
                  <Navigate to="/login" replace />     // Redirect guests to login
                )
              }
            />

            {/* ---------------- AUTH ROUTES ---------------- */}
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" /> // Already logged in? redirect
                ) : (
                  <Login handleLogin={handleLogin} /> // Show login page
                )
              }
            />

            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
            />

            {/* ---------------- PROTECTED ROUTES ---------------- */}
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/games"
              element={isLoggedIn ? <Games /> : <Navigate to="/login" />}
            />
            <Route
              path="/appointments"
              element={isLoggedIn ? <Appointments /> : <Navigate to="/login" />}
            />
            <Route
              path="/medicines"
              element={isLoggedIn ? <Medicines /> : <Navigate to="/login" />}
            />
            <Route
              path="/map"
              element={isLoggedIn ? <Map /> : <Navigate to="/login" />}
            />
            <Route
              path="/learn"
              element={isLoggedIn ? <Learn /> : <Navigate to="/login" />}
            />

            {/* ---------------- FALLBACK ROUTE ---------------- */}
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" /> // Any unknown path for logged-in user
                ) : (
                  <Navigate to="/login" />     // Unknown path for guest
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
