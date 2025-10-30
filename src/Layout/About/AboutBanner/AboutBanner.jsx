"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutBanner = ({ section_four_image }) => {
    const imageContainerRef = useRef(null);

    useEffect(() => {
        if (!imageContainerRef.current) return;

        // Animate ONLY on scroll
        gsap.fromTo(
            imageContainerRef.current,
            {
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                scale: 0.8,
                opacity: 1,
            },
            {
                width: "100%",
                height: "85vh",
                borderRadius: "0%",
                scale: 1,
                opacity: 1,
                ease: "power8.inOut",
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top 95%", // when the top of the element hits 90% of viewport
                    end: "top 10%",   // when the top of the element reaches 10% of viewport
                    scrub: true,      // smooth scroll-linked animation
                    markers: false,   // set to true for debugging
                },
            }
        );
    }, []);

    return (
        <div className="w-full flex justify-center items-center">
            <div
                ref={imageContainerRef}
                className="relative overflow-hidden"
                style={{
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                }}
            >
                <Image
                    src={section_four_image?.url}
                    alt="aboutintro"
                    width={1401}
                    height={934}
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default AboutBanner;
