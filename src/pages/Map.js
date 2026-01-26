import React, { useState } from "react";

/* 🎯 Marker positions matched to YOUR map image */
const markerConfig = {
  x_ray: {
    label: "Radiology (X-Ray)",
    top: "56%", // Vertical position relative to map image
    left: "48%", // Horizontal position relative to map image
    color: "#a21caf", // Marker color
    icon: "🩻", // Emoji for button/tooltip
  },
  neurology: {
    label: "Clinical Decisions Unit",
    top: "44%",
    left: "24%",
    color: "#2563eb",
    icon: "🧠",
  },
  emergency: {
    label: "Children’s Emergency",
    top: "61%",
    left: "23%",
    color: "#dc2626",
    icon: "🚑",
  },
  main: {
    label: "Main Entrance",
    top: "46%",
    left: "70%",
    color: "#14b8a6",
    icon: "🚪",
  },
  pharmacy: {
    label: "Pharmacy",
    top: "73%",
    left: "63%",
    color: "#facc15",
    icon: "💊",
  },
  fun: {
    label: "Outside Playpark",
    top: "18%",
    left: "60%",
    color: "#f97316",
    icon: "🧸",
  },
};

/* 🧭 Animated paths from Main Entrance to each location */
const pathConfig = {
  x_ray: "M 70 46 L 55 46 L 48 56", // SVG path from main entrance to X-Ray
  pharmacy: "M 70 46 L 63 73",
  emergency: "M 70 46 L 23 61",
  fun: "M 70 46 L 60 18",
  neurology: "M 70 46 L 24 44",
};

function Map() {
  const [activeMarker, setActiveMarker] = useState(null); // Currently hovered or selected marker

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-center mb-2">🗺️ Hospital Map</h2>
      <p className="text-center text-gray-600 mb-6">
        🐾 Tap a place and follow the dotted line!
      </p>

      {/* BUTTONS – clickable shortcuts to each location */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.keys(markerConfig).map((key) => (
          <button
            key={key}
            onClick={() => setActiveMarker(key)} // Set active marker on click
            className="px-4 py-2 rounded-xl text-white font-semibold shadow-md hover:scale-105 transition"
            style={{ backgroundColor: markerConfig[key].color }}
            aria-label={`Go to ${markerConfig[key].label}`} // Accessibility
          >
            {markerConfig[key].icon} {markerConfig[key].label}
          </button>
        ))}
      </div>

      {/* MAP CONTAINER */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* MAP IMAGE */}
        <img
          src="/assets/images/map2x.png"
          alt="Hospital Map"
          className="w-full h-auto rounded-2xl shadow-lg"
        />

        {/* SVG PATH OVERLAY – dotted line from main entrance to selected marker */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {activeMarker && pathConfig[activeMarker] && (
            <path
              d={pathConfig[activeMarker]} // Path coordinates
              fill="none"
              stroke={markerConfig[activeMarker].color} // Match marker color
              strokeWidth="2"
              strokeDasharray="4 4" // Makes line dashed
              className="animate-dash" // Optional CSS animation
            />
          )}
        </svg>

        {/* MARKERS – positioned pins on map */}
        {Object.keys(markerConfig).map((key) => (
          <div
            key={key}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-full"
            style={{
              top: markerConfig[key].top,
              left: markerConfig[key].left,
            }}
            onMouseEnter={() => setActiveMarker(key)} // Show tooltip on hover
            onMouseLeave={() => setActiveMarker(null)} // Hide tooltip on leave
            onClick={() => setActiveMarker(key)} // Activate marker on click
          >
            {/* PIN ICON */}
            <div
              className="text-3xl drop-shadow-lg animate-bounce"
              style={{ color: markerConfig[key].color }}
            >
              📍
            </div>

            {/* TOOLTIP */}
            <div
              className={`absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-white text-sm font-semibold shadow-lg transition-all duration-300
              ${
                activeMarker === key
                  ? "opacity-100 scale-100" // Show tooltip
                  : "opacity-0 scale-90 pointer-events-none" // Hide tooltip
              }`}
              style={{ backgroundColor: markerConfig[key].color }}
            >
              {markerConfig[key].icon} {markerConfig[key].label}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Map;
