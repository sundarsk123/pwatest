"use client"
import { Customizationimg } from '@/Assets/Main/Image'
import Image from 'next/image'
import React, { Fragment, useEffect, useRef } from 'react'
import SvgDesign from './SvgDesign'
import Link from 'next/link'
import StatsSection from './StatsSection'
import { gsap } from 'gsap'


export default function Customization({
    section_seven_title,
    section_seven_description,
    section_seven_button_link,
    counter_section
}) {

    const Customizationdata = {
        customimg: Customizationimg,
        customheading: section_seven_title,
        custompara: section_seven_description,
        custombutton: "EnQUIRY NOW",
        customLink: section_seven_button_link
    }

    const btnRef = useRef(null)
    const dotRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        if (!btnRef.current) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(dotRef.current, {
            scale: 40,
            duration: 1,
            ease: "power4.inOut"
        }, 0);
        tl.to(textRef.current, {
            color: "#fff",
            duration: 1,
            ease: "power4.inOut"
        }, 0.1);

        const handleEnter = () => tl.play();
        const handleLeave = () => tl.reverse();

        btnRef.current.addEventListener("mouseenter", handleEnter);
        btnRef.current.addEventListener("mouseleave", handleLeave);

        return () => {
            if (btnRef.current) {
                btnRef.current.removeEventListener("mouseenter", handleEnter);
                btnRef.current.removeEventListener("mouseleave", handleLeave);
            }
        };
    }, []);


    return (
        <div className='md:pt-[6.25rem] pt-[2rem]'>
            <div className=' relative text-white'>
                <div>
                    <Image
                        src={Customizationdata.customimg}
                        alt='Customizationimg'
                        width={1000}
                        height={1000}
                        className='w-full h-screen object-cover'
                        loading='lazy'
                    />
                </div>
                <div className='absolute top-0 left-0 bottom-0 right-0 bg-[linear-gradient(180deg,#170A0200_90%,#0F0601_100%)]'>
                <div className='absolute top-[10rem] xl:top-[15rem]  left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <SvgDesign />

                </div>
                <div className='absolute top-[28rem]  xl:top-[36rem] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <h3 className='text-[2rem] md:text-[2.5rem] max-w-[35rem] mx-auto text-center'>
                        {Customizationdata.customheading}
                    </h3>
                    <div className='max-w-[36rem] mx-auto text-center py-3.5 md:py-4'
                        dangerouslySetInnerHTML={{ __html: Customizationdata.custompara }}
                    >

                    </div>
                    <div className='flex justify-center relative z-20'>
                        <Link
                            href={Customizationdata.customLink}
                            ref={btnRef}
                            className='bg-white px-4 py-2 flex items-center rounded-[10rem] gap-3 overflow-hidden btn--liquidBtn relative'
                        >
                            <span ref={textRef} className=' uppercase text-[0.938rem] relative z-10 text-[#9C458B]'>
                                {Customizationdata.custombutton}
                            </span>
                            <div
                                ref={dotRef}
                                className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B] "
                                style={{ transformOrigin: "center" }}
                            ></div>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
            <StatsSection counter_section={counter_section} />
        </div>
    )
}
