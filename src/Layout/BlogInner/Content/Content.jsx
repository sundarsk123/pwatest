"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import './Content.css';

import facebook from '@/Assets/Footer/icon-logo-16.svg';
import insta from '@/Assets/Footer/icon-logo-18.svg';
import linkedin from '@/Assets/Footer/icon-logo-19.svg';
import { formatDate } from '@/Components/DataFormat/DataFormat';
import twitter from '@/Assets/Footer/icon-logo-20.svg';


const Content = ({ Projectdata, Allblog }) => {

    const [permalink, setPermalink] = useState('');

    useEffect(() => {
        // Fetch or calculate the permalink dynamically
        const currentUrl = window.location.href;
        setPermalink(currentUrl);
    }, []);

    const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(permalink)}`;


    const twitterShareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(permalink)}`;

    const linkedinShareLink = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(permalink)}`;

    const instagramShareLink = `https://www.instagram.com/create/story?url=${encodeURIComponent(permalink)}`;

    return (
        <div className=' lg:flex justify-between py-[2rem] lg:py-[4rem] lg:px-[3.25rem] px-[20px]'>
            <div className='lg:w-[72%]'>
                <div className='blogcontent font-5' dangerouslySetInnerHTML={{ __html: Projectdata.content.rendered }}></div>
            </div>

            <div className='lg:w-[25%] pt-[50px] lg:pt-0 required:'>
                <div className='lg:sticky lg:top-10'>
                    <div>
                        <h4 className='uppercase text-left text-[1rem]'>Recent Posts</h4>
                    </div>
                    {Allblog.slice(0, 3).map((post, index) => {
                        const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
                        const { day, month, year } = formatDate(post.date);
                        return (
                            <Link href={`/blog/${post.slug}`} className='recent-blog-link' key={index}>
                                <div className='RecentPost'>
                                    <div className='RecentPost-Img-div max-w-[10rem] max-h-[10rem] overflow-hidden rounded-lg'>
                                        <Image
                                            src={featuredImage}
                                            alt={"related"}
                                            width={100}
                                            height={100}
                                            className='recent-post-img w-full h-full'
                                        />
                                    </div>
                                    <div className='recentPost-content-div text-[#000] '>
                                        <p className='recentPost-title '>
                                            {post.title.rendered}
                                        </p>
                                        <p className='recentPost-date ' >
                                            <span className='inline-block mr-2 -mb-[3px]'>
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="black" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_5436_2364)">
                                                        <path d="M10.7107 1.4271H4.29629V0.293676C4.29629 0.0658738 3.89018 -0.123728 3.68433 0.100347C3.65266 0.13482 3.56418 0.297403 3.56418 0.328615V1.4271H1.76881C1.05812 1.4271 0.173715 2.2619 0.0596123 2.96022C-0.0596132 6.33905 0.0437775 9.74024 0.00698566 13.1275C0.0838299 14.0061 0.684612 14.7263 1.54108 14.9406C5.39633 15.0598 9.27207 14.9564 13.1348 14.9932C14.1384 14.9093 14.9162 14.1309 15 13.1275L14.9981 3.25836C14.987 2.43986 14.0625 1.4271 13.2382 1.4271H11.4428V0.328615C11.4428 0.296937 11.3543 0.13482 11.3227 0.100347C11.1168 -0.123728 10.7107 0.0663396 10.7107 0.293676V1.4271ZM14.3014 3.39719C14.3261 3.66412 14.2833 3.9632 14.3014 4.23386L14.2493 4.28604H0.758197L0.706035 4.23386V3.39719C0.706035 2.67046 1.41719 2.09653 2.11624 2.12261L12.9941 2.12494C13.7239 2.17805 14.2339 2.66487 14.3019 3.39719H14.3014ZM14.2493 4.98388L14.3014 5.03606V13.0217C14.3014 13.7484 13.5903 14.3224 12.8912 14.2963L2.04825 14.294C1.37574 14.2991 0.705569 13.7088 0.705569 13.0217V5.03652L0.75773 4.98435H14.2493V4.98388Z" fill="#000" />
                                                        <path d="M11.1046 5.83789H12.4692C12.6631 5.83789 12.8203 5.99515 12.8203 6.18914V6.18961C12.8203 6.3836 12.6631 6.54086 12.4692 6.54086H11.1046C10.9107 6.54086 10.7534 6.3836 10.7534 6.18961V6.18914C10.7534 5.99515 10.9107 5.83789 11.1046 5.83789Z" fill="#000" />
                                                        <path d="M8.29209 5.83789H9.65666C9.85059 5.83789 10.0078 5.99515 10.0078 6.18914V6.18961C10.0078 6.3836 9.85059 6.54086 9.65666 6.54086H8.29209C8.09815 6.54086 7.94093 6.3836 7.94093 6.18961V6.18914C7.94093 5.99515 8.09815 5.83789 8.29209 5.83789Z" fill="#000" />
                                                        <path d="M5.39365 5.83789H6.75822C6.95216 5.83789 7.10938 5.99515 7.10938 6.18914V6.18961C7.10938 6.3836 6.95216 6.54086 6.75822 6.54086H5.39365C5.19971 6.54086 5.0425 6.3836 5.0425 6.18961V6.18914C5.0425 5.99515 5.19971 5.83789 5.39365 5.83789Z" fill="#000" />
                                                        <path d="M5.39365 7.9668H6.75822C6.95216 7.9668 7.10938 8.12406 7.10938 8.31805V8.31852C7.10938 8.51251 6.95216 8.66977 6.75822 8.66977H5.39365C5.19971 8.66977 5.0425 8.51251 5.0425 8.31852V8.31805C5.0425 8.12406 5.19971 7.9668 5.39365 7.9668Z" fill="#000" />
                                                        <path d="M2.51865 7.9668H3.88322C4.07716 7.9668 4.23438 8.12406 4.23438 8.31805V8.31852C4.23438 8.51251 4.07716 8.66977 3.88322 8.66977H2.51865C2.32471 8.66977 2.1675 8.51251 2.1675 8.31852V8.31805C2.1675 8.12406 2.32471 7.9668 2.51865 7.9668Z" fill="#000" />
                                                        <path d="M11.1046 10.0957H12.4692C12.6631 10.0957 12.8203 10.253 12.8203 10.447V10.4474C12.8203 10.6414 12.6631 10.7987 12.4692 10.7987H11.1046C10.9107 10.7987 10.7534 10.6414 10.7534 10.4474V10.447C10.7534 10.253 10.9107 10.0957 11.1046 10.0957Z" fill="#000" />
                                                        <path d="M8.29209 10.0957H9.65666C9.85059 10.0957 10.0078 10.253 10.0078 10.447V10.4474C10.0078 10.6414 9.85059 10.7987 9.65666 10.7987H8.29209C8.09815 10.7987 7.94093 10.6414 7.94093 10.4474V10.447C7.94093 10.253 8.09815 10.0957 8.29209 10.0957Z" fill="#000" />
                                                        <path d="M2.51865 10.0957H3.88322C4.07716 10.0957 4.23438 10.253 4.23438 10.447V10.4474C4.23438 10.6414 4.07716 10.7987 3.88322 10.7987H2.51865C2.32471 10.7987 2.1675 10.6414 2.1675 10.4474V10.447C2.1675 10.253 2.32471 10.0957 2.51865 10.0957Z" fill="#000" />
                                                        <path d="M11.1046 12.2246H12.4692C12.6631 12.2246 12.8203 12.3819 12.8203 12.5759V12.5763C12.8203 12.7703 12.6631 12.9276 12.4692 12.9276H11.1046C10.9107 12.9276 10.7534 12.7703 10.7534 12.5763V12.5759C10.7534 12.3819 10.9107 12.2246 11.1046 12.2246Z" fill="#000" />
                                                        <path d="M5.39365 12.2246H6.75822C6.95216 12.2246 7.10938 12.3819 7.10938 12.5759V12.5763C7.10938 12.7703 6.95216 12.9276 6.75822 12.9276H5.39365C5.19971 12.9276 5.0425 12.7703 5.0425 12.5763V12.5759C5.0425 12.3819 5.19971 12.2246 5.39365 12.2246Z" fill="#000" />
                                                        <path d="M2.51865 12.2246H3.88322C4.07716 12.2246 4.23438 12.3819 4.23438 12.5759V12.5763C4.23438 12.7703 4.07716 12.9276 3.88322 12.9276H2.51865C2.32471 12.9276 2.1675 12.7703 2.1675 12.5763V12.5759C2.1675 12.3819 2.32471 12.2246 2.51865 12.2246Z" fill="#000" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5436_2364">
                                                            <rect width="15" height="15" fill="white" transform="matrix(-1 0 0 1 15 0)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                            <span>
                                                {day} {month}, {year}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}


                    <div className='flex justify-between border-x-0 border-t-0 border-b border-[#a7a7a7] py-6 px-5 '>
                        <p className='uppercase text-[18px] text-[#000] font-medium'>share</p>
                        <div className='flex gap-3'>
                            <Link href={facebookShareLink} target='_blank' aria-label="social media link 1">
                                <Image src={facebook} alt="social media" width={25} height={25} />
                            </Link>
                            <Link href={instagramShareLink} target='_blank' aria-label="social media link 1">
                                <Image src={insta} alt="social media" width={25} height={25} />
                            </Link>
                            <Link href={linkedinShareLink} target='_blank' aria-label="social media link 2">
                                <Image src={linkedin} alt="social media" width={25} height={25} />
                            </Link>
                            <Link href={twitterShareLink} target='_blank' aria-label="social media link 3">
                                <Image src={twitter} alt="social media" width={25} height={25} />
                            </Link>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Content




// import './Content.css';

// import facebook from '@/Assets/Footer/icon-logo-16.svg';
// import insta from '@/Assets/Footer/icon-logo-18.svg';
// import linkedin from '@/Assets/Footer/icon-logo-19.svg';
// import twitter from '@/Assets/Footer/icon-logo-20.svg';