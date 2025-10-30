"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";

export default function QuickLink({ quicklink, quicklinkname }) {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(linkRef.current, {
      scale: 1.05,
      color: "#f4f4f4",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(underlineRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(linkRef.current, {
      scale: 1,
      color: "#FEEAFA",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="inline-block relative">
      <Link
        href={quicklink}
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        {quicklinkname}
        {/* Underline */}
        <span
          ref={underlineRef}
          className="absolute left-0 -bottom-1 h-[2px] bg-[#E489D2] w-full scale-x-0 origin-left"
        ></span>
      </Link>
    </div>
  );
}
