"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";

export default function SocialMedia({ medianame, mediasvg, medialink }) {
  const linkRef = useRef(null);
  const rippleRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    const link = linkRef.current;
    const ripple = rippleRef.current;
    const text = textRef.current;
    const icon = iconRef.current;

    // Button glow + scale
    gsap.to(link, {
      scale: 1.08,
      backgroundColor: "#8C357B",
      boxShadow: "0px 0px 10px rgba(228, 137, 210, 0.7)",
      duration: 0.4,
      ease: "power3.out",
    });

    // Ripple animation
    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 0.5 },
      { scale: 1.5, opacity: 0, duration: 0.6, ease: "power1.out" }
    );

    // Floating text & icon
    gsap.to([text, icon], {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const link = linkRef.current;
    const text = textRef.current;
    const icon = iconRef.current;

    gsap.to(link, {
      scale: 1,
      backgroundColor: "#8C357B",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.inOut",
    });

    gsap.to([text, icon], {
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <Link
      ref={linkRef}
      href={medialink}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#8C357B] px-4 py-3 flex justify-between w-full max-w-[9rem] rounded-[10rem] md:max-w-[14rem] overflow-hidden"
    >
      {/* Ripple span */}
      <span
        ref={rippleRef}
        className="absolute inset-0 rounded-[10rem] bg-[#752766] opacity-0 pointer-events-none"
      />
      <span ref={textRef} className="md:text-[1.125rem] relative z-10">
        {medianame}
      </span>
      <span ref={iconRef} className="relative z-10">
        {mediasvg}
      </span>
    </Link>
  );
}
