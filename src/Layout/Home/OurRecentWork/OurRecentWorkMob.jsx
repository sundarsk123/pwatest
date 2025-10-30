'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/pagination'
import { recent1, recent2, recent3, recent4, recent5 } from '@/Assets/Main/Image'
import OurRecentWork from './OurRecentWork';

const OurRecentWorkMob = ({
    our_recent_works_title,
    our_recent_works
}) => {
    // Data array for recent works
    const recentWorks = [
        {
            id: 1,
            image: recent1,
            title: "Classical Mirror",
            description: "As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style"
        },
        {
            id: 2,
            image: recent2,
            title: "Classic Railing",
            description: "As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style"
        },
        {
            id: 3,
            image: recent3,
            title: "Classic Mural",
            description: "As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style"
        },
        {
            id: 4,
            image: recent4,
            title: "Pooja Door",
            description: "As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style"
        },
        {
            id: 5,
            image: recent5,
            title: "Classic Handle",
            description: "As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style"
        }
    ];

    // State to track active slide index
    const [activeIndex, setActiveIndex] = useState(0);

    // Handle slide change
    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    // Breakpoints configuration
    const breakpointsConfig = {
        0: { slidesPerView: 1.2, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
        352: { slidesPerView: 1.4, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
        575: { slidesPerView: 2.2, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
        768: { slidesPerView: 2.3, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
        992: { slidesPerView: 2.8, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
        1215: { slidesPerView: 1.4, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
        1300: { slidesPerView: 1.7, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
        1440: { slidesPerView: 1.7, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
        1600: { slidesPerView: 4.3, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
    };

    return (
        <div>
            <div className='hidden lg:block'>
                <OurRecentWork 
                our_recent_works_title={our_recent_works_title}
                our_recent_works={our_recent_works}
                 />
            </div>

            <div className='lg:hidden pt-[50px]'>
                <div className='px-[20px] md:px-[60px]'>
                    <h2 className='text-[1.25rem] leading-[1.1]'>{our_recent_works_title}</h2>
                </div>

                <div className='pt-[40px]'>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            el: ".swiper-pagination1",
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        onSlideChange={handleSlideChange}
                        breakpoints={breakpointsConfig}
                        className="ourproduct"
                    >
                        {our_recent_works.map((work, index) => (
                            <SwiperSlide key={work.id}>
                                <div>
                                    <div>
                                        <Image
                                            src={work?.our_recent_works_image?.url}
                                            width={600}
                                            height={600}
                                            alt={work.our_recent_works_image.alt}
                                            className='w-full h-auto'
                                        />
                                    </div>
                                    <div className='pt-[20px] pb-[10px]'>
                                        <span className='text-[1.25rem] leading-[1.2] font-500'>{work.our_recent_works_title}</span>
                                    </div>
                                    <div className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-[100px] opacity-100' : 'max-h-[100px] opacity-0 overflow-hidden'}`}>
                                        <div className='text-[1rem] text-[#6F6F6F] leading-[1.2]' dangerouslySetInnerHTML={{__html:work?.our_recent_works_description}}></div>
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
        </div>
    )
}

export default OurRecentWorkMob