'use client'
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Pagination , Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import './RecentProject.css';

import slide1 from '@/Assets/Home/slide-1.png';
import slide2 from '@/Assets/Home/slide-2.png';
import slide3 from '@/Assets/Home/slide-3.png';
import slide4 from '@/Assets/Home/slide-4.png';
import { video1 } from "@/Assets/Main/Image";

const slides = [
    { id: 1, image: slide1, title: "Arulmigu Vadapalani<br/> Temple Project", videoId: "VOrOnxblOP4", videosrc: '/Video/video5.mp4' },
    { id: 2, image: slide2, title: "Christhu Jyothi Prayer Hall<br/> in hyderabad", videoId: "VOrOnxblOP4", videosrc: '/Video/video4.mp4' },
    { id: 3, image: slide3, title: "Surya Kund in the Heart<br/> of Ayodhya", videoId: "VOrOnxblOP4", videosrc: '/Video/video3.mp4' },
    { id: 4, image: slide4, title: "Christhu Jyothi Prayer Hall<br/> in chennai", videoId: "VOrOnxblOP4", videosrc: '/Video/video2.mp4' },
    { id: 5, image: slide1, title: "Surya Kund in the Heart<br/> of Ayodhya", videoId: "VOrOnxblOP4", videosrc: '/Video/video5.mp4' },
    { id: 6, image: slide2, title: "Christhu Jyothi Prayer Hall<br/> in chennai", videoId: "VOrOnxblOP4", videosrc: '/Video/video1.mp4' },
];

const RecentProject = ({
    portfolio
}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [muted, setMuted] = useState(false);
    const videoRefs = useRef([]);
    const modalRef = useRef(null);

    const closeModal = () => {
        setSelectedIndex(null);
        setMuted(true);
    };

    const toggleMute = () => {
        setMuted(!muted);
    };

    return (
        <div className="md:py-[6.25rem] py-[2rem]">
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
                    768: { slidesPerView: 3.2, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                    992: { slidesPerView: 3.2, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                    1215: { slidesPerView: 3.2, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                    1300: { slidesPerView: 3.2, slidesOffsetAfter: 60, slidesOffsetBefore: 60, spaceBetween: 30 },
                    1440: { slidesPerView: 4.15, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                    1600: { slidesPerView: 4.3, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
                }}
                className="recentproject"
            >
                {portfolio.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative group overflow-hidden rounded-[0.625rem] bg-[#DEBCD74D] cursor-pointer"
                            onClick={() => setSelectedIndex(index)} // open modal on click
                        >
                            {/* {hoveredId === slide.id ? (
                                <iframe
                                    width="100%"
                                    height="608"
                                    src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${slide.videoId}`}
                                    title="YouTube video preview"
                                    allow="autoplay; encrypted-media"
                                ></iframe>
                            ) : (
                                <Image
                                    src={slide.image}
                                    width={600}
                                    height={600}
                                    alt={slide.title}
                                    className="w-full h-[38rem] object-cover rounded-[0.625rem] transition-transform duration-500 group-hover:scale-105"
                                />
                            )} */}
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={slide.portfolio_video} type="video/mp4" />
                            </video>
                            <div className="absolute bottom-0 left-0 right-0 p-[1.25rem] z-10 bg-gradient-to-b from-transparent to-black">
                                <p
                                    className="text-[1.125rem] text-white leading-[1.2] font-medium"
                                    dangerouslySetInnerHTML={{ __html: slide.portfolio_name }}
                                ></p>
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

            {/* Popup Modal */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black/80 z-[102] flex items-center justify-center px-4 w-full">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-50 text-white text-3xl cursor-pointer"
                    >
                        ✕
                    </button>
                    <div ref={modalRef} className=" w-full max-w-5xl">
                        <Swiper
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            modules={[Navigation]}
                            initialSlide={selectedIndex}
                            centeredSlides
                            breakpoints={{
                                0: { slidesPerView: 1, spaceBetween: 20 },
                                575: { slidesPerView: 1, spaceBetween: 20 },
                                992: { slidesPerView: 2, spaceBetween: 20 },
                                1215: { slidesPerView: 2, spaceBetween: 30 },
                                1440: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            className="w-full popup-swiper rounded-3xl"
                        >
                            {portfolio.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center justify-center h-[80vh] rounded-[1.5rem]">
                                        <div className="w-full">
                                            <video
                                                ref={(el) => (videoRefs.current[index] = el)}
                                                src={slide.portfolio_video}
                                                autoPlay
                                                loop
                                                muted={index !== activeIndex || muted}
                                                playsInline
                                                className={`rounded-3xl object-cover w-full transition-all duration-300 ${index === activeIndex ? "h-[80vh]" : "h-[70vh]"
                                                    }`}
                                            />
                                            {selectedIndex !== null && index === activeIndex && (
                                                <button
                                                    onClick={toggleMute}
                                                    className="absolute top-4 right-5 z-50 text-white text-2xl cursor-pointer"
                                                >
                                                    {muted ? (
                                                        <img src="/volume-down-03.svg" alt="Muted" className="w-[40px] h-[40px]" />
                                                    ) : (
                                                        <img src="/volume-down-02.svg" alt="Unmuted" className="w-[40px] h-[40px]" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="certificates hidden md:flex justify-between px-[3rem]">
                            <div className="swiper-button-prev cursor-pointer"></div>
                            <div className="swiper-button-next cursor-pointer"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentProject;



























// 'use client'
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import Image from "next/image";
// import { Pagination } from 'swiper/modules';
// import 'swiper/css/pagination';
// import './RecentProject.css';

// import slide1 from '@/Assets/Home/slide-1.png';
// import slide2 from '@/Assets/Home/slide-2.png';
// import slide3 from '@/Assets/Home/slide-3.png';
// import slide4 from '@/Assets/Home/slide-4.png';
// import { video1 } from "@/Assets/Main/Image";

// const slides = [
//     { id: 1, image: slide1, title: "Arulmigu Vadapalani<br/> Temple Project", videoId: "VOrOnxblOP4" , videosrc : '/Video/video5.mp4' },
//     { id: 2, image: slide2, title: "Christhu Jyothi Prayer Hall<br/> in hyderabad", videoId: "VOrOnxblOP4", videosrc : '/Video/video4.mp4' },
//     { id: 3, image: slide3, title: "Surya Kund in the Heart<br/> of Ayodhya", videoId: "VOrOnxblOP4", videosrc : '/Video/video3.mp4' },
//     { id: 4, image: slide4, title: "Christhu Jyothi Prayer Hall<br/> in chennai", videoId: "VOrOnxblOP4", videosrc : '/Video/video2.mp4' },
//     { id: 5, image: slide1, title: "Surya Kund in the Heart<br/> of Ayodhya", videoId: "VOrOnxblOP4", videosrc : '/Video/video5.mp4' },
//     { id: 6, image: slide2, title: "Christhu Jyothi Prayer Hall<br/> in chennai", videoId: "VOrOnxblOP4", videosrc : '/Video/video1.mp4' },
// ];

// const RecentProject = () => {
//     const [hoveredId, setHoveredId] = useState(null);

//     return (
//         <div className="py-[6.25rem]">
//             <Swiper
//                 modules={[Pagination]}
//                 pagination={{
//                     el: ".swiper-pagination1",
//                     clickable: true,
//                 }}
//                 breakpoints={{
//                     0: { slidesPerView: 1.2, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
//                     352: { slidesPerView: 1.6, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
//                     575: { slidesPerView: 2.6, spaceBetween: 20, slidesOffsetAfter: 20, slidesOffsetBefore: 20 },
//                     768: { slidesPerView: 3.2, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
//                     992: { slidesPerView: 3.2, spaceBetween: 20, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
//                     1215: { slidesPerView: 3.2, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
//                     1300: { slidesPerView: 3.2, slidesOffsetAfter: 60, slidesOffsetBefore: 60, spaceBetween: 30 },
//                     1440: { slidesPerView: 4.15, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
//                     1600: { slidesPerView: 4.3, spaceBetween: 30, slidesOffsetAfter: 60, slidesOffsetBefore: 60 },
//                 }}
//                 className="recentproject"
//             >
//                 {slides.map((slide) => (
//                     <SwiperSlide key={slide.id}>
//                         <div
//                             className="relative group overflow-hidden rounded-[0.625rem] bg-[#DEBCD74D] cursor-pointer"
//                             onMouseEnter={() => setHoveredId(slide.id)}
//                             onMouseLeave={() => setHoveredId(null)}
//                         >
//                             {/* {hoveredId === slide.id ? (
//                                 <iframe
//                                     width="100%"
//                                     height="608"
//                                     src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${slide.videoId}`}
//                                     title="YouTube video preview"
//                                     allow="autoplay; encrypted-media"
//                                 ></iframe>
//                             ) : (
//                                 <Image
//                                     src={slide.image}
//                                     width={600}
//                                     height={600}
//                                     alt={slide.title}
//                                     className="w-full h-[38rem] object-cover rounded-[0.625rem] transition-transform duration-500 group-hover:scale-105"
//                                 />
//                             )} */}
//                             <video
//                                 autoPlay
//                                 loop
//                                 muted
//                                 playsInline
//                                 className="w-full h-full object-cover"
//                             >
//                                 <source src={slide.videosrc} type="video/mp4" />
//                             </video>
//                             <div className="absolute bottom-0 left-0 right-0 p-[1.25rem] z-10 bg-gradient-to-b from-transparent to-black">
//                                 <p
//                                     className="text-[1.125rem] text-white leading-[1.2] font-medium"
//                                     dangerouslySetInnerHTML={{ __html: slide.title }}
//                                 ></p>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//                 <div className="hidden core-custom-nav lg:block">
//                     <div className="swiper-button-prev"></div>
//                     <div className="swiper-button-next"></div>
//                 </div>
//                 <div className="swiper-pagination swiper-pagination1"></div>
//             </Swiper>
//         </div>
//     );
// };

// export default RecentProject;
