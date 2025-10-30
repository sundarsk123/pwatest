"use client"
import React, { Fragment, useEffect, useRef, useState } from 'react'
import SocialMedia from './FooterCom/SocialMedia'
import InstaSvg from './FooterCom/InstaSvg'
import FaceSvg from './FooterCom/FaceSvg'
import WhatsSvg from './FooterCom/WhatsSvg'
import YouSvg from './FooterCom/YouSvg'
// import Link from 'next/link'
import QuickLink from './FooterCom/QuickLink'
import LocationLink from './FooterCom/LocationLink'
import LogoSvg from './FooterCom/LogoSvg'
import { quickLinksData } from './FooterCom/data/data'
import { gsap } from "gsap"
import './FooterCom/Footer.css'
import Link from 'next/link'
import FooterEmail from './FooterCom/FooterEmail/FooterEmail'

const socialMediaData = [
    { medialink: '', medianame: 'Instagram', mediasvg: <InstaSvg /> },
    { medialink: '', medianame: 'Facebook', mediasvg: <FaceSvg /> },
    { medialink: '', medianame: 'Whatsapp', mediasvg: <WhatsSvg /> },
    { medialink: '', medianame: 'Youtube', mediasvg: <YouSvg /> }
]


export default function Footer({ Footerdatas }) {

    let galleriesData = {};

    try {
        galleriesData = Footerdatas?.footer_locations?.reduce((acc, loc) => {
            acc[loc.location_name] = {
                title: loc.location_inner_title || "",
                address: loc.location_address || "",
                email: loc.email_ids?.map((item) => ({
                    href: `mailto:${item.email_id}`,
                    text: item.email_id,
                })) || [],
                phone: loc.phone_numbers?.map((item) => ({
                    href: `tel:${item.phone_number}`,
                    text: item.phone_number,
                })) || [],
            };
            return acc;
        }, {});
    } catch (error) {
        console.error("Error processing galleriesData:", error);
        galleriesData = {}; // fallback empty object
    }


    const [activeLocation, setActiveLocation] = useState('Chennai');

    const gallery = galleriesData[activeLocation] || {};

    const galleryRef = useRef(null)

    useEffect(() => {
        if (galleryRef.current) {
            // kill previous animations
            gsap.killTweensOf(galleryRef.current.querySelectorAll(".reveal-text"))

            gsap.fromTo(
                galleryRef.current.querySelectorAll(".reveal-text"),
                { x: -8, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.1
                }
            )
        }
    }, [activeLocation])

    const arrowRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(arrowRef.current, {
            rotate: 45, // rotate the arrow 45 degrees
            transformOrigin: "50% 50%", // rotate around center
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(arrowRef.current, {
            rotate: 0, // reset rotation
            duration: 0.3,
            ease: "power2.inOut",
        });
    };

    return (
        <div className='block'>
            <div className='bg-[#9C458B] text-white  md:py-[3.75rem] py-[1.25rem]'>
                <div className='lg:border border-[#8C357B] lg:border-x-0 lg:border-t-0 flex justify-start flex-row flex-wrap'>

                    {/* Social */}
                    <div className='lg:h-[32rem] sm:flex flex-col justify-between px-[1.25rem] md:px-[3rem] lg:px-[3.75rem] lg:border border-[#8C357B] lg:border-l-0 lg:border-y-0 lg:w-[25%]'>
                        <div className=''>
                            <p className='text-[1.875rem] max-w-[14rem] pb-3'>
                                We’re social
                                come say hello
                            </p>
                            <div className='flex flex-row :flex-col flex-wrap gap-3.5'>
                                {socialMediaData.map((item, index) => (
                                    <SocialMedia key={index} {...item} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className='text-[#ED90DB] pb-8 pt-5 lg:pt-0'>© 2025 Artistick's All rights reserved</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='lg:h-[32rem] sm:flex justify-center px-[1.25rem] md:px-[3rem] lg:px-[3.75rem] lg:border border-[#8C357B] lg:border-l-0 lg:border-y-0 lg:w-[22%]'>
                        <div className='flex flex-col gap-4 mb-8'>
                            <p className='text-[1.25rem] max-w-[14rem] md:pb-2.5'>Quick links</p>
                            {quickLinksData.map((item, index) => (
                                <QuickLink key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* Locations */}
                    <div className='lg:h-[32rem] sm:flex justify-center px-[1.25rem] md:px-[3rem] lg:px-[3.75rem] lg:w-[25%] lg:pt-0'>
                        <div className='flex flex-col gap-6'>
                            <p className='text-[1.25rem] max-w-[14rem] md:pb-2.5'>Locations</p>
                            {Footerdatas?.footer_locations?.length > 0 ? (
                                Footerdatas.footer_locations.map((data, index) => (
                                    <LocationLink
                                        key={index}
                                        locationName={data?.location_name}
                                        isActive={data?.location_name === activeLocation}
                                        onClick={() => setActiveLocation(data?.location_name)}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-400">No locations available</p>
                            )}

                        </div>
                    </div>

                    {/* Gallery Info */}
                    <div className='lg:h-[32rem] sm:flex justify-center px-[1.25rem] md:px-[3rem] lg:px-[3.75rem] lg:w-[28%] sm:max-w-[28rem] md:max-w-[30rem] pb-[1rem] md:pb-0' ref={galleryRef}>
                        <div className='flex flex-col gap-5 md:gap-10'>
                            <div className='pt-14'>
                                <p className='text-[1.25rem] max-w-[14rem] pb-3  reveal-text'>{gallery.title}</p>
                                <p className='text-[#FEEAFA]  reveal-text'>{gallery.address}</p>
                            </div>

                            <div>
                                <p className='text-[1.25rem] max-w-[14rem] pb-3  reveal-text'>Email</p>
                                <div className='flex flex-col gap-1.5'>
                                    {gallery.email?.map((item, index) => (
                                        <AnimatedLink key={index} href={item.href}>
                                            {item.text}
                                        </AnimatedLink>
                                        // <Link key={index} href={item.href} className='text-[#FEEAFA] hover:text-white transition-colors duration-300 reveal-text'>
                                        //     {item.text}
                                        // </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className='text-[1.25rem] max-w-[14rem] pb-3.5  reveal-text'>Phone</p>
                                <div className='grid grid-cols-2 gap-1.5'>
                                    {gallery.phone?.map((item, index) => (
                                        <AnimatedLink key={index} href={item.href}>
                                            {item.text}
                                        </AnimatedLink>
                                        // <Link key={index} href={item.href} className='text-[#FEEAFA] hover:text-white transition-colors duration-300 reveal-text'>
                                        //     {item.text}
                                        // </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className='px-[1.25rem] md:px-[3rem] lg:px-[3.75rem] pt-[1rem]  border border-x-0 border-b-0 border-t-[#8C357B] md:border-none md:pt-[3rem] lg:pt-[3.75rem] lg:flex justify-between items-center'>
                    <p className='lg:text-[1.875rem] max-w-[40rem] leading-[1.4] font-tan-pearl'>
                        Join our mailing list to get the latest news & updates
                    </p>
                    <Fragment>
                        <FooterEmail
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            arrowRef={arrowRef}
                        />
                    </Fragment>
                </div>
            </div>

            {/* Bottom Logo */}
            <div className='flex justify-center overflow-hidden md:py-3.5 bg-[#FFE8FB]'>
                <LogoSvg />
            </div>
        </div>
    )
}





function AnimatedLink({ href, children }) {
    const linkRef = useRef(null);
    const underlineRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(linkRef.current, {
            color: "#fff",
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(underlineRef.current, {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(linkRef.current, {
            color: "#FEEAFA",
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
        });

        gsap.to(underlineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.3,
            ease: "power2.inOut",
        });
    };

    return (
        <div className="relative inline-block">
            <Link
                href={href}
                ref={linkRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative inline-block reveal-text"
            >
                {children}
                <span
                    ref={underlineRef}
                    className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-[#E489D2] scale-x-0 origin-left"
                ></span>
            </Link>
        </div>
    );
}




















// "use client"
// import React, { useState } from 'react'
// import SocialMedia from './FooterCom/SocialMedia'
// import InstaSvg from './FooterCom/InstaSvg'
// import FaceSvg from './FooterCom/FaceSvg'
// import WhatsSvg from './FooterCom/WhatsSvg'
// import YouSvg from './FooterCom/YouSvg'
// import Link from 'next/link'
// import QuickLink from './FooterCom/QuickLink'
// import LocationLink from './FooterCom/LocationLink'
// import LogoSvg from './FooterCom/LogoSvg'

// const socialMediaData = [
//     {
//         medialink: '',
//         medianame: 'Instagram',
//         mediasvg: <InstaSvg />
//     },
//     {
//         medialink: '',
//         medianame: 'Facebook',
//         mediasvg: <FaceSvg />
//     },
//     {
//         medialink: '',
//         medianame: 'Whatsapp',
//         mediasvg: <WhatsSvg />
//     },
//     {
//         medialink: '',
//         medianame: 'Youtube',
//         mediasvg: <YouSvg />
//     }
// ]
// const quickLinksData = [
//     { quicklink: '', quicklinkname: 'Who we are' },
//     { quicklink: '', quicklinkname: 'Product' },
//     { quicklink: '', quicklinkname: 'Our projects' },
//     { quicklink: '', quicklinkname: 'Customization' },
//     { quicklink: '', quicklinkname: 'Blog' },
//     { quicklink: '', quicklinkname: 'Shop' },
//     { quicklink: '', quicklinkname: 'Contact' }
// ];

// const locationLinksData = [
//     { locationName: "Chennai" },
//     { locationName: "Coimbatore" },
//     { locationName: "Madurai" },
//     { locationName: "Bangalore" },
//     { locationName: "Hyderabad" },
//     { locationName: "Vijayawada" },
//     { locationName: "Vizag" },
// ];

// // const chennaiGalleryData = {
// //     title: "Chennai Gallery",
// //     address: "No. 113, G. N. Chetty, Road, “Ankur Plaza” Shop. No. 5, Basement, (Near Vani Mahal) T. Nagar, Chennai – 17.",
// //     email: [
// //         { href: "", text: "gallery.kovai@artisticks.co.in" },
// //         { href: "", text: "prabhakaran@artisticks.co.in" },
// //         { href: "", text: "sampath@artisticks.co.in" }
// //     ],
// //     phone: [
// //         { href: "", text: "044–2815 1186" },
// //         { href: "", text: "+91 76049 59001" },
// //         { href: "", text: "+91 94444 15904" },
// //         { href: "", text: "+91 95001 18599" }
// //     ]
// // };

// const galleriesData = {
//   Chennai: {
//     title: "Chennai Gallery",
//     address:
//       "No. 113, G. N. Chetty, Road, “Ankur Plaza” Shop. No. 5, Basement, (Near Vani Mahal) T. Nagar, Chennai – 17.",
//     email: [
//       { href: "", text: "gallery.kovai@artisticks.co.in" },
//       { href: "", text: "prabhakaran@artisticks.co.in" },
//       { href: "", text: "sampath@artisticks.co.in" },
//     ],
//     phone: [
//       { href: "", text: "044–2815 1186" },
//       { href: "", text: "+91 76049 59001" },
//       { href: "", text: "+91 94444 15904" },
//       { href: "", text: "+91 95001 18599" },
//     ],
//   },

//   Coimbatore: {
//     title: "Coimbatore Gallery",
//     address: "Coimbatore sample address here...",
//      email: [
//       { href: "", text: "gallery.kovai@artisticks.co.in" },
//       { href: "", text: "prabhakaran@artisticks.co.in" },
//       { href: "", text: "sampath@artisticks.co.in" },
//     ],
//     phone: [
//       { href: "", text: "044–2815 1186" },
//       { href: "", text: "+91 76049 59001" },
//       { href: "", text: "+91 94444 15904" },
//       { href: "", text: "+91 95001 18599" },
//     ],
//   },


// };




// export default function Footer() {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const gallery = galleriesData[activeLocation];
//     return (
//         <div className='hidden lg:block'>
//             <div className='bg-[#9C458B] text-white  py-[3.75rem] '>
//                 <div className='border border-[#8C357B] border-x-0 border-t-0 flex'>
//                     <div className='h-[32rem] flex flex-col justify-between px-[3.75rem] border border-[#8C357B] border-l-0 border-y-0 w-[25%]'>
//                         <div className='flex flex-col gap-3.5'>
//                             <p className='text-[1.875rem] max-w-[14rem] pb-2.5'>
//                                 We’re social
//                                 come say hello
//                             </p>
//                             {socialMediaData.map((item, index) => (
//                                 <SocialMedia
//                                     key={index}
//                                     medialink={item.medialink}
//                                     medianame={item.medianame}
//                                     mediasvg={item.mediasvg}
//                                 />
//                             ))}
//                         </div>
//                         <div>
//                             <p className='text-[#ED90DB] pb-8'>© 2025 Artistick's All rights reserved</p>
//                         </div>
//                     </div>
//                     <div className='h-[32rem] flex justify-center px-[3.75rem] border border-[#8C357B] border-l-0 border-y-0 w-[22%]'>
//                         <div className='flex flex-col gap-4'>
//                             <p className='text-[1.25rem] max-w-[14rem] pb-2.5'>
//                                 Quick links
//                             </p>
//                             {quickLinksData.map((item, index) => (
//                                 <QuickLink
//                                     key={index}
//                                     quicklink={item.quicklink}
//                                     quicklinkname={item.quicklinkname}
//                                 />
//                             ))}

//                         </div>
//                     </div>
//                     <div className='h-[32rem] flex justify-center px-[3.75rem] w-[25%]'>
//                         <div className='flex flex-col gap-6'>
//                             <p className='text-[1.25rem] max-w-[14rem] pb-2.5'>
//                                 Locations
//                             </p>
//                             {locationLinksData.map((item, index) => (
//                                 <LocationLink
//                                     key={index}
//                                     locationName={item.locationName}
//                                     isActive={index === activeIndex}
//                                     onClick={() => setActiveLocation(item.locationName)}
//                                 />
//                             ))}

//                         </div>
//                     </div>
//                     <div className='h-[32rem] flex justify-center px-[3.75rem] w-[28%]'>
//                         <div className='flex flex-col gap-10'>
//                             <div className='pt-14'>
//                                 <p className='text-[1.25rem] max-w-[14rem] pb-3'>
//                                     {gallery.title}
//                                 </p>
//                                 <p className='text-[#FEEAFA]'>{gallery.address}</p>
//                             </div>

//                             <div>
//                                 <p className='text-[1.25rem] max-w-[14rem] pb-3'>Email</p>
//                                 <div className='flex flex-col'>
//                                     {gallery.email.map((item, index) => (
//                                         <Link key={index} className='text-[#FEEAFA]' href={item.href}>
//                                             {item.text}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <p className='text-[1.25rem] max-w-[14rem] pb-3.5'>Phone</p>
//                                 <div className='grid grid-cols-2 gap-0.5'>
//                                     {gallery.phone.map((item, index) => (
//                                         <Link key={index} className='pb-1 text-[#FEEAFA]' href={item.href}>
//                                             {item.text}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 <div className='px-[3.75rem] pt-[3.75rem] flex justify-between items-center'>
//                     <p className='text-[1.875rem] max-w-[40rem] leading-[1.4] font-tan-pearl'>Join our mailing list to get the latest news & updates</p>
//                     <div>
//                         <div className='flex relative'>
//                             <input
//                                 placeholder="Your email"
//                                 className="bg-[#8C357B] w-[29rem] text-white placeholder-[#E489D2] placeholder:italic px-6 py-5 rounded-[20rem] border-none focus:outline-none hover:border-none"
//                             />
//                             <svg className='absolute right-0' style={{ width: '3.7rem', height: '3.7rem' }} width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <rect width="67" height="67" rx="33.5" fill="#7E1F6B" />
//                                 <path d="M23.9961 42.0284L42.0289 23.9956" stroke="white" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                                 <path d="M23.9961 23.9956H42.0289V42.0284" stroke="white" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>

//                         </div>
//                         <div className="flex gap-2 pt-7 items-center justify-center">
//                             <input
//                                 type="checkbox"
//                                 className="w-3 h-3 accent-[#7C2B6D] cursor-pointer border border-[#7C2B6D]"
//                             />
//                             <p className="text-[#D7D7D7] text-[0.8rem]">
//                                 I accept the terms of the Privacy Policy regarding my personal data.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <div className='flex justify-center overflow-hidden py-3.5 bg-[#FFE8FB]'>
//                 <LogoSvg />
//             </div>
//         </div>
//     )
// }
