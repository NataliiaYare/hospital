import React, { useState } from "react";

const markerConfig = {
  x_ray: {
    label: "X-Ray",
    top: "39%",
    left: "43%",
    color: "#f97316", // Tailwind orange-500
  },
  neurology: {
    label: "Neurology",
    top: "45%",
    left: "60%",
    color: "#3b82f6", // Tailwind blue-500
  },
  dental: {
    label: "Dental",
    top: "45%",
    left: "24%",
    color: "#facc15", // Tailwind yellow-400
  },
  main: {
    label: "Main Door",
    top: "65%",
    left: "66%",
    color: "#14b8a6", // Tailwind teal-400
  },
  cafe: {
    label: "Cafe",
    top: "67%",
    left: "40%",
    color: "#8b5cf6", // Tailwind purple-500
  },
  fun: {
    label: "Fun Zone",
    top: "26%",
    left: "56%",
    color: "#f97316", // Tailwind orange-500
  },
};

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <div className="w-full">
      {/* Menu Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.keys(markerConfig).map((key) => (
          <button
            key={key}
            onClick={() => setActiveMarker(key)}
            className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-white shadow-md"
            style={{ backgroundColor: markerConfig[key].color }}
            aria-label={`Go to ${markerConfig[key].label}`}
          >
            {markerConfig[key].label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="relative w-full max-w-5xl mx-auto">
        <img
          src="/assets/images/hospital_map.jpg"
          alt="Hospital Map"
          className="w-full h-auto rounded-lg shadow-lg"
        />

        {/* Markers */}
        {Object.keys(markerConfig).map((key) => (
          <div
            key={key}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-full"
            style={{ top: markerConfig[key].top, left: markerConfig[key].left }}
            onMouseEnter={() => setActiveMarker(key)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <i
              className="fa-solid fa-map-pin text-3xl drop-shadow-lg"
              style={{ color: markerConfig[key].color }}
            ></i>

            {/* Tooltip */}
            <div
              className={`absolute -top-12 left-1/2 w-32 text-center px-2 py-1 rounded-md text-white text-sm font-medium shadow-lg transition-all duration-300 ${
                activeMarker === key
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
              style={{ backgroundColor: markerConfig[key].color }}
            >
              {markerConfig[key].label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;
