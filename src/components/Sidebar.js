import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ handleLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav
      className="bg-white shadow-md border-r border-gray-200 h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 overflow-auto"
      style={{ backgroundColor: "#015CE9" }}
    >
      {/* Logo */}
      <div className="mb-6">
        <img src="/logotype.png" alt="logo" className="w-48 inline-block" />
      </div>

      {/* Main Links */}
      <ul className="mt-6 space-y-1">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-slate-800 font-medium text-[15px] flex items-center px-4 py-2 rounded transition-all hover:bg-gray-100 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-[18px] h-[18px] mr-3"
              viewBox="0 0 24 24"
            >
              <path d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z" />
              <path d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51v4.59z" />
            </svg>
            Dashboard
          </NavLink>
        </li>
      </ul>

      {/* Information Section */}
      <div className="mt-6">
        <h6 className="text-blue-600 text-[15px] font-semibold px-4">
          Information
        </h6>
        <ul className="space-y-1 mt-3">
          <li>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `text-slate-800 font-medium text-[15px] flex items-center px-4 py-2 rounded transition-all hover:bg-gray-100 ${
                  isActive ? "bg-gray-200" : ""
                }`
              }
            >
              Audience
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `text-slate-800 font-medium text-[15px] flex items-center px-4 py-2 rounded transition-all hover:bg-gray-100 ${
                  isActive ? "bg-gray-200" : ""
                }`
              }
            >
              Posts
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-6">
        <h6 className="text-blue-600 text-[15px] font-semibold px-4">
          Actions
        </h6>
        <ul className="space-y-1 mt-3">
          <li>
            <button
              onClick={logout}
              className="w-full text-left text-slate-800 font-medium text-[15px] flex items-center px-4 py-2 rounded transition-all hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
