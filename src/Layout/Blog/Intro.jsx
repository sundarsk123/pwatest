'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import banner from '@/Assets/Work/work.jpg'
import { gsap } from "gsap";

export default function Intro() {
    const headingRef = useRef(null)
    const paraRef = useRef(null)
    const subRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.1 })

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
        <div className='relative'>
            <div>
                <Image
                    src={banner}
                    width={1521}
                    height={547}
                    alt='intro'
                    className='w-full h-[75vh] object-cover object-center' />
            </div>
            <div className='absolute bottom-0 left-0 right-0 px-[20px] md:px-[3.75rem] pb-[1.25rem] md:pb-[2.25rem]'>
                <h1 ref={headingRef} className='text-white text-[1.8rem] md:text-[2.4rem] lg:text-[4rem] pt-1.5 block opacity-0 !leading-[2]'>
                    Blog
                </h1>
            </div>
        </div>
    )
}
