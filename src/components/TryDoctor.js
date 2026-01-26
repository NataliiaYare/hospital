import React, { useState } from "react";

// Available medical tools the user can choose from
const tools = [
  { id: "stethoscope", label: "Stethoscope", emoji: "🩺" },
  { id: "thermometer", label: "Thermometer", emoji: "🌡️" },
  { id: "bandage", label: "Bandage", emoji: "🩹" },
  { id: "medicine", label: "Medicine", emoji: "💊" },
];

// Available patients to interact with
const patients = [
  { id: 1, name: "Charlie", image: "/assets/images/patient1.png" },
  { id: 2, name: "Mia", image: "/assets/images/patient2.png" },
];

// TryDoctor is an interactive mini-game where users act as a doctor
const TryDoctor = () => {
  // Currently selected patient
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Currently selected medical tool
  const [selectedTool, setSelectedTool] = useState(null);

  // Feedback message shown to the user
  const [message, setMessage] = useState("");

  // Handles applying the selected tool to the selected patient
  const handleApplyTool = () => {
    // Validation: ensure both patient and tool are selected
    if (!selectedPatient || !selectedTool) {
      setMessage("Choose a patient and a tool first!");
      return;
    }

    // Display fun success feedback
    setMessage(
      `${selectedPatient.name} is feeling better thanks to your ${selectedTool.label}! 🎉`
    );

    // Clear message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl mx-auto">
      {/* Game title */}
      <h3 className="text-2xl font-bold mb-4 text-center">
        Try Being the Doctor 🩺
      </h3>

      {/* Patient selection */}
      <div className="flex justify-center gap-4 mb-6">
        {patients.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPatient(p)} // Select patient
            className={`border-4 rounded-xl p-2 transition-all ${
              selectedPatient?.id === p.id
                ? "border-blue-500 scale-105" // Highlight selected patient
                : "border-transparent"
            }`}
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-20 h-20 object-contain"
            />
            <p className="text-sm mt-1">{p.name}</p>
          </button>
        ))}
      </div>

      {/* Tool selection */}
      <div className="flex justify-center gap-4 mb-6">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTool(t)} // Select tool
            className={`border-2 rounded-xl px-3 py-2 text-xl transition-all ${
              selectedTool?.id === t.id
                ? "border-green-500 bg-green-100 scale-105" // Highlight selected tool
                : "border-gray-200"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Apply selected tool */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleApplyTool} // Apply tool to patient
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Apply Tool
        </button>
      </div>

      {/* Feedback message */}
      {message && (
        <p className="text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default TryDoctor;
