import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn, handleLogin }) {
  const [hospitalNumber, setHospitalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [buddies, setBuddies] = useState([]);
  const [selectedBuddy, setSelectedBuddy] = useState(null);

  React.useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/buddies");
        setBuddies(res.data);
      } catch (err) {
        console.error("Failed to load buddies");
      }
    };

    fetchBuddies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBuddy) {
      setError("Please choose a hospital buddy");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/login", {
        hospital_number: hospitalNumber,
        password: password,
        buddy_id: selectedBuddy.id,
      });

      if (response.status === 200) {
        const { user } = response.data;

        // Store the logged-in user's data
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("buddy", JSON.stringify(response.data.buddy));

        setIsLoggedIn(true);
        handleLogin(user);

        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className=" font-[sans-serif] min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#015CE9" }}
    >
      <div
        className="max-w-md w-full p-8 rounded-2xl"
        style={{ backgroundColor: "#015CE9" }}
      >
        <div className="text-center mb-6">
          <img src="/logotype.png" alt="logo" className="w-48 inline-block" />

          <h2 className="text-white text-2xl font-bold mt-4">Sign in</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={hospitalNumber}
            onChange={(e) => setHospitalNumber(e.target.value)}
            placeholder="Hospital Number"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <p className="text-white text-sm mb-2 text-center">
              Choose your hospital buddy
            </p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {buddies.map((buddy) => (
                <div
                  key={buddy.id}
                  onClick={() => setSelectedBuddy(buddy)}
                  className={`cursor-pointer p-2 rounded-xl border-2 flex justify-center
          ${
            selectedBuddy?.id === buddy.id
              ? "border-orange-400 bg-white"
              : "border-transparent bg-blue-500"
          }
        `}
                >
                  <img
                    src={`/assets/images/icons/${buddy.icon_filename}`}
                    alt={buddy.name}
                    className="w-12 h-12"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4  text-white font-medium rounded-md hover:bg-blue-700"
            style={{ backgroundColor: "#FF5B3A" }}
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-sm text-center text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline text-white"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
