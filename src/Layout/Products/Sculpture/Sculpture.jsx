"use client";
import Link from "next/link";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import ProductItem from "../ProductItem/ProductItem";

const Sculpture = ({ data }) => {

  const tabs = ["Classic", "Contemporary"];

  const productContent = data?.acf?.products?.map((val) => ({
    Classic: {
      title: val?.product_content[0]?.product_type_title,
      description: val?.product_content[0]?.product_type_description,
      images:
        val?.product_content[0]?.product_type_images?.map(
          (img) => img?.product_type_image?.url
        ) || [],
    },
    Contemporary: {
      title: val?.product_content[1]?.product_type_title,
      description: val?.product_content[1]?.product_type_description,
      images:
        val?.product_content[1]?.product_type_images?.map(
          (img) => img?.product_type_image?.url
        ) || [],
    },
  }));

  const products =
    data?.acf?.products?.map((val) => ({
      img: val?.product_image?.url,
      label: val?.product_name,
    })) || [];

  const [activeTab, setActiveTab] = useState("Classic");
  const [selectedProduct, setSelectedProduct] = useState(0);

  const btnRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  // ✅ GSAP button hover animation
  useEffect(() => {
    if (!btnRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(dotRef.current, { scale: 40, duration: 1, ease: "power4.inOut" }, 0);
    tl.to(
      textRef.current,
      { color: "#fff", duration: 1, ease: "power4.inOut" },
      0.1
    );

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    btnRef.current.addEventListener("mouseenter", handleEnter);
    btnRef.current.addEventListener("mouseleave", handleLeave);

    return () => {
      btnRef.current?.removeEventListener("mouseenter", handleEnter);
      btnRef.current?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Hover animation
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 20;
    const moveY = (y - rect.height / 2) / 20;

    const img = card.querySelector("img");
    if (img) {
      gsap.to(img, {
        x: moveX,
        y: moveY,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const img = card.querySelector("img");
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  // ✅ ScrollTrigger animation
  useEffect(() => {
    if (!cardsRef.current.length) return;

    const anim = gsap.fromTo(
      cardsRef.current,
      {
        autoAlpha: 0,
        y: 100,
        scale: 0.9,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current[0]?.parentNode,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [activeTab, selectedProduct]);

  const content =
    productContent[selectedProduct] &&
    productContent[selectedProduct][activeTab];

  const sectionRef = useRef(null);
  const headingRefs2 = useRef([]); // Second heading (Dynamic content.title)


  // ✅ FIXED: re-run letter animation when tab/product changes
  useEffect(() => {
    if (!headingRefs2.current.length) return;

    gsap.killTweensOf(headingRefs2.current);
    gsap.fromTo(
      headingRefs2.current,
      { opacity: 0, scale: 0.8, filter: "blur(6px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.03,
      }
    );
  }, [activeTab, selectedProduct]); // 👈 reanimate on tab/product change
  
  return (
    <div ref={sectionRef} className="md:px-[3.75rem] py-[3.125rem] md:py-[6.25rem]">
      {/* Product selector */}
      <ProductItem onSelect={setSelectedProduct} products={products} />

      {/* Tabs */}
      <div className="mx-[1.25rem] md:px-0 border border-[#EFEFEF] rounded-[3.75rem] inline-flex items-center">
        {tabs.map((tab, index) => (
          <span
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`text-[#4A4A4A] text-[1rem] md:text-[1.125rem] leading-[1] px-[1.563rem] md:px-[2.5rem] py-[0.625rem] md:py-[0.875rem] rounded-[3.75rem] cursor-pointer transition-colors duration-300 
              ${activeTab === tab ? "bg-[#F3F3F3]" : ""}`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Text + Button */}
      {content && (
        <div className="px-[1.25rem] md:px-0 pt-12 lg:flex gap-22">
          <div className="lg:w-[45%]">
            <h2 className="text-[#1F1F1F] md:text-[2.2rem] text-[1.25rem] leading-[1.1] mt-6">
              {content.title.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => (headingRefs2.current[i] = el)}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:w-[55%] pt-5 lg:pt-0">
            <div
              className="text-[1rem] leading-[1.2] text-[#1F1F1F]"
              dangerouslySetInnerHTML={{ __html: content.description }}
            ></div>

            <div className="pt-4 lg:pt-6">
              <div className="flex justify-start relative z-20">
                <Link
                  href={"/contact-us"}
                  ref={btnRef}
                  className="bg-white px-4 py-2 flex items-center rounded-[10rem] gap-3 overflow-hidden btn--liquidBtn1 relative"
                >
                  <span
                    ref={textRef}
                    className="uppercase text-[0.938rem] relative z-10 text-[#9C458B]"
                  >
                    ENQUIRY NOW
                  </span>
                  <div
                    ref={dotRef}
                    className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B]"
                    style={{ transformOrigin: "center" }}
                  ></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images */}
      {content && (
        <div className="px-[1.25rem] md:px-0 pt-[3.75rem] md:pb-[10.938rem] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
          {(() => {
            cardsRef.current = [];
            return content.images.map((src, index) => {
              const isShifted = (index - 1) % 3 === 0;
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className={`${isShifted ? "relative md:top-[11.25rem]" : ""
                    } cursor-pointer overflow-hidden opacity-0`}
                >
                  <Image
                    src={src}
                    width={800}
                    height={800}
                    alt={`${content.title}-${index}`}
                    className="w-full h-auto object-cover pointer-events-none"
                  />
                </div>
              );
            });
          })()}
        </div>
      )}
    </div>
  );
};

export default Sculpture;



























// "use client";
// import Link from "next/link";
// import { gsap } from "gsap";
// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// import ProductItem from "../ProductItem/ProductItem";

// const Sculpture = ({ data }) => {

//     const tabs = ["Classic", "Contemporary"];

//   const productContent = data?.acf?.products?.map((val) => ({
//     Classic: {
//       title: val?.product_content[0]?.product_type_title,
//       description: val?.product_content[0]?.product_type_description,
//       images:
//         val?.product_content[0]?.product_type_images?.map(
//           (img) => img?.product_type_image?.url
//         ) || [],
//     },
//     Contemporary: {
//       title: val?.product_content[1]?.product_type_title,
//       description: val?.product_content[1]?.product_type_description,
//       images:
//         val?.product_content[1]?.product_type_images?.map(
//           (img) => img?.product_type_image?.url
//         ) || [],
//     },
//   }));

//   const products =
//     data?.acf?.products?.map((val) => ({
//       img: val?.product_image?.url,
//       label: val?.product_name,
//     })) || [];

//   const [activeTab, setActiveTab] = useState("Classic");
//   const [selectedProduct, setSelectedProduct] = useState(0);

//   const btnRef = useRef(null);
//   const dotRef = useRef(null);
//   const textRef = useRef(null);
//   const cardsRef = useRef([]);
//   const sectionRef = useRef(null);
//   const headingRefs2 = useRef([]); // ✅ letter refs

//   const content =
//     productContent[selectedProduct] &&
//     productContent[selectedProduct][activeTab];

//   // ✅ GSAP button hover
//   useEffect(() => {
//     if (!btnRef.current) return;
//     const tl = gsap.timeline({ paused: true });
//     tl.to(dotRef.current, { scale: 40, duration: 1, ease: "power4.inOut" }, 0);
//     tl.to(textRef.current, { color: "#fff", duration: 1 }, 0.1);
//     const enter = () => tl.play();
//     const leave = () => tl.reverse();
//     btnRef.current.addEventListener("mouseenter", enter);
//     btnRef.current.addEventListener("mouseleave", leave);
//     return () => {
//       btnRef.current?.removeEventListener("mouseenter", enter);
//       btnRef.current?.removeEventListener("mouseleave", leave);
//     };
//   }, []);

//   // ✅ Image hover animation (same as before)
//   const handleMouseMove = (e, i) => {
//     const card = cardsRef.current[i];
//     if (!card) return;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const moveX = (x - rect.width / 2) / 20;
//     const moveY = (y - rect.height / 2) / 20;
//     gsap.to(card.querySelector("img"), { x: moveX, y: moveY, duration: 0.4 });
//   };
//   const handleMouseLeave = (i) => {
//     gsap.to(cardsRef.current[i]?.querySelector("img"), {
//       x: 0,
//       y: 0,
//       duration: 0.6,
//       ease: "power3.out",
//     });
//   };

//   // ✅ Scroll + card animation
//   useEffect(() => {
//     if (!cardsRef.current.length) return;
//     ScrollTrigger.getAll().forEach((st) => st.kill());

//     gsap.fromTo(
//       cardsRef.current,
//       { autoAlpha: 0, y: 100, scale: 0.9 },
//       {
//         autoAlpha: 1,
//         y: 0,
//         scale: 1,
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.2,
//         scrollTrigger: {
//           trigger: cardsRef.current[0]?.parentNode,
//           start: "top 80%",
//           end: "bottom 60%",
//           toggleActions: "play none none reverse",
//         },
//       }
//     );

//     ScrollTrigger.refresh();
//   }, [activeTab, selectedProduct]);

//   // ✅ FIXED: re-run letter animation when tab/product changes
//   useEffect(() => {
//     if (!headingRefs2.current.length) return;

//     gsap.killTweensOf(headingRefs2.current);
//     gsap.fromTo(
//       headingRefs2.current,
//       { opacity: 0, scale: 0.8, filter: "blur(6px)" },
//       {
//         opacity: 1,
//         scale: 1,
//         filter: "blur(0px)",
//         duration: 0.8,
//         ease: "power3.out",
//         stagger: 0.03,
//       }
//     );
//   }, [activeTab, selectedProduct]); // 👈 reanimate on tab/product change

//   const tabs = ["Classic", "Contemporary"];

//   const productContent = data?.acf?.products?.map((val) => ({
//     Classic: {
//       title: val?.product_content[0]?.product_type_title,
//       description: val?.product_content[0]?.product_type_description,
//       images:
//         val?.product_content[0]?.product_type_images?.map(
//           (img) => img?.product_type_image?.url
//         ) || [],
//     },
//     Contemporary: {
//       title: val?.product_content[1]?.product_type_title,
//       description: val?.product_content[1]?.product_type_description,
//       images:
//         val?.product_content[1]?.product_type_images?.map(
//           (img) => img?.product_type_image?.url
//         ) || [],
//     },
//   }));

//   const products =
//     data?.acf?.products?.map((val) => ({
//       img: val?.product_image?.url,
//       label: val?.product_name,
//     })) || [];

//   const [activeTab, setActiveTab] = useState("Classic");
//   const [selectedProduct, setSelectedProduct] = useState(0);

//   const btnRef = useRef(null);
//   const dotRef = useRef(null);
//   const textRef = useRef(null);
//   const cardsRef = useRef([]);

//   // ✅ GSAP button hover animation
//   useEffect(() => {
//     if (!btnRef.current) return;

//     const tl = gsap.timeline({ paused: true });
//     tl.to(dotRef.current, { scale: 40, duration: 1, ease: "power4.inOut" }, 0);
//     tl.to(
//       textRef.current,
//       { color: "#fff", duration: 1, ease: "power4.inOut" },
//       0.1
//     );

//     const handleEnter = () => tl.play();
//     const handleLeave = () => tl.reverse();

//     btnRef.current.addEventListener("mouseenter", handleEnter);
//     btnRef.current.addEventListener("mouseleave", handleLeave);

//     return () => {
//       btnRef.current?.removeEventListener("mouseenter", handleEnter);
//       btnRef.current?.removeEventListener("mouseleave", handleLeave);
//     };
//   }, []);

//   // Hover animation
//   const handleMouseMove = (e, index) => {
//     const card = cardsRef.current[index];
//     if (!card) return;

//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const moveX = (x - rect.width / 2) / 20;
//     const moveY = (y - rect.height / 2) / 20;

//     const img = card.querySelector("img");
//     if (img) {
//       gsap.to(img, {
//         x: moveX,
//         y: moveY,
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     }
//   };

//   const handleMouseLeave = (index) => {
//     const card = cardsRef.current[index];
//     if (!card) return;

//     const img = card.querySelector("img");
//     if (img) {
//       gsap.to(img, {
//         x: 0,
//         y: 0,
//         duration: 0.6,
//         ease: "power3.out",
//       });
//     }
//   };

//   // ✅ ScrollTrigger animation
//   useEffect(() => {
//     if (!cardsRef.current.length) return;

//     const anim = gsap.fromTo(
//       cardsRef.current,
//       {
//         autoAlpha: 0,
//         y: 100,
//         scale: 0.9,
//       },
//       {
//         autoAlpha: 1,
//         y: 0,
//         scale: 1,
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.2,
//         scrollTrigger: {
//           trigger: cardsRef.current[0]?.parentNode,
//           start: "top 80%",
//           end: "bottom 60%",
//           toggleActions: "play none none reverse",
//         },
//       }
//     );

//     gsap.fromTo(
//       headingRefs2.current,
//       { opacity: 0, scale: 0.8, filter: "blur(6px)" },
//       {
//         opacity: 1,
//         scale: 1,
//         filter: "blur(0px)",
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.03,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 0%",
//           end: "bottom 0%",
//         },
//       }
//     );

//     ScrollTrigger.refresh();

//     return () => {
//       anim.kill();
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//     };
//   }, [activeTab, selectedProduct]);

//   const content =
//     productContent[selectedProduct] &&
//     productContent[selectedProduct][activeTab];

//   const sectionRef = useRef(null);
//   const headingRefs2 = useRef([]); // Second heading (Dynamic content.title)

//   // useEffect(() => {
//   //   // Second heading animation (letter by letter)
    
//   // }, []);
//   return (
//     <div ref={sectionRef} className="md:px-[3.75rem] py-[3.125rem] md:py-[6.25rem]">
//       {/* Product selector */}
//       <ProductItem onSelect={setSelectedProduct} products={products} />

//       {/* Tabs */}
//       <div className="mx-[1.25rem] md:px-0 border border-[#EFEFEF] rounded-[3.75rem] inline-flex items-center">
//         {tabs.map((tab, index) => (
//           <span
//             key={index}
//             onClick={() => setActiveTab(tab)}
//             className={`text-[#4A4A4A] text-[1rem] md:text-[1.125rem] leading-[1] px-[1.563rem] md:px-[2.5rem] py-[0.625rem] md:py-[0.875rem] rounded-[3.75rem] cursor-pointer transition-colors duration-300 
//               ${activeTab === tab ? "bg-[#F3F3F3]" : ""}`}
//           >
//             {tab}
//           </span>
//         ))}
//       </div>

//       {/* Text + Button */}
//       {content && (
//         <div className="px-[1.25rem] md:px-0 pt-12 lg:flex gap-22">
//           <div className="lg:w-[45%]">
//             <h2 className="text-[#1F1F1F] md:text-[2.2rem] text-[1.25rem] leading-[1.1] mt-6">
//               {content.title.split("").map((char, i) => (
//                 <span
//                   key={i}
//                   ref={(el) => (headingRefs2.current[i] = el)}
//                   className="inline-block"
//                 >
//                   {char === " " ? "\u00A0" : char}
//                 </span>
//               ))}
//             </h2>
//           </div>
//           <div className="lg:w-[55%] pt-5 lg:pt-0">
//             <div
//               className="text-[1rem] leading-[1.2] text-[#1F1F1F]"
//               dangerouslySetInnerHTML={{ __html: content.description }}
//             ></div>

//             <div className="pt-4 lg:pt-6">
//               <div className="flex justify-start relative z-20">
//                 <Link
//                   href={"/contact-us"}
//                   ref={btnRef}
//                   className="bg-white px-4 py-2 flex items-center rounded-[10rem] gap-3 overflow-hidden btn--liquidBtn1 relative"
//                 >
//                   <span
//                     ref={textRef}
//                     className="uppercase text-[0.938rem] relative z-10 text-[#9C458B]"
//                   >
//                     ENQUIRY NOW
//                   </span>
//                   <div
//                     ref={dotRef}
//                     className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B]"
//                     style={{ transformOrigin: "center" }}
//                   ></div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Images */}
//       {content && (
//         <div className="px-[1.25rem] md:px-0 pt-[3.75rem] md:pb-[10.938rem] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
//           {(() => {
//             cardsRef.current = [];
//             return content.images.map((src, index) => {
//               const isShifted = (index - 1) % 3 === 0;
//               return (
//                 <div
//                   key={index}
//                   ref={(el) => (cardsRef.current[index] = el)}
//                   onMouseMove={(e) => handleMouseMove(e, index)}
//                   onMouseLeave={() => handleMouseLeave(index)}
//                   className={`${isShifted ? "relative md:top-[11.25rem]" : ""
//                     } cursor-pointer overflow-hidden opacity-0`}
//                 >
//                   <Image
//                     src={src}
//                     width={800}
//                     height={800}
//                     alt={`${content.title}-${index}`}
//                     className="w-full h-auto object-cover pointer-events-none"
//                   />
//                 </div>
//               );
//             });
//           })()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sculpture;
