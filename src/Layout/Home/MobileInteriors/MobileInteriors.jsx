"use client"
import { doorlock } from '@/Assets/Main/Image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function MobileInteriors({
    section_two_title,
    section_two_tag,
    section_two_description
}) {

    const InteriorsData = {
        heading: section_two_title,
        subheading: section_two_tag,
        para: section_two_description,
        buttonname: "Explore More",
        buttonlink: '/products'
    }

    return (
        <div className="flex lg:hidden flex-col justify-center items-center gap-8 pt-16 pb-16 px-6 text-center">
            
            {/* Heading Section */}
            <div>
                <h2 className="text-[2rem] md:text-[2.25rem] text-[#4A4A4A] font-semibold leading-snug">
                    {InteriorsData.heading}
                </h2>
                <p className="text-[#9C458B] font-MiamiSunday text-[3.5rem] md:text-[6rem] leading-none mt-[-1rem]">
                    {InteriorsData.subheading}
                </p>
            </div>

            {/* Image Section */}
            <div className="w-[8rem] h-auto">
                <Image
                    src={doorlock}
                    alt="doorlock"
                    className="object-contain"
                    width={1000}
                    height={1000}
                    priority
                    quality={90}
                />
            </div>

            {/* Text and Button Section */}
            <div className="flex flex-col items-center gap-6 max-w-[28rem]">
                <div
                    className="text-[#1F1F1F] text-[1rem] md:text-[1.1rem] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: InteriorsData.para }}
                ></div>
                <Link
                    href={InteriorsData.buttonlink}
                    className="px-6 py-3 flex items-center gap-3 uppercase rounded-full border border-[#9C458B] hover:bg-[#9C458B] hover:text-white transition-all duration-300"
                >
                    <span className="text-[0.95rem] font-medium text-[#9C458B]">
                        {InteriorsData.buttonname}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#9C458B]"></span>
                </Link>
            </div>
        </div>
    )
}
