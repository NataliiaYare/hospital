import React from "react";

// DepartmentCard is a presentational component
// used to display a clickable department with an icon and name
const DepartmentCard = ({ name, icon, onClick }) => {
  return (
    // Main clickable card container
    <div
      onClick={onClick} // Trigger action when the card is clicked
      className="cursor-pointer bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform"
    >
      {/* Department icon image */}
      <img
        src={`/assets/images/learn/${icon}`} // Dynamic icon path
        alt={name} // Accessible alt text using department name
        className="w-24 h-24 mb-2"
      />

      {/* Department name */}
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
    </div>
  );
};

export default DepartmentCard;
