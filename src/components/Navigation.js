import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ isLoggedIn, handleLogout }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">
        Hospital App
      </Link>
      <div className="flex gap-4">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/account" className="hover:underline">
              Account
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
