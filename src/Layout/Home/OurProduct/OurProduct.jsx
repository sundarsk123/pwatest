'use client'
"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'
import './OurProduct.css'

// Images
import card1 from '@/Assets/home-page/02.jpg'
import card2 from '@/Assets/Home/product-2.jpg'

gsap.registerPlugin(ScrollTrigger)

const productData = [
    { id: 1, img: card1, title: "Classic Sculpture" },
    { id: 2, img: card2, title: "Classic Door" },
    { id: 3, img: card1, title: "Classic Sculpture" },
    { id: 4, img: card2, title: "Classic Door" },
]

const OurProduct = ({
    our_products_title,
    our_products
}) => {

    const sectionRef = useRef(null)
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
        <div ref={sectionRef} className='md:py-[6.25rem] py-[2rem]'> {/* 100px */}
            {/* Header */}
            <div className='flex justify-between items-center px-[1.25rem] md:px-[3.75rem]'> {/* 60px */}
                <h2 className="text-[#1F1F1F] md:text-[3.125rem] text-[1.25rem] leading-[1.1]">
                    {our_products_title.split("").map((char, i) => (
                        <span
                            key={i}
                            ref={(el) => (headingRefs.current[i] = el)}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h2>
                <div className='cursor-pointer hidden md:flex flex-col items-center gap-[0.3125rem]'> {/* 5px */}
                    {/* <div className='w-[1.25rem] h-[0.125rem] bg-[#9C458B]'></div>  */}
                    <span className='uppercase text-[1.125rem] text-[#9C458B] font-500'>View All</span>
                    <div className='w-full h-[0.125rem] bg-[#9C458B]'></div>
                </div>
            </div>

            {/* Swiper */}
            <div className='md:pt-[5rem] pt-[2.5rem]'> {/* 80px */}
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        el: ".swiper-pagination1",
                        clickable: true,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1.2, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
                        352: { slidesPerView: 1.6, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
                        575: { slidesPerView: 2.6, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
                        768: { slidesPerView: 1.2, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                        992: { slidesPerView: 1.2, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                        1215: { slidesPerView: 1.4, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                        1300: { slidesPerView: 1.7, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                        1440: { slidesPerView: 1.7, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                        1600: { slidesPerView: 2, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                    }}
                    className="ourproduct"
                >
                    {our_products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="relative group rounded-[0.625rem] overflow-hidden"> {/* 10px */}
                                <Image
                                    src={product?.our_products_image?.url}
                                    width={1000}
                                    height={1000}
                                    alt={product?.our_products_image?.alt}
                                    className="w-full h-[20rem] md:h-[38.4375rem] object-cover rounded-[0.625rem] transition-transform duration-500 group-hover:scale-105" /* 679px & 10px */
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-[20px] md:p-[2rem]"> {/* 32px */}
                                    <p className="text-[1.125rem] text-white leading-[1.2] font-500">
                                        {product.our_products_title}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="hidden core-custom-nav lg:block">
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                    <div className="swiper-pagination swiper-pagination1"></div>
                </Swiper>
            </div>
        </div>
    )
}

export default OurProduct
