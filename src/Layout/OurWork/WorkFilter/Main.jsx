"use client";
import "./work.css";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

// 🟣 Import GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Main({ worksdatas }) {
    const tabs = ["Classic", "Contemporary"];
    const [activeTab, setActiveTab] = useState("Classic");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("All Products");
    const [works, setWorks] = useState([]);
    const [filteredWorks, setFilteredWorks] = useState([]);

    const containerRef = useRef(null);

    const dropdownItems = [
        "All Products",
        ...new Set(
            worksdatas.flatMap(item =>
                item._embedded?.["wp:term"]?.[1]?.map(term => term.name) || []
            )
        ),
    ];

    // Map WP API data
    useEffect(() => {
        const mappedWorks = worksdatas
            .map(item => {
                const terms = item._embedded?.["wp:term"] || [];
                const featuredImg =
                    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

                const workObj = {};
                tabs.forEach(tab => {
                    const allTerms = terms.flat() || [];
                    const term = allTerms.find(t => t.name === tab);
                    if (term) {
                        workObj[tab] = {
                            img1: featuredImg,
                            text1: item.title?.rendered || "",
                            category: terms[1]?.[0]?.name || "Uncategorized",
                        };
                    }
                });
                return Object.keys(workObj).length ? workObj : null;
            })
            .filter(Boolean);

        setWorks(mappedWorks);
    }, [worksdatas]);

    // Filter logic
    useEffect(() => {
        const filtered = works
            .map(work => work[activeTab])
            .filter(
                work =>
                    work &&
                    (selectedItem === "All Products" || work.category === selectedItem)
            );

        setFilteredWorks(filtered);
    }, [activeTab, selectedItem, works]);

    // 🟣 GSAP ScrollTrigger animation
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(".work-card", { opacity: 0, y: 60 });

            ScrollTrigger.batch(".work-card", {
                start: "top 85%",
                onEnter: batch =>
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.15,
                    }),
                onLeaveBack: batch =>
                    gsap.to(batch, {
                        opacity: 0,
                        y: 30,
                        duration: 0.5,
                        ease: "power2.inOut",
                        stagger: 0.1,
                    }),
            });
        }, containerRef);

        // Refresh ScrollTrigger after images load
        const imgs = containerRef.current.querySelectorAll("img");
        let waiting = imgs.length;
        const done = () => {
            waiting -= 1;
            if (waiting <= 0) ScrollTrigger.refresh();
        };
        imgs.forEach(img => {
            if (img.complete) {
                done();
            } else {
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
            }
        });

        return () => ctx.revert();
    }, [filteredWorks]);

    const isInPattern = idx => {
        let n = 2;
        let step = 1;
        while (n <= idx + 1) {
            if (n === idx + 1) return true;
            n += step;
            step = step === 1 ? 3 : 1;
        }
        return false;
    };

    return (
        <div
            ref={containerRef}
            className="px-[20px] py-[2.5rem] md:px-[3.75rem] md:py-[6.25rem]"
        >
            {/* Top Controls */}
            <div className="flex flex-col gap-[2rem] md:flex-row justify-between items-center relative">
                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-[#F4F4F4] flex justify-between gap-[4rem] items-center px-[1.5rem] py-[1rem] rounded-[10rem] max-w-[15rem] w-full md:text-[1.25rem] leading-[1.2] cursor-pointer"
                    >
                        <span className="text-[#1F1F1F]">{selectedItem}</span>
                        <span>
                            <svg
                                className={`w-[1rem] h-[1rem] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
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
                        </span>
                    </button>

                    {isDropdownOpen && (
                        <ul className="absolute mt-2 bg-white shadow-lg rounded-[1rem] w-full z-10 border border-[#EFEFEF] overflow-hidden">
                            {dropdownItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`px-[1.5rem] py-[0.75rem] text-[#1F1F1F] cursor-pointer text-[1rem] hover:bg-[#F4F4F4] transition-all duration-300
                      ${index === 0 ? "hover:rounded-t-[1rem]" : ""}
                      ${index === dropdownItems.length - 1
                                            ? "hover:rounded-b-[1rem]"
                                            : ""
                                        }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Tabs */}
                <div className="border border-[#EFEFEF] rounded-[3.75rem] inline-flex items-center">
                    {tabs.map((tab, index) => (
                        <span
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={`text-[#4A4A4A] text-[1.125rem] leading-[1] px-[1.5625rem] md:px-[2.5rem] py-[0.625rem] md:py-[0.875rem] rounded-[3.75rem] cursor-pointer transition-colors duration-300 
                ${activeTab === tab ? "bg-[#F3F3F3]" : ""}`}
                        >
                            {tab}
                        </span>
                    ))}
                </div>
            </div>

            {/* Filtered Works */}
            <div className="py-[2.5rem] md:py-[6.25rem] flex flex-wrap justify-between gap-y-[4.5rem] md:gap-y-[6.25rem]">
                {filteredWorks.length > 0 ? (
                    filteredWorks.map((work, idx) => (
                        <div
                            key={idx}
                            className={`${isInPattern(idx) ? "md:w-[48%] lg:w-[63%] lg:h-[35rem]" : "md:w-[48%] lg:w-[33%] lg:h-[40rem]"} flex items-center md:items-start justify-center md:justify-between gap-[4.5rem] work-card`} // <- animation target
                        >
                            <div className="h-full w-full ">
                                <div className="overflow-hidden group h-full w-full ">
                                    <div className="relative w-full h-full overflow-hidden rounded-[1rem]">
                                        <Image
                                            src={work.img1}
                                            alt={`work-${idx}-1`}
                                            width={1000}
                                            height={1000}
                                            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <p className="mt-2 text-[#1F1F1F] text-center md:text-left lg:text-[1.25rem]">
                                    {work.text1}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-[#1F1F1F] text-xl flex justify-center items-center w-full">
                        No items found
                    </p>
                )}
            </div>
        </div>
    );
}
























// "use client";
// import './work.css'
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export default function Main({ worksdatas }) {
//     const tabs = ["Classic", "Contemporary"];
//     const [activeTab, setActiveTab] = useState("Classic");
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState("All Products");
//     const [works, setWorks] = useState([]);
//     // const dropdownItems = ["All Products", "Sculptures", "Paintings", "Wall Art"];
//     const dropdownItems = [
//         "All Products",
//         ...new Set(
//             worksdatas.flatMap(item =>
//                 item._embedded?.["wp:term"]?.[1]?.map(term => term.name) || []
//             )
//         )
//     ];

//     useEffect(() => {
//         // Map WP API data into your desired format
//         const mappedWorks = worksdatas.map(item => {
//             const terms = item._embedded?.["wp:term"] || [];
//             const featuredImg = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

//             const workObj = {};
//             tabs.forEach(tab => {
//                 const term = terms[0]?.find(t => t.name === tab); // check if post belongs to Classic/Contemporary
//                 if (term) {
//                     workObj[tab] = {
//                         img1: featuredImg, // vertical
//                         text1: item.title?.rendered || "",
//                         category: terms[1]?.[0]?.name || "Uncategorized", // second wp:term array for category
//                     };
//                 }
//             });
//             return workObj;
//         }).filter(Boolean); // remove empty objects

//         setWorks(mappedWorks);
//     }, [worksdatas]);

//     // Filter works based on active tab & selected category
//     const filteredWorks = works
//         .map(work => work[activeTab])
//         .filter(work => work && (selectedItem === "All Products" || work.category === selectedItem));


//     const isInPattern = (idx) => {
//         let n = 2; // start at index 2 (1-based)
//         let step = 1; // first step
//         let count = 0;

//         while (n <= idx + 1) { // idx is 0-based
//             if (n === idx + 1) return true;
//             n += step;
//             step = step === 1 ? 3 : 1; // alternate between +1 and +3
//             count++;
//         }

//         return false;
//     };


//     return (
//         <div className="px-[20px] py-[2.5rem] md:px-[3.75rem] md:py-[6.25rem]">
//             <div className="flex flex-col gap-[2rem] md:flex-row justify-between items-center relative">
//                 {/* Dropdown Button */}
//                 <div className="relative">
//                     <button
//                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                         className="bg-[#F4F4F4] flex justify-between gap-[4rem] items-center px-[1.5rem] py-[1rem] rounded-[10rem] max-w-[15rem] w-full md:text-[1.25rem] leading-[1.2] cursor-pointer"
//                     >
//                         <span className="text-[#1F1F1F]">{selectedItem}</span>
//                         <span>
//                             <svg
//                                 className={`w-[1rem] h-[1rem] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
//                                 width="16"
//                                 height="9"
//                                 viewBox="0 0 16 9"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     d="M15.1406 1.07129L8.06956 8.14236L0.998489 1.07129"
//                                     stroke="#9C458B"
//                                     strokeWidth="1.65"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                 />
//                             </svg>
//                         </span>
//                     </button>

//                     {/* Dropdown Menu */}
//                     {isDropdownOpen && (
//                         <ul className="absolute mt-2 bg-white shadow-lg rounded-[1rem] w-full z-10 border border-[#EFEFEF] overflow-hidden">
//                             {dropdownItems.map((item, index) => (
//                                 <li
//                                     key={index}
//                                     onClick={() => {
//                                         setSelectedItem(item);
//                                         setIsDropdownOpen(false);
//                                     }}
//                                     className={`px-[1.5rem] py-[0.75rem] text-[#1F1F1F] cursor-pointer text-[1rem] hover:bg-[#F4F4F4] transition-all duration-300
//                                         ${index === 0 ? "hover:rounded-t-[1rem]" : ""}
//                                         ${index === dropdownItems.length - 1 ? "hover:rounded-b-[1rem]" : ""}`}
//                                 >
//                                     {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>

//                 {/* Tabs */}
//                 <div className="border border-[#EFEFEF] rounded-[3.75rem] inline-flex items-center">
//                     {tabs.map((tab, index) => (
//                         <span
//                             key={index}
//                             onClick={() => setActiveTab(tab)}
//                             className={`text-[#4A4A4A] text-[1.125rem] leading-[1] px-[1.5625rem] md:px-[2.5rem] py-[0.625rem] md:py-[0.875rem] rounded-[3.75rem] cursor-pointer transition-colors duration-300
//                                 ${activeTab === tab ? "bg-[#F3F3F3]" : ""}`}
//                         >
//                             {tab}
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             {/* Filtered Works */}
//             <div className="py-[2.5rem] md:py-[6.25rem] flex flex-wrap justify-between  gap-y-[4.5rem] md:gap-y-[6.25rem]">
//                 {filteredWorks.length > 0 ? (
//                     filteredWorks.map((work, idx) => (
//                         <div
//                             key={idx}
//                             className={` ${isInPattern(idx) ? "md:w-[48%] lg:w-[63%] lg:h-[35rem]" : " md:w-[48%] lg:w-[33%] lg:h-[40rem]"} flex items-center md:items-start justify-center md:justify-between gap-[4.5rem] `}
//                         >
//                             <div className='h-full'>
//                                 <Image
//                                     src={work.img1}
//                                     alt={`work-${idx}-1`}
//                                     width={1000}
//                                     height={1000}
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <p className="mt-2 text-[#1F1F1F] text-center md:text-left lg:text-[1.25rem]">
//                                     {work.text1}
//                                 </p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-[#1F1F1F] text-xl flex justify-center items-center w-full">No items found</p>
//                 )}
//             </div>

//         </div>
//     );
// }


// ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}

// Dummy works data
// const works = [
//     {
//         Classic: {
//             img1: work1,  //vertical
//             img2: work2,  //horizontal
//             text1: "2024 - Buddha statue with bodhi tree, Chennai",
//             text2: "2024 - Copper designer wall mirror, Chennai",
//             category: "Sculptures",
//         },
//         Contemporary: {
//             img1: work1,  //vertical
//             img2: work3,  //horizontal
//             text1: "2024 - Abstract painting, Delhi",
//             text2: "2024 - Modern painting frame, Mumbai",
//             category: "Sculptures",
//         },
//     },
//     {
//         Classic: {
//             img1: work1, //vertical
//             img2: work2,   //horizontal
//             text1: "2023 - Bronze vase, Kolkata",
//             text2: "2023 - Antique wall mirror, Chennai",
//             category: "Wall Art",
//         },
//         Contemporary: {
//             img1: work1, //vertical
//             img2: work3,  //horizontal
//             text1: "2023 - Modern sculpture, Mumbai",
//             text2: "2023 - Canvas painting, Delhi",
//             category: "Wall Art",
//         },
//     },
// ];


// ✅ Filter logic
// const filteredWorks = works
//     .map((work) => work[activeTab])
//     .filter((work) => selectedItem === "All Products" || work.category === selectedItem);

