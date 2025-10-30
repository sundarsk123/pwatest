import React from "react";

export default function LocationLink({ locationName, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`md:text-[1.8rem] text-[1.25rem] text-left font-tan-pearl cursor-pointer transition-colors duration-300
        ${isActive ? "text-white" : "text-[#E489D2] hover:text-white"}`}
    >
      {locationName}
    </button>
  );
}
