import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ handleLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-[#015CE9] rounded-r-3xl shadow-lg flex flex-col justify-between pt-6 px-4">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-8 text-center">
          <img src="/logotype.png" alt="logo" className="w-36 mx-auto" />
        </div>

        {/* Menu Links */}
        <ul className="space-y-3 text-white">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded transition-all text-white ${
                  isActive ? "bg-white text-[#015CE9]" : "hover:bg-blue-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded transition-all text-white ${
                  isActive ? "bg-white text-[#015CE9]" : "hover:bg-blue-700"
                }`
              }
            >
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/learn"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded transition-all text-white ${
                  isActive ? "bg-white text-[#015CE9]" : "hover:bg-blue-700"
                }`
              }
            >
              Learn
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded transition-all text-white ${
                  isActive ? "bg-white text-[#015CE9]" : "hover:bg-blue-700"
                }`
              }
            >
              Play
            </NavLink>
          </li>

          {/* Logout button under links */}
          <li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded text-white hover:bg-blue-700 transition-all"
              >
                Logout
              </button>
            </li>
          </li>
        </ul>
      </div>

      {/* Bottom Doctor Image */}
      <div className="mt-6 text-center">
        <img
          src="/assets/images/doctor_sidebar.png"
          alt="Doctor"
          className="w-40 mx-auto"
        />
      </div>
    </nav>
  );
}

export default Sidebar;
