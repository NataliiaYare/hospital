import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

/* Function to register user via API */
const registerUser = async (userData, navigate) => {
  try {
    // Send POST request to backend to create a new user
    await axios.post("http://localhost:5001/register", userData);

    // Redirect to login page on successful registration
    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    alert("Error during registration. Please try again.");
  }
};

function Register() {
  const navigate = useNavigate(); // React Router hook for navigation

  /* Form state for user input */
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    hospital_number: "",
    email: "",
    department_id: "",
    telephone_number: "",
    password: "",
    confirm_password: "",
  });

  const [departments, setDepartments] = useState([]); // Departments for select dropdown

  /* Fetch department list from backend when component mounts */
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get("http://localhost:5001/departments");
      setDepartments(response.data);
    };
    fetchDepartments();
  }, []);

  /* Update formData state when inputs change */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirm_password, ...userData } = formData;

    // Validate all fields are filled
    if (Object.values(formData).some((v) => !v)) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Validate password match
    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    // Add password to user data and send to backend
    userData.password = password;
    await registerUser(userData, navigate);
  };

  return (
    <div
      className="font-[sans-serif] min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#015CE9" }}
    >
      <div
        className="max-w-4xl w-full p-8 rounded-2xl shadow"
        style={{ backgroundColor: "#015CE9" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <img src="/logotype.png" alt="logo" className="w-48 inline-block" />
          <h2 className="text-white text-2xl font-bold mt-4">Create account</h2>
        </div>

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Text inputs */}
            {[
              { name: "firstName", label: "First Name" },
              { name: "surname", label: "Surname" },
              { name: "hospital_number", label: "Hospital Number" },
              { name: "email", label: "Email", type: "email" },
              { name: "telephone_number", label: "Telephone No." },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              />
            ))}

            {/* Department select dropdown */}
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Password inputs */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            />
            <input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-medium rounded-md hover:bg-blue-700"
            style={{ backgroundColor: "#FF5B3A" }}
          >
            Register
          </button>
        </form>

        {/* Footer with link to login */}
        <p className="mt-4 text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
