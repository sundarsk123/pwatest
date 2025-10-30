"use client"
import React from 'react'

export default function RequirementInput({ onChange, error, value }) {
    const handleChange = (e) => {
        onChange(e.target.value) // ✅ directly pass the input value to parent
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2.5 md:gap-0 w-full mt-[1.5rem]">
            {/* Left Text */}
            <p className="whitespace-nowrap text-[#4A4A4A]">I’m looking for&nbsp;</p>

            {/* Simple Text Input */}
            <div className="relative flex-grow mx-2">
                <input
                    type="text"
                    id="crequirement"
                    value={value} // controlled input
                    placeholder=" "
                    onChange={handleChange}
                    className={`peer w-full h-full focus:outline-0 text-[#4A4A4A] text-[1.5rem] border-b border-dotted bg-transparent
                        ${error ? "border-red-500" : "border-[#4A4A4A]"}`}
                />

                <label
                    htmlFor="crequirement"
                    className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] 
                        md:peer-placeholder-shown:text-[2rem]
                        peer-not-placeholder-shown:hidden"
                >
                    requirement
                </label>
            </div>

            {/* Right Text */}
            <p className="whitespace-nowrap text-[#4A4A4A]">, specification</p>
        </div>
    )
}






















// "use client"
// import React, { useState } from 'react'

// export default function RequirementInput({ options, onChange, error }) {
//     const [open, setOpen] = useState(false)
//     const [selected, setSelected] = useState("")

//     const handleSelect = (option) => {
//         setSelected(option)
//         onChange(option) // ✅ notify parent (Form)
//         setOpen(false)
//     }

//     return (
//         <div className="flex flex-col md:flex-row md:items-center gap-2.5 md:gap-0 w-full mt-[1.5rem]">
//             {/* Left Text */}
//             <p className="whitespace-nowrap text-[#4A4A4A]">i’m looking for&nbsp;</p>

//             {/* Input with Dropdown */}
//             <div className="relative flex-grow mx-2">
//                 {/* Input Field */}
//                 <input
//                     type="text"
//                     id="req"
//                     value={selected} // ✅ controlled input
//                     placeholder=" "
//                     readOnly
//                     className={`peer w-full h-full focus:outline-0 text-[#4A4A4A] text-[1.5rem] border-b border-dotted bg-transparent cursor-pointer pr-[3rem]
//                         ${error ? "border-red-500" : "border-[#4A4A4A]"}`}
//                     onClick={() => setOpen(!open)}
//                 />

//                 <label
//                     htmlFor="req"
//                     className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] 
//                         md:peer-placeholder-shown:text-[2rem]
//                         peer-not-placeholder-shown:hidden"
//                 >
//                     requirement
//                 </label>

//                 {/* Dropdown Icon */}
//                 <span
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                     onClick={() => setOpen(!open)}
//                 >
//                     <svg className="md:w-[1.5rem] md:h-[1rem] w-[1rem]" width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M26.957 0.977539L13.9794 13.9551L1.00181 0.977539" stroke="#4A4A4A" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                 </span>

//                 {/* Dropdown Menu */}
//                 {open && (
//                     <ul className="absolute left-0 w-full bg-white shadow-lg border border-gray-200 mt-2 z-10 rounded-lg">
//                         {options.map((option, index) => (
//                             <li
//                                 key={index}
//                                 className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[#4A4A4A] text-[1.3rem] !leading-[1.3]"
//                                 onClick={() => handleSelect(option)}
//                             >
//                                 {option}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Right Text */}
//             <p className="whitespace-nowrap text-[#4A4A4A]">, specification</p>
//         </div>
//     )
// }
