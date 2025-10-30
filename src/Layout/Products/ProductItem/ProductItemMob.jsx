"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import './ProductItem.css'

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const ProductItemMob = ({ onSelect, products }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef(null);

    const handleClick = (index) => {
        setSelectedIndex(index);
        onSelect(index);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".product-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 50,
                duration: 0.6,
                stagger: 0.2,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pb-[3.125rem] md:pb-[6.25rem] w-full">
            <Swiper
                modules={[Pagination]}
                spaceBetween={15}
                slidesPerView={2}
                slidesOffsetAfter={20}
                slidesOffsetBefore={20}
                pagination={{
                    el: ".swiper-pagination1",
                    clickable: true,
                    dynamicBullets: true, 
                }}
                breakpoints={{
                    425: { slidesPerView: 3, spaceBetween: 15 },
                    600: { slidesPerView: 4, spaceBetween: 15 },
                    767: { slidesPerView: 5, spaceBetween: 15 },
                    1440: { slidesPerView: 5, spaceBetween: 30 },
                }}
                className="productitem"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div
                            onClick={() => handleClick(index)}
                            className={`product-card cursor-pointer border border-[#E9E9E9] rounded-[0.625rem] p-[1.25rem] 
                transition-colors duration-300 group overflow-hidden
                ${selectedIndex === index ? "bg-[#F3F3F3]" : "bg-none"}`}
                        >
                            <Image
                                src={product.img}
                                width={200}
                                height={200}
                                alt={product.label}
                                className="w-full h-auto transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                            <p className="text-center pt-[0.5rem] text-[1rem] md:text-[1.125rem] text-[#1F1F1F]">
                                {product.label}
                            </p>
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
    );
};

export default ProductItemMob;
