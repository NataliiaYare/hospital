import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [buddy, setBuddy] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBuddy = localStorage.getItem("buddy");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);

      // 🔑 FETCH MEDICINES ONLY AFTER USER EXISTS
      fetch(`http://localhost:5001/api/medicines/${storedUser.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch medicines");
          }
          return res.json();
        })
        .then(setMedicines)
        .catch((err) => {
          console.error("Medicines fetch error:", err);
        });
    }

    fetch(`http://localhost:5001/api/medicines/${storedUser.id}`).then(
      async (res) => {
        const text = await res.text();
        console.log("RAW RESPONSE:", text);
      }
    );

    if (storedBuddy) setBuddy(JSON.parse(storedBuddy));
  }, []);

  if (!userData) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* LEFT SIDE – MAIN DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HEADER (UNCHANGED STRUCTURE) */}
          <div className="md:col-span-3 bg-white rounded-2xl p-6 flex items-center gap-6 shadow">
            {buddy ? (
              <img
                src={`/assets/images/icons/${buddy.icon_filename}`}
                alt={buddy.name}
                className="w-40 h-40 object-contain"
              />
            ) : (
              <div className="w-40 h-40 bg-orange-200 rounded-full" />
            )}

            <div>
              <h2 className="text-4xl font-bold">
                Hi, {userData.firstName} 👋
              </h2>

              {buddy && (
                <p className="text-sm text-gray-500">
                  Your hospital buddy:{" "}
                  <span className="font-medium">{buddy.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* APPOINTMENT */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="font-bold text-gray-700">Next Appointment</h4>

            {appointments ? (
              <>
                <p className="text-lg font-semibold mt-2">
                  {appointments.department}
                </p>

                <p className="text-gray-600">
                  {appointments.appointment_date} at{" "}
                  {appointments.appointment_time}
                </p>

                {appointments.doctor_name && (
                  <p className="text-sm text-gray-500">
                    Doctor: {appointments.doctor_name}
                  </p>
                )}

                <p className="text-sm text-gray-500 mt-1">
                  📍 {appointments.location}
                </p>
              </>
            ) : (
              <p className="text-gray-400 mt-2">No upcoming appointments</p>
            )}
          </div>

          {/* MEDICINE */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="font-bold text-gray-700">My Medicines</h4>
            {medicines.length ? (
              <div className="space-y-4">
                {medicines
                  .sort((a, b) => a.time.localeCompare(b.time)) // sort by time ascending
                  .map((med) => (
                    <div
                      key={med.id}
                      className="p-4 rounded-xl bg-gray-50 shadow-sm"
                    >
                      <p className="font-medium text-gray-800">{med.name}</p>
                      <p className="text-gray-500">{med.dosage}</p>
                      <p className="text-gray-500 text-sm">{med.time}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No medicines scheduled</p>
            )}
          </div>

          {/* MAP */}
          <Link
            to="/map"
            className="bg-purple-400 text-white rounded-2xl p-6 shadow hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-xl font-bold">Hospital Map</h3>
          </Link>

          {/* LEARN */}
          <Link
            to="/learn"
            className="bg-purple-400 text-white rounded-2xl p-6 shadow hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-xl font-bold">Learn About Hospital</h3>
          </Link>

          {/* PLAY */}
          <Link
            to="/games"
            className="md:col-span-3 bg-orange-500 text-white rounded-2xl p-6 flex justify-between items-center shadow hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-3xl font-bold">Play Zone</h3>
            <span className="text-2xl">🎮</span>
          </Link>
        </div>

        {/* RIGHT SIDE – MOOD (LAST ON MOBILE) */}
        <div className="order-last lg:order-none bg-purple-500 rounded-2xl p-6 text-white flex flex-col items-center justify-center">
          <h3 className="text-xl mb-6 text-center">
            How are you feeling today?
          </h3>

          <div className="grid grid-cols-2 gap-4 text-3xl">
            <button>😀</button>
            <button>🤕</button>
            <button>😴</button>
            <button>😡</button>
            <button>😁</button>
            <button>🤢</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
