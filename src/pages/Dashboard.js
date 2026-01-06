import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [buddy, setBuddy] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [nextMedicine, setNextMedicine] = useState(null);

  // Load user and buddy from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBuddy = localStorage.getItem("buddy");

    if (storedUser) setUserData(JSON.parse(storedUser));
    if (storedBuddy) setBuddy(JSON.parse(storedBuddy));
  }, []);

  // Fetch next appointment
  useEffect(() => {
    if (!userData?.id) return;

    fetch(`http://localhost:5001/api/appointments/${userData.id}/next`)
      .then((res) => res.json())
      .then((data) => setNextAppointment(data))
      .catch((err) => console.error("Next appointment error:", err));
  }, [userData]);

  // Fetch next medicine
  useEffect(() => {
    if (!userData?.id) return;

    fetch(`http://localhost:5001/api/medicines/${userData.id}/next`)
      .then((res) => res.json())
      .then((data) => setNextMedicine(data))
      .catch((err) => console.error("Next medicine error:", err));
  }, [userData]);

  // Handle marking medicine as taken
  const handleTakeMedicine = (id) => {
    fetch(`http://localhost:5001/api/medicines/${id}/take`, { method: "PUT" })
      .then(() => setNextMedicine(null)) // Refresh tile
      .catch((err) => console.error(err));
  };

  if (!userData) return <div className="p-6">Loading...</div>;

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* LEFT SIDE – MAIN DASHBOARD */}
        <div className="grid grid-cols-1 gap-6">
          {/* HEADER */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow">
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

          {/* APPOINTMENT & MEDICINE ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NEXT APPOINTMENT TILE */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow flex flex-col justify-between">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                📅 Next Appointment
              </h4>
              {nextAppointment ? (
                <>
                  <div className="text-2xl font-bold text-purple-700 mb-2">
                    {new Date(
                      nextAppointment.appointment_date
                    ).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold">
                      🏥 {nextAppointment.department}
                    </p>
                    <p>👩‍⚕️ {nextAppointment.doctor_name}</p>
                    <p>⏰ {nextAppointment.appointment_time}</p>
                    <p className="text-xs text-gray-600">
                      📍 {nextAppointment.location}
                    </p>
                  </div>
                  <div className="mt-4 text-xs text-purple-700 font-medium">
                    🌟 You’re doing great! We’ll take care of you.
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500">
                  <p className="mb-1">🎈 No appointments coming up</p>
                  <p className="text-xs">Enjoy your day!</p>
                </div>
              )}
            </div>

            {/* NEXT MEDICINE TILE */}
            <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl p-6 shadow flex flex-col justify-between">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                💊 Next Medicine
              </h4>
              {nextMedicine ? (
                <>
                  <p className="text-xl font-bold">{nextMedicine.name}</p>
                  <p>⏰ {nextMedicine.time}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  🎉 All medicines taken for today!
                </p>
              )}
            </div>
          </div>

          {/* MAP & LEARN ROW */}
          <div className="mt-6">
            <h4 className="text-gray-700 font-semibold mb-3">
              Explore & Learn
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MAP TILE */}
              <Link
                to="/map"
                className="group bg-gradient-to-br from-purple-400 to-indigo-500
             rounded-2xl p-5 shadow-lg
             flex items-center gap-5
             hover:scale-[1.04] transition-transform"
              >
                <div className="flex-shrink-0">
                  <img
                    src="/assets/images/locationicon.png"
                    alt="Map location icon"
                    className="w-40 h-40 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    Hospital Map 🗺️
                  </h3>
                  <p className="text-sm text-white/90 mt-1">
                    Let’s find where you need to go!
                  </p>
                  <div className="flex gap-3 text-lg mt-3">
                    <span title="Pharmacy">💊</span>
                    <span title="X-Ray">🩻</span>
                    <span title="Fun Zone">🧸</span>
                    <span title="Emergency">🚑</span>
                  </div>
                </div>
                <div className="ml-auto text-white text-2xl opacity-0 group-hover:opacity-100 transition">
                  ➜
                </div>
              </Link>

              {/* LEARN TILE */}
              <Link
                to="/learn"
                className="group bg-gradient-to-br from-purple-400 to-indigo-500
     rounded-2xl p-5 shadow-lg
     flex items-center gap-5
     hover:scale-[1.04] transition-transform"
              >
                {/* LEFT – IMAGE */}
                <div className="flex-shrink-0">
                  <img
                    src="/assets/images/learnicon.png" // replace with your learn icon
                    alt="Learn icon"
                    className="w-40 h-40 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* RIGHT – TEXT */}
                <div className="text-white">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    Learn About Hospital
                  </h3>
                  <p className="text-sm text-white/90 mt-1">
                    Explore and understand your hospital environment!
                  </p>
                </div>

                {/* HOVER ARROW */}
                <div className="ml-auto text-white text-2xl opacity-0 group-hover:opacity-100 transition">
                  ➜
                </div>
              </Link>
            </div>
          </div>

          {/* PLAY TILE */}
          <Link
            to="/games"
            className="bg-orange-500 text-white rounded-2xl p-6 flex justify-between items-center shadow hover:scale-[1.02] transition-transform mt-6"
          >
            <h3 className="text-3xl font-bold">Play Zone</h3>
            <span className="text-2xl">🎮</span>
          </Link>
        </div>

        {/* RIGHT SIDE – MOOD TILE */}
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
