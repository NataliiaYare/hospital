import React, { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]); // ⚠ array by default
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    setUserData(user);

    fetch(`http://localhost:5001/api/appointments/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error("Appointments API did not return an array:", data);
          setAppointments([]);
        }
      })
      .catch((err) => {
        console.error("Appointments fetch error:", err);
        setAppointments([]); // prevent crash
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {appointments.length ? (
        appointments.map((appt) => (
          <div key={appt.id} className="bg-white rounded-2xl p-6 shadow mb-4">
            <h2 className="text-xl font-semibold text-blue-600">
              {appt.department}
            </h2>
            <p className="text-gray-600 mt-1">
              Doctor:{" "}
              <span className="font-medium">{appt.doctor_name || "—"}</span>
            </p>
            <p className="text-gray-600">📍 {appt.location}</p>
            <p className="mt-3 font-medium">
              📅 {appt.appointment_date} ⏰ {appt.appointment_time}
            </p>
            {appt.description && (
              <p className="mt-3 text-gray-500 text-sm">{appt.description}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No appointments scheduled</p>
      )}
    </div>
  );
};

export default Appointments;
