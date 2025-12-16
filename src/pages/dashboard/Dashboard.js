import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // Example: fetch data from backend API
    fetch("http://localhost:5001/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));

    fetch("http://localhost:5001/api/medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data));
  }, []);

  if (!userData) return <div className="p-8">Loading...</div>;

  return (
    <main className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}

      {/* Main content */}
      <section className="flex-1 p-8 grid grid-cols-4 gap-6">
        {/* Header */}
        <div className="col-span-3 bg-white rounded-2xl p-6 flex items-center gap-6 shadow">
          <img src="/assets/images/avatar.png" className="w-20 h-20" />
          <div>
            <h2 className="text-2xl font-bold">Hi, {userData.firstName}</h2>
            <p className="text-gray-500">
              Ward {userData.ward} | {userData.doctor}
            </p>
            <p className="text-blue-600">
              Nurse {userData.nurse} is on duty today
            </p>
          </div>
        </div>

        {/* Mood */}
        <div className="row-span-3 bg-purple-500 rounded-2xl p-6 text-white flex flex-col items-center">
          <h3 className="text-xl mb-6">How are you feeling today?</h3>
          <div className="grid grid-cols-2 gap-4 text-3xl">
            😀 🤕 😴 😡 😁 🤢
          </div>
        </div>

        {/* Appointment */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h4 className="font-bold text-gray-700">Next Appointment</h4>
          {appointments[0] ? (
            <>
              <p className="text-xl mt-2">{appointments[0].title}</p>
              <p className="text-gray-500">
                {appointments[0].date} – {appointments[0].time}
              </p>
            </>
          ) : (
            <p className="text-gray-400">No appointments</p>
          )}
        </div>

        {/* Medicine */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h4 className="font-bold text-gray-700">My Medicines</h4>
          {medicines[0] ? (
            <>
              <p className="text-xl mt-2">{medicines[0].time}</p>
              <p className="text-gray-500">
                {medicines[0].name} {medicines[0].dosage}
              </p>
            </>
          ) : (
            <p className="text-gray-400">No medicines scheduled</p>
          )}
        </div>

        {/* Map */}
        <Link
          to="/map"
          className="bg-purple-400 text-white rounded-2xl p-6 shadow"
        >
          <h3 className="text-xl font-bold">Hospital Map</h3>
          <p>Children's Ward</p>
        </Link>

        {/* Learn */}
        <Link
          to="/learn"
          className="bg-purple-400 text-white rounded-2xl p-6 shadow"
        >
          <h3 className="text-xl font-bold">Learn About Hospital</h3>
          <p>How MRI Works</p>
        </Link>

        {/* Play Zone */}
        <Link
          to="/games"
          className="col-span-3 bg-orange-500 text-white rounded-2xl p-6 flex justify-between items-center shadow"
        >
          <h3 className="text-3xl font-bold">Play Zone – Bubble Pop</h3>
          <span className="text-2xl">🎮</span>
        </Link>
      </section>
    </main>
  );
};

export default Dashboard;
