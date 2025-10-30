'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bannerimg from '@/Assets/About/design/image 98kj96 (2).png'
import ArtForm from './ArtForm'

gsap.registerPlugin(ScrollTrigger)

const BannerForm = ({pages, Footerdatas}) => {
    const headingRef = useRef(null)
    const paraRef = useRef(null)
    const subRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 0%", // when top of section hits 70% of viewport
                end: "bottom 0%", // optional
                toggleActions: "play none none reverse",
                // play | pause | resume | restart | reverse | none | complete | reset
            }
        })

        // SubHeading fade + luxury spacing
        tl.fromTo(
            subRef.current,
            { opacity: 0, letterSpacing: "0.1em", filter: "blur(2px)" },
            {
                opacity: 1,
                letterSpacing: "0em",
                filter: "blur(0px)",
                duration: 0.5,
                ease: "expo.out"
            }
        )

        // Heading luxury wipe (clip-path)
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
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: "power4.out"
            },
            "-=0.8"
        )

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div ref={sectionRef} className="relative w-full">
            {/* Banner with text */}
            <div className="relative w-full">
                <Image
                    src={Footerdatas?.banner_form_image?.url}
                    alt="bannerlogo"
                    width={1500}
                    height={1500}
                    className="w-full h-[95vh] md:h-auto object-cover bg-[#F5F5F5]"
                    priority={true}
                    quality={100}
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 text-white text-center mx-auto w-full">
                    <h1
                        ref={headingRef}
                        className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] !leading-[1.3] max-w-[53rem] mx-auto"
                    >
                        {Footerdatas?.banner_form_text}
                    </h1>
                    <p
                        ref={subRef}
                        className="md:text-[10rem] text-[3rem] -mt-[1rem] md:-mt-[2rem] font-MiamiSunday max-w-[55rem] mx-auto"
                    >
                        {Footerdatas?.banner_form_title}
                    </p>
                </div>
            </div>

            <div className="relative w-full bg-[#0F0601]">
                <div className="relative z-10 max-w-[76rem] mx-auto ">
                    <ArtForm pages={pages}/>
                </div>
            </div>
        </div>
    )
}

export default BannerForm
