'use client'
import { Celebratingimg } from '@/Assets/Main/Image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Celebrating({
    section_five_background_image,
    section_five_title,
    section_five_anniversary_number,
    section_five_anniversary_number_symbol,
    section_five_sub_title,
    section_five_description
}) {
    const imgRef = useRef(null)
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

    useEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.matchMedia({
                // Only for screens >= 1024px
                "(min-width: 1024px)": () => {
                    if (imgRef.current) {
                        gsap.to(imgRef.current, {
                            y: "-10%", // Parallax movement
                            ease: "none",
                            scrollTrigger: {
                                trigger: imgRef.current,
                                start: "top bottom",   // when image enters bottom
                                end: "bottom top",     // when image leaves top
                                scrub: true,           // smooth parallax
                            },
                        });
                    }
                },
            });
        });

        return () => ctx.revert(); // cleanup on unmount
    }, []);


    return (
        <div className='relative h-[46rem] sm:h-[130vh] overflow-hidden'>
            {/* Background image */}
            <div ref={imgRef} className="absolute inset-0">
                <Image
                    src={section_five_background_image.url}
                    alt='Celebrating'
                    width={1000}
                    height={1000}
                    className='w-full h-full object-cover'
                    priority
                />
            </div>

            {/* Content Box */}
            <div className="lg:w-[33rem] lg:h-[42rem] sm:w-[30rem] sm:h-[40rem] w-[18rem] h-[40rem] absolute top-[23rem] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col z-10">
                {/* Top half */}
                <div className="flex-1 bg-transparent border-t-[0.5rem] border-l-[0.5rem] border-r-[0.5rem] border-white relative">
                    <p className='absolute sm:-left-24 -left-3 top-4 text-white font-MiamiSunday text-[5.4rem] sm:text-[10rem] md:text-[12rem]'>{section_five_title}</p>
                </div>
                {/* Bottom half */}
                <div className="flex-1 bg-white border-white">
                    <div className='text-center py-8 px-5 text-[#4A4A4A]'>
                        <div className='flex justify-center relative'>
                            <h3 className="md:text-[4rem] sm:text-[3rem] text-[1.5rem] ">{section_five_anniversary_number}</h3>
                            <sup className="md:text-[1.2rem]  align-bottom pt-3.5">{section_five_anniversary_number_symbol}</sup>
                        </div>
                        <p className='font-tan-pearl text-[1.125rem]'>{section_five_sub_title}</p>
                        <div className='py-5'>
                            <div className='text-center text-[0.9rem] md:text-[1rem]' dangerouslySetInnerHTML={{ __html: section_five_description }}>

                            </div>
                        </div>
                        <div className='inline-block'>
                            <Link
                                href={''}
                                ref={btnRef}
                                className='bg-white btn--liquidBtn relative overflow-hidden px-4 py-2 flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
                            >
                                <span ref={textRef} className=' uppercase text-[0.938rem] relative z-10 text-[#9C458B]'>GET IN TOUCH</span>
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


        </div>
    )
}























// import { Celebratingimg } from '@/Assets/Main/Image'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// export default function Celebrating() {
//     return (
//         <div className='relative '>
//             <Image
//                 src={Celebratingimg}
//                 alt='Celebrating'
//                 width={1000}
//                 height={1000}
//                 className='w-full h-full object-cover'
//             />
//             <div className="w-[33rem] h-[42rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
//                 {/* Top half */}
//                 <div className="flex-1 bg-transparent border-t-[0.5rem] border-l-[0.5rem] border-r-[0.5rem] border-white relative">
//                     <p className='absolute -left-24 top-4 text-white font-MiamiSunday text-[12rem]'>Celebrating</p>
//                 </div>
//                 {/* Bottom half */}
//                 <div className="flex-1 bg-white  border-white">
//                     <div className='text-center py-8 px-5 text-[#4A4A4A]'>
//                         <div className='flex justify-center relative'>
//                             <h3 className="text-[4rem]">
//                                 36
//                             </h3>
//                             <sup className="text-[1.2rem] align-bottom pt-3.5">th</sup>
//                         </div>
//                         <p className='font-tan-pearl text-[1.125rem]'>Anniversary</p>
//                         <div className='py-5'>
//                             <p className='text-center text-[1rem]'>Artisticks have been serving architects and interior designers of India for the past three decades. we display all our creative solutions in 8 galleries covering entire south India and one gallery in Pune. we have standard offerings and also we customize as per designer and project requirement. our creative solution includes brass cast Home decorative embellishments for the entrance door, internal door, pooja door, uniquely designed handles, mural, staircase railing, decorative grills, art mirror frames, and corporate gifts and mementos.</p>
//                         </div>
//                         <div className='inline-block'>
//                             <Link
//                                 href={''}
//                                 className='bg-white px-4 py-2 flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
//                             >
//                                 <span className='text-[#9C458B] uppercase text-[0.938rem]'>GET IN TOUCH</span>
//                                 <span>
//                                     <svg style={{ width: '0.5rem', height: '0.5rem' }} width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                                         <rect width='8' height='8' rx='4' fill='#9C458B' />
//                                     </svg>
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
