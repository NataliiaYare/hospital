import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [buddy, setBuddy] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBuddy = localStorage.getItem("buddy");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
    }

    if (storedBuddy) setBuddy(JSON.parse(storedBuddy));
  }, []);

  useEffect(() => {
    if (!userData?.id) return;

    fetch(`http://localhost:5001/api/appointments/${userData.id}/next`)
      .then((res) => res.json())
      .then((data) => setNextAppointment(data))
      .catch((err) => console.error("Next appointment error:", err));
  }, [userData]);

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
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                📅 Next Appointment
              </h4>

              {nextAppointment ? (
                <>
                  {/* DATE */}
                  <div className="text-2xl font-bold text-purple-700 mb-2">
                    {new Date(
                      nextAppointment.appointment_date
                    ).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>

                  {/* DETAILS */}
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
                </>
              ) : (
                <div className="text-sm text-gray-500">
                  <p className="mb-1">🎈 No appointments coming up</p>
                  <p className="text-xs">Enjoy your day!</p>
                </div>
              )}
            </div>

            {/* FOOTER MESSAGE */}
            {nextAppointment && (
              <div className="mt-4 text-xs text-purple-700 font-medium">
                🌟 You’re doing great! We’ll take care of you.
              </div>
            )}
          </div>

          {/* MEDICINE */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="font-bold text-gray-700">My Medicines</h4>
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
