'use client'

import { introImg } from '@/Assets/Main/Image'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Intro({
  banner_tag , 
  banner_title,
  banner_image,
  banner_description
}) {
  const subRef = useRef(null)
  const headingRef = useRef(null)
  const paraRef = useRef(null)
  
  // Data
  const introData = {
    Artisticksimg: banner_image?.url || introImg ,
    SubHeading: banner_tag,
    Heading: banner_title,
    paragh:banner_description,
  }

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // SubHeading fade + luxury spacing
    tl.fromTo(
      subRef.current,
      { opacity: 0, letterSpacing: "0.1em", filter: "blur(2px)" },
      { opacity: 1, letterSpacing: "0em", filter: "blur(0px)", duration: 0.8, ease: "expo.out" }
    )

    // Heading luxury wipe (no split, just clip-path)
    tl.fromTo(
      headingRef.current,
      { 
        clipPath: "inset(0 100% 0 0)", 
        opacity: 0, 
        y: 20, 
        filter: "blur(3px)" 
      },
      { 
        clipPath: "inset(0 0% 0 0)", 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 1.2, 
        ease: "power4.out" 
      },
      "-=0.5"
    )

    // Paragraph fade-in luxury
    tl.fromTo(
      paraRef.current,
      { opacity: 0, y: 20, filter: "blur(2px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out" },
      "-=0.8"
    )
  }, [])

  return (
    <div className="w-full h-[100svh] lg:h-screen relative overflow-hidden">
      <Image
        src={introData.Artisticksimg}
        alt="Artisticks Intro"
        width={1500}
        height={1500}
        className="w-full h-screen object-cover bg-[#F5F5F5]"
        priority={true}
        quality={100}
      />

      <div className="absolute bottom-[2rem] lg:bottom-0 lg:left-[3rem] text-white px-[1.25rem]">
        <span
          ref={subRef}
          className="font-tan-pearl lg:text-[3rem] inline-block opacity-0"
        >
          {introData.SubHeading}
        </span>

        <div className="lg:flex items-center gap-[1rem]">
          <h1
            ref={headingRef}
            className="min-[1024px]:text-[4rem] min-[1034px]:text-[5rem] xl:text-[7rem] text-[3rem] pt-1.5 block opacity-0"
          >
            {introData.Heading}
          </h1>

          <span
            ref={paraRef}
            className="md:max-w-[28rem] lg:max-w-[22rem] lg:pt-5 xl:pt-10 block opacity-0"
            dangerouslySetInnerHTML={{__html : introData.paragh}}
          >
          </span>
        </div>
      </div>
    </div>
  )
}






















// import { introImg } from '@/Assets/Main/Image'
// import Image from 'next/image'
// import React from 'react'

// export default function Intro() {

//     const introData = {
//         Artisticksimg: introImg,
//         SubHeading: "Decorative",
//         Heading: "wall mirror",
//         paragh: "Sumukhi is a word derived from the ancient language of Sanskrit that relates to objects with an essence of reflection and beauty."
//     }
//     return (
//         <div className='w-full h-[90vh] lg:h-screen relative'>
//             <Image
//                 src={introData.Artisticksimg}
//                 alt='Artisticks Intro'
//                 width={1500}
//                 height={1500}
//                 className='w-full h-screen object-cover'
//                 priority={true}
//                 loading='eager'
//                 quality={100}
//                 sizes='(max-width: 768px) 100vw, 100vw'
//                 fetchPriority='high'
//                 decoding='async'
//             />
//             <div className='absolute -bottom-[0rem] lg:left-[3rem] text-white px-[1.25rem]'>
//                 <span className='font-tan-pearl lg:text-[3rem]'>{introData.SubHeading}</span>
//                 <div className='lg:flex items-center gap-[1rem]'>
//                     <h1 className='lg:text-[5rem] xl:text-[8rem] text-[3rem] pt-1.5'>{introData.Heading}</h1>
//                     <span className='lg:max-w-[22rem] pt-10'>{introData.paragh}</span>
//                 </div>
//             </div>
//         </div>
//     )
// }
