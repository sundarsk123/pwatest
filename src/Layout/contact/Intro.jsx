'use client'
import { ContactLogo } from '@/Assets/Main/Image'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Intro({
    banner_image,
}) {
    const headingRef = useRef(null)
    const paraRef = useRef(null)
    const subRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 })

        // SubHeading fade + luxury spacing
        tl.fromTo(
            subRef.current,
            { opacity: 0, letterSpacing: "0.1em", filter: "blur(2px)" },
            { opacity: 1, letterSpacing: "0em", filter: "blur(0px)", duration: 0.5, ease: "expo.out" }
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
        <div className='relative h-[92vh] md:h-screen'>
            <Image
                src={banner_image?.url ? banner_image?.url : ContactLogo}
                alt='contactlogo'
                width={1500}
                height={1500}
                className="w-full h-full md:h-screen object-cover bg-[#F5F5F5]"
                priority={true}
                quality={100}

            />
            <div className='absolute -bottom-[1rem] md:-bottom-[13rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center max-w-[60rem] mx-auto w-full '>
                <h1 ref={headingRef} className='text-[2rem] lg:text-[5rem] xl:text-[5rem] md:text-[3rem] !leading-[1.3]'>Find new creations for your space</h1>
                <p ref={subRef} className='md:text-[12rem] text-[5rem] -mt-[2rem] md:-mt-[4rem] font-MiamiSunday'>Contact</p>
            </div>
        </div>
    )
}
