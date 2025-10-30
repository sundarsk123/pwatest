'use client'

import aboutintro from '@/Assets/About/intro.jpg'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const AboutIntro = ({
    banner_image,
    banner_title
}) => {

    const subRef = useRef(null)
    const headingRef = useRef(null)
    const paraRef = useRef(null)


    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.1 })

        // SubHeading fade + luxury spacing
        tl.fromTo(
            subRef.current,
            { opacity: 0, letterSpacing: "0.1em", filter: "blur(2px)" },
            { opacity: 1, letterSpacing: "0em", filter: "blur(0px)", duration: 0.8, ease: "expo.out" }
        )

        // Heading luxury wipe (no split, just clip-path)
        tl.fromTo(
            headingRef.current,
            {
                clipPath: "inset(0 100% 0 0)",
                opacity: 0,
                y: 20,
                filter: "blur(3px)"
            },
            {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power4.out"
            },
            "-=0.5"
        )

        // Paragraph fade-in luxury
        tl.fromTo(
            paraRef.current,
            { opacity: 0, y: 20, filter: "blur(2px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out" },
            "-=0.8"
        )
    }, [])


    return (
        <div className="w-full h-[90vh] lg:h-screen relative overflow-hidden ">
            <Image
                src={banner_image?.url}
                alt="Artisticks Intro"
                width={1521}
                height={730}
                className="w-full h-screen object-cover bg-[#0F0601]"
                priority
                quality={100}
            />

            <div className="absolute bottom-0 left-0 right-0 text-white px-[1.25rem] bg-gradient-to-b from-transparent to-[#0F0601]">


                <div className="lg:flex items-center justify-center gap-[1rem]">
                    <h1
                        ref={headingRef}
                        className="text-white text-[1.8rem] md:text-[2.4rem] lg:text-[4rem] pt-1.5 block opacity-0 text-center"
                    >
                        {banner_title}
                    </h1>


                </div>
            </div>
        </div>
    )
}

export default AboutIntro
