import React, { useState } from "react"; // Import React and hooks
import { useNavigate, Link } from "react-router-dom"; // For page navigation and links
import axios from "axios"; // For HTTP requests

function Login({ handleLogin }) {
  // ----------------------------
  // Form state
  // ----------------------------
  const [hospitalNumber, setHospitalNumber] = useState(""); // Stores input for hospital number
  const [password, setPassword] = useState(""); // Stores input for password
  const [error, setError] = useState(""); // Stores login error messages

  const navigate = useNavigate(); // Hook to redirect after login

  // ----------------------------
  // Buddy selection state
  // ----------------------------
  const [buddies, setBuddies] = useState([]); // List of available hospital buddies
  const [selectedBuddy, setSelectedBuddy] = useState(null); // Currently selected buddy

  // ----------------------------
  // Fetch buddy list on mount
  // ----------------------------
  React.useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/buddies");
        setBuddies(res.data); // Save buddy data to state
      } catch (err) {
        console.error("Failed to load buddies"); // Handle fetch error
      }
    };

    fetchBuddies(); // Trigger fetch on component mount
  }, []);

  // ----------------------------
  // Handle login form submission
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate buddy selection
    if (!selectedBuddy) {
      setError("Please choose a hospital buddy");
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5001/login", {
        hospital_number: hospitalNumber,
        password: password,
        buddy_id: selectedBuddy.id, // Include selected buddy
      });

      if (response.status === 200) {
        const { user } = response.data;

        // ----------------------------
        // Store user & buddy in localStorage
        // ----------------------------
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("buddy", JSON.stringify(response.data.buddy));

        handleLogin(user); // Update parent state

        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      setError("Invalid credentials"); // Show error if login fails
    }
  };

  // ----------------------------
  // Render login page
  // ----------------------------
  return (
    <div
      className=" font-[sans-serif] min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#015CE9" }} // Blue background
    >
      <div
        className="max-w-md w-full p-8 rounded-2xl"
        style={{ backgroundColor: "#015CE9" }}
      >
        {/* Logo & Page title */}
        <div className="text-center mb-6">
          <img src="/logotype.png" alt="logo" className="w-48 inline-block" />
          <h2 className="text-white text-2xl font-bold mt-4">Sign in</h2>
        </div>

        {/* Login form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Hospital number input */}
          <input
            type="text"
            value={hospitalNumber}
            onChange={(e) => setHospitalNumber(e.target.value)}
            placeholder="Hospital Number"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />

          {/* Password input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />

          {/* Display error if exists */}
          {error && <div className="text-red-600">{error}</div>}

          {/* Buddy selection */}
          <div>
            <p className="text-white text-sm mb-2 text-center">
              Choose your hospital buddy
            </p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {buddies.map((buddy) => (
                <div
                  key={buddy.id}
                  onClick={() => setSelectedBuddy(buddy)} // Select buddy on click
                  className={`cursor-pointer p-2 rounded-xl border-2 flex justify-center
                    ${
                      selectedBuddy?.id === buddy.id
                        ? "border-orange-400 bg-white" // Highlight selected buddy
                        : "border-transparent bg-blue-500" // Default style
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

          {/* Submit button */}
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
