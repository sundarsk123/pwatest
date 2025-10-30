"use client"
import React, { useState } from "react";

export default function Filter({ categories, selectedCategory, setSelectedCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-[15rem] z-30">
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="bg-[#F4F4F4] flex justify-between items-center px-[1.5rem] py-[1rem] rounded-[10rem] w-full md:text-[1.25rem] leading-[1.2] cursor-pointer"
      >
        <span className="text-[#1F1F1F]">
          {selectedCategory }
        </span>
        <svg
          className={`w-[1rem] h-[1rem] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1406 1.07129L8.06956 8.14236L0.998489 1.07129"
            stroke="#9C458B"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-[1rem] border border-gray-200 z-10">
          {/* <div
            onClick={() => handleSelect("")}
            className="px-4 py-2 hover:bg-[#F4F4F4] cursor-pointer text-[#1F1F1F] text-[1rem] md:text-[1.1rem] rounded-[1rem]"
          >
            All
          </div> */}
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleSelect(category)}
              className="px-4 py-2 hover:bg-[#F4F4F4] cursor-pointer text-[#1F1F1F] text-[1rem] md:text-[1.1rem] rounded-[1rem]"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

