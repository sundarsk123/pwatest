"use client"
import { brass, cooper, handfinished, metal } from '@/Assets/Main/Image'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OurApproach({
    approach_title,
    approach_description,
    approach_materials
}) {
    const sectionRef = useRef(null)
    const headingRefs = useRef([])
    const paraRef = useRef(null)
    const gridRefs = useRef([])

    const storyData = {
        title: "Our approach"
    }

    const data = [
        { id: 1, title: "Cooper", img: cooper },
        { id: 2, title: "Metal", img: metal },
        { id: 3, title: "Brass", img: brass },
        { id: 4, title: "Hand Finished", img: handfinished },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate heading letters
            gsap.fromTo(
                headingRefs.current,
                { opacity: 0, scale: 0.8, filter: "blur(6px)" },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "bottom 50%",
                    }
                }
            )

            // Paragraph animation
            gsap.fromTo(
                paraRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: paraRef.current,
                        start: "top 90%",
                        end: "bottom 50%",
                    }
                }
            )

            // Grid items animation
            gsap.fromTo(
                gridRefs.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "bottom 50%",
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className='px-[20px] md:px-[3.75rem] py-[50px] md:py-[6.25rem]'>
            <div className='xl:flex justify-between items-start'>
                <h3 className="text-[#4A4A4A] md:text-[3.125rem] text-[1.25rem] leading-[1.1]">
                    {approach_title.split("").map((char, i) => (
                        <span
                            key={i}
                            ref={(el) => (headingRefs.current[i] = el)}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h3>

                <div
                    ref={paraRef}
                    className='text-[#6B6B6B] max-w-[50rem] text-[0.975rem] pt-5 lg:pt-7 xl:pt-0' dangerouslySetInnerHTML={{__html:approach_description}}
                >
                   
                </div>
            </div>

            <div className='mt-[4.125rem] grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-[2.25rem]'>
                {approach_materials.map((item, index) => (
                    <div
                        key={index}
                        ref={el => gridRefs.current[index] = el}
                        className='flex flex-col gap-2 md:gap-[1rem]'
                    >
                        <Image
                            src={item?.material_image?.url}
                            alt={item.material_image?.url}
                            width={1920}
                            height={1080}
                            className='w-[30rem] h-full object-cover'
                            loading='lazy'
                        />
                        <p className='text-[#4A4A4A] text-[1rem] md:text-[1.125rem]'>
                            {item.material_text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
