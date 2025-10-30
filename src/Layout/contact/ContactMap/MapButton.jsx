"use client";
import React, { useState } from "react";

const CityDropdown = ({ onSelectCity, maps_data }) => {
  const [activeCity, setActiveCity] = useState("chennai");
  const [isOpen, setIsOpen] = useState(false);
  const cities = maps_data.map(city => city.city_name.toLowerCase());

  const handleSelect = (city) => {
    setActiveCity(city);
    onSelectCity(city);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block ">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between cursor-pointer z-10 relative items-center gap-[2rem] w-full border border-gray-300 rounded-[10rem] px-5 py-3 bg-white text-[#4A4A4A] text-lg uppercase shadow min-w-[12rem]"
      >
        <span>{activeCity}</span>
        {/* Dropdown Arrow SVG */}
        <svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M14.9102 0.955078L7.95501 7.91023L0.999858 0.955078"
            stroke="#9C458B"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 -mt-[1.5rem] w-full bg-white shadow-lg px-5 pt-6 pb-3 -z-50 rounded-b-[1rem]">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className={`block w-full text-left text-lg uppercase py-2 mb-0 last:mb-0 transition-colors duration-300 
                ${
                  activeCity === city
                    ? "text-[#9C458B] font-bold"
                    : "text-[#4A4A4A] hover:text-[#9C458B] cursor-pointer"
                }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityDropdown;
