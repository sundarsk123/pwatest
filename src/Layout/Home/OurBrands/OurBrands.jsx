'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import frame from '@/Assets/Home/frame.png'

// Import images
import design1 from '@/Assets/Home/design-1.png'
import design2 from '@/Assets/Home/design-2.png'
import design3 from '@/Assets/Home/design-3.png'
import design4 from '@/Assets/Home/design-4.png'
import design5 from '@/Assets/Home/design-5.png'

// Import SVGs
import svg1 from '@/Assets/Home/design-svg-1.svg'
import svg2 from '@/Assets/Home/design-svg-2.svg'
import svg3 from '@/Assets/Home/design-svg-3.svg'
import svg4 from '@/Assets/Home/design-svg-4.svg'
import svg5 from '@/Assets/Home/design-svg-5.svg'

gsap.registerPlugin(ScrollTrigger)

const brands = [
    { id: 1, image: design1, svg: svg1, topOffset: '5rem' },
    { id: 2, image: design2, svg: svg2, topOffset: '8.5rem' },
    { id: 3, image: design3, svg: svg3, topOffset: '0rem' },
    { id: 4, image: design4, svg: svg4, topOffset: '10.5rem' },
    { id: 5, image: design5, svg: svg5, topOffset: '8.5rem' }
]

const OurBrands = ({
    our_brands_title,
    our_brands_sub_title,
    our_brands,
    our_brand_section_image
}) => {
    const sectionRef = useRef(null)
    const itemsRef = useRef([])

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, brands.length) // ensure no extra refs

        gsap.fromTo(
            itemsRef.current,
            {
                y: (i) => (i % 2 === 0 ? -100 : 100), // even index → bottom to top, odd index → top to bottom
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.3, // one-by-one timing
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
    }, [])

    const headingRefs = useRef([])

    useEffect(() => {
        if (headingRefs.current.length > 0) {
            gsap.fromTo(
                headingRefs.current,
                { opacity: 0, scale: 0.8, filter: "blur(6px)" },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "bottom 50%",
                    },
                }
            )
        }
    }, [])

    return (
        <div ref={sectionRef} className="px-[3.75rem] py-[6.25rem]">
            <div className="flex gap-[4.375rem]">

                {/* Left Content */}
                <div className="w-[35%]">
                    <div>
                        <h2 className="text-[#1F1F1F] text-[3.125rem] leading-[1.1]">
                            {our_brands_title.split("").map((char, i) => (
                                <span
                                    key={i}
                                    ref={(el) => (headingRefs.current[i] = el)}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </h2>
                        <p className="text-[1.125rem] text-[#1F1F1F] leading-[1.2] font-500">
                            {our_brands_sub_title}
                        </p>
                    </div>
                    <div className="pt-[4rem] group">
                        <Image
                            src={our_brand_section_image.url}
                            width={600}
                            height={600}
                            alt="Decorative frame"
                            className="-rotate-[20deg] w-[24.3125rem] h-[32.125rem] px-[1.25rem] transform transition-transform duration-500 ease-in-out group-hover:scale-103"
                        />
                    </div>
                </div>

                {/* Right Brands Gallery */}
                <div className="flex w-[65%] relative">
                    {our_brands.map((brand, index) => (
                        <div
                            key={brand.id || index}
                            ref={(el) => (itemsRef.current[index] = el)}
                            className="flex flex-col items-center gap-[2.5rem] relative before:absolute before:top-0 before:left-0 before:h-full before:w-px before:bg-[#FFE4FA]"
                            style={{
                                paddingTop: brands[index]?.topOffset || "0rem", // ✅ fixed
                                paddingLeft: index !== 0 ? "0rem" : "0",
                            }}
                        >
                            {/* Brand Image */}
                            <div>
                                <Image
                                    src={brand?.our_brands_image?.url}
                                    width={194}
                                    height={475}
                                    alt={brand.our_brands_image?.alt || "brand image"}
                                    className="w-[12.125rem] h-[28.6875rem] rounded-[16.875rem] object-cover mt-[1.25rem]"
                                />
                            </div>

                            {/* Brand Logo/SVG */}
                            <div className="mt-auto">
                                <Image
                                    src={brand?.our_brands_logo?.url}
                                    width={200}
                                    height={200}
                                    alt={brand.our_brands_logo?.alt || "brand logo"}
                                    className="mb-[2.5rem] w-[7.5rem] h-[1.875rem]"
                                />
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default OurBrands
