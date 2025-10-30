"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductItemMob from "./ProductItemMob";

gsap.registerPlugin(ScrollTrigger);

const ProductItem = ({ onSelect, products }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
    onSelect(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // when container enters viewport
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2, // one by one animation
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pb-[3.125rem] md:pb-[6.25rem] w-full">
      <div className="md:hidden">
        <ProductItemMob
          onSelect={onSelect}
          products={products} />
      </div>
      <div ref={containerRef} className=" md:flex flex-wrap justify-center gap-[1.25rem] hidden">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`product-card cursor-pointer border border-[#E9E9E9] rounded-[0.625rem] p-[1.25rem] 
              w-full md:w-1/4 lg:w-1/7 
              transition-colors duration-300 group overflow-hidden
              ${selectedIndex === index ? "bg-[#F3F3F3]" : "bg-none"}`}
          >
            <Image
              src={product.img}
              width={12.5 * 16} // 200px = 12.5rem
              height={12.5 * 16}
              alt={product.label}
              className="w-full h-auto transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <p className="text-center pt-[0.5rem] text-[1rem] md:text-[1.125rem] text-[#1F1F1F]">
              {product.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductItem;
