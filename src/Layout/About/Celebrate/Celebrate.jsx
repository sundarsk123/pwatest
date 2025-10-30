'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import light from '@/Assets/About/light.png'
import year from '@/Assets/About/design/ANI.png'
import numimg from '@/Assets/About/design/36.png'
import leftdesign from '@/Assets/About/leftdesign.png'
import rightdesign from '@/Assets/About/rightdesign.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Celebrate = ({
  banner_description,
  celebrating_title,
  anniversary_year_float_text,
  anniversary_year,
  anniversary_year_title
}) => {
  const sectionRef = useRef(null)
  const lightRef = useRef(null)
  const leftDesignRef = useRef(null)
  const rightDesignRef = useRef(null)
  const sectionRef1 = useRef(null)
  const sectionRef2 = useRef(null)

  // new refs for bottom-to-top content
  const contentRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Light image clip-path reveal
      gsap.fromTo(
        lightRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Left design image
       ScrollTrigger.matchMedia({
      // Desktop only (min-width: 1024px)
      "(min-width: 1024px)": function () {
        gsap.from(leftDesignRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef1.current,
            start: 'top 80%',
            end: 'bottom 50%',
            toggleActions: 'play none none reverse',
          },
        })
      },
    })
      // Right design image
      ScrollTrigger.matchMedia({
      // ✅ Animation runs only on desktop screens
      "(min-width: 1024px)": function () {
        gsap.from(rightDesignRef.current, {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef2.current,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          },
        });
      },
    });

      // Bottom-to-top animation for main content
      gsap.from(contentRefs.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className='bg-[#0F0601] rounded-b-full pb-[7.5rem] md:pb-[10rem] mb-[3.75rem] relative'
    >
      <div className='py-[1.5rem] md:py-[2.5rem]'>
        <Image
          ref={lightRef}
          src={light}
          width={300}
          height={300}
          alt='light'
          className='w-[5rem] h-[10rem] md:w-[7.125rem] md:h-[13.125rem] mx-auto'
        />
      </div>

      {/* Content with bottom-to-top animation */}
      <div
        ref={(el) => (contentRefs.current[0] = el)}
        className='max-w-[45rem] mx-auto  px-[20px] md:px-[60px] lg:px-0'
      >
        <div className='text-[1rem] md:text-[1.5rem] leading-[1.2] text-[#ffffff]/70 text-center' dangerouslySetInnerHTML={{__html:banner_description}}>
          
        </div>
      </div>

      <div
        ref={(el) => (contentRefs.current[1] = el)}
        className='text-center md:-mt-[1.3rem]'
      >
        <span className='md:text-[10rem] text-[3rem]  font-MiamiSunday text-white'>
          {celebrating_title}
        </span>
      </div>

      <div ref={(el) => (contentRefs.current[2] = el)}>
        <div className='flex justify-center md:-mt-[2.5rem]'>
          <div className='relative'>
            <Image
              src={anniversary_year.url}
              width={400}
              height={400}
              alt={anniversary_year.alt}
              className='w-[12rem] h-auto lg:w-[24rem] lg:h-auto'
            />
            <sub className='text-[#BC8856] text-[1rem] absolute top-[18%] right-[17%] md:right-[20%]'>
              {anniversary_year_float_text}
            </sub>
          </div>
        </div>
        <div className='-mt-[1.5rem] md:mt-[-2.8rem]'>
          <Image
            ref={(el) => (contentRefs.current[3] = el)}
            src={anniversary_year_title.url}
            width={400}
            height={400}
            alt={anniversary_year_title.alt}
            className='mx-auto w-full h-auto md:w-[27.25rem] md:h-[6.6rem]'
          />
        </div>
      </div>

      {/* Left design */}
      <div ref={sectionRef1} className='absolute bottom-0 lg:bottom-[11%] left-[7%]'>
        <Image
          ref={leftDesignRef}
          src={leftdesign}
          width={300}
          height={300}
          alt=''
          className='w-[4rem] md:w-[8rem] lg:w-[10.625rem] lg:h-[23.5625rem] -rotate-30 object-cover'
        />
      </div>

      {/* Right design */}
      <div ref={sectionRef2} className='absolute bottom-[-1%] md:bottom-0 right-[10%] lg:right-[13%]'>
        <Image
          ref={rightDesignRef}
          src={rightdesign}
          width={300}
          height={300}
          alt=''
          className='w-[3.8rem] md:w-[8rem] lg:w-full lg:h-[23.5625rem] rotate-48 object-cover'
        />
      </div>
    </div>
  )
}

export default Celebrate
