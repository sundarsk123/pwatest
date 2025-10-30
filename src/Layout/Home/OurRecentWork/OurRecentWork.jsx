'use client'

import { recent1, recent2, recent3, recent4, recent5 } from '@/Assets/Main/Image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OurRecentWork({
  our_recent_works,
  our_recent_works_title
}) {
  const cardsRef = useRef([])


  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index]
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const moveX = (x - rect.width / 2) / 20
    const moveY = (y - rect.height / 2) / 20

    gsap.to(card.querySelector('img'), {
      x: moveX,
      y: moveY,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index]
    gsap.to(card.querySelector('img'), {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

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

  const cards = [
    { img: recent1, title: 'Classical Mirror', desc: 'Classical mirrors represent an exemplary traditional and timeless style.' },
    { img: recent2, title: 'Classic Railing', desc: 'Elegant railing designs that blend durability with aesthetics.' },
    { img: recent5, title: 'Classic Mural', desc: 'Murals that bring walls to life with cultural and modern art.' },
    { img: recent3, title: 'Pooja Door', desc: 'Intricately designed doors that reflect tradition and spirituality.' },
    { img: recent4, title: 'Classic Handle', desc: 'Premium handles crafted with style and long-lasting finish.' },
  ]

  return (
    <div ref={sectionRef} className="px-[3.75rem] lg:h-[80rem] xl:h-auto lg:py-[6.25rem]">
      <div className="flex justify-between">
        {/* left card */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer group"
          onMouseMove={(e) => handleMouseMove(e, 0)}
          onMouseLeave={() => handleMouseLeave(0)}
        >
          <Image
            src={our_recent_works[0].our_recent_works_image.url}
            alt={cards[0].title}
            width={600}
            height={600}
            className="xl:w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
          />
          <p className="py-2 font-[700] text-[1.25rem]">{our_recent_works[0].our_recent_works_title}</p>
          {/* Always show desc for first card */}
          <div className="opacity-100 translate-y-0" dangerouslySetInnerHTML={{__html:our_recent_works[0].our_recent_works_description}}></div>
        </div>

        {/* center text */}
        <div className="text-center flex flex-col gap-5 items-center pt-[5rem] sticky top-[10rem] h-fit z-40">
        <h2 className="text-[#1F1F1F] xl:text-[3.125rem] text-[2.125rem] leading-[1.1]">
        {our_recent_works_title.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (headingRefs.current[i] = el)}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
          <Link
            href={'/our-works'}
            className="text-[#9C458B] flex items-center gap-2 border-b-2 border-[#9C458B] pb-1"
          >
            <span className=''>SEE ALL WORKS</span>
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3799_334)">
                  <path d="M1.08984 10.9246L10.9259 1.0885" stroke="#9C458B" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.08984 1.0885H10.9259V10.9246" stroke="#9C458B" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_3799_334">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </Link>
        </div>

        {/* right card */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer mt-[52rem] group relative z-30"
          onMouseMove={(e) => handleMouseMove(e, 1)}
          onMouseLeave={() => handleMouseLeave(1)}
        >
          <Image
            src={our_recent_works[1].our_recent_works_image.url}
            alt={cards[1].title}
            width={600}
            height={600}
            className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
          />
          <p className="py-2 font-[700] text-[1.25rem]">{our_recent_works[1].our_recent_works_title}</p>
          {/* Show only on hover */}
          <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" dangerouslySetInnerHTML={{__html:our_recent_works[1].our_recent_works_description}}>
           
          </div>
        </div>
      </div>

      {/* center card */}
      <div className="flex justify-center -mt-[54rem] relative z-50">
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer group bg-white"
          onMouseMove={(e) => handleMouseMove(e, 2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          <Image
            src={our_recent_works[2].our_recent_works_image.url}
            alt={cards[2].title}
            width={600}
            height={600}
            className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
          />
          <p className="py-2 font-[700] text-[1.25rem]">{our_recent_works[2].our_recent_works_title}</p>
          <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" dangerouslySetInnerHTML={{__html:our_recent_works[2].our_recent_works_description}}>
            
          </div>
        </div>
      </div>

      {/* bottom cards */}
      <div className="flex justify-between  relative ">
        <div
          ref={(el) => (cardsRef.current[3] = el)}
          className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer -mt-[10rem] group"
          onMouseMove={(e) => handleMouseMove(e, 3)}
          onMouseLeave={() => handleMouseLeave(3)}
        >
          <Image
            src={our_recent_works[3].our_recent_works_image.url}
            alt={cards[3].title}
            width={600}
            height={600}
            className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
          />
          <p className="py-2 font-[700] text-[1.25rem]">{our_recent_works[3].our_recent_works_title}</p>
          <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" dangerouslySetInnerHTML={{__html:our_recent_works[3].our_recent_works_description}}>
            
          </div>
        </div>

        <div
          ref={(el) => (cardsRef.current[4] = el)}
          className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer group -mt-[54rem] relative " 
          onMouseMove={(e) => handleMouseMove(e, 4)}
          onMouseLeave={() => handleMouseLeave(4)}
        >
          <Image
            src={our_recent_works[4].our_recent_works_image.url}
            alt={cards[4].title}
            width={600}
            height={600}
            className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
          />
          <p className="py-2 font-[700] text-[1.25rem]">{our_recent_works[4].our_recent_works_title}</p>
          <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" dangerouslySetInnerHTML={{__html:our_recent_works[4].our_recent_works_description}}>
            
          </div>
        </div>
      </div>
    </div>
  )
}


















































// 'use client'

// import { recent1, recent2, recent3, recent4, recent5 } from '@/Assets/Main/Image'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function OurRecentWork() {
//   const cardsRef = useRef([])
//   useEffect(() => {
//     // Animate cards one by one on scroll
//     gsap.fromTo(
//       cardsRef.current,
//       { height: 0, opacity: 0, y: 50 },
//       {
//         height: 'auto',
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: 'power3.out',
//         stagger: 0.3,
//         scrollTrigger: {
//           trigger: cardsRef.current[0], // start from first card
//           start: 'top 80%', // when cards enter viewport
//         },
//       }
//     )
//   }, [])


//   const handleMouseMove = (e, index) => {
//     const card = cardsRef.current[index]
//     const rect = card.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top
//     const moveX = (x - rect.width / 2) / 20
//     const moveY = (y - rect.height / 2) / 20

//     gsap.to(card.querySelector('img'), {
//       x: moveX,
//       y: moveY,
//       scale: 1,
//       duration: 0.4,
//       ease: 'power2.out',
//     })
//   }

//   const handleMouseLeave = (index) => {
//     const card = cardsRef.current[index]
//     gsap.to(card.querySelector('img'), {
//       x: 0,
//       y: 0,
//       scale: 1,
//       duration: 0.6,
//       ease: 'power3.out',
//     })
//   }

//   const cards = [
//     { img: recent1, title: 'Classical Mirror', desc: 'Classical mirrors represent an exemplary traditional and timeless style.' },
//     { img: recent2, title: 'Classic Railing', desc: 'Elegant railing designs that blend durability with aesthetics.' },
//     { img: recent5, title: 'Classic Mural', desc: 'Murals that bring walls to life with cultural and modern art.' },
//     { img: recent3, title: 'Pooja Door', desc: 'Intricately designed doors that reflect tradition and spirituality.' },
//     { img: recent4, title: 'Classic Handle', desc: 'Premium handles crafted with style and long-lasting finish.' },
//   ]

//   return (
//     <div className="px-[3.75rem] xl:h-[100rem] xl:py-[6.25rem]">
//       <div className="flex justify-between">
//         {/* left card */}
//         <div
//           ref={(el) => (cardsRef.current[0] = el)}
//           className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer group"
//           onMouseMove={(e) => handleMouseMove(e, 0)}
//           onMouseLeave={() => handleMouseLeave(0)}
//         >
//           <Image
//             src={cards[0].img}
//             alt={cards[0].title}
//             width={600}
//             height={600}
//             className="xl:w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
//           />
//           <p className="py-2 font-[700] text-[1.25rem]">{cards[0].title}</p>
//           {/* Always show desc for first card */}
//           <p className="opacity-100 translate-y-0">{cards[0].desc}</p>
//         </div>

//         {/* center text */}
//         <div className="text-center flex flex-col gap-5 items-center pt-[5rem] ">
//           <h3 className="text-[#1F1F1F] xl:text-[3.125rem] text-[2.125rem]">Our recent works</h3>
//           <Link
//             href={''}
//             className="text-[#9C458B] flex items-center gap-2 border-b-2 border-[#9C458B] pb-1"
//           >
//             <span>SEE ALL WORKS</span>
//             <span>
//               <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <g clipPath="url(#clip0_3799_334)">
//                   <path d="M1.08984 10.9246L10.9259 1.0885" stroke="#9C458B" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M1.08984 1.0885H10.9259V10.9246" stroke="#9C458B" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_3799_334">
//                     <rect width="12" height="12" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//           </Link>
//         </div>

//         {/* right card */}
//         <div
//           ref={(el) => (cardsRef.current[1] = el)}
//           className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer pt-[12rem] group"
//           onMouseMove={(e) => handleMouseMove(e, 1)}
//           onMouseLeave={() => handleMouseLeave(1)}
//         >
//           <Image
//             src={cards[1].img}
//             alt={cards[1].title}
//             width={600}
//             height={600}
//             className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
//           />
//           <p className="py-2 font-[700] text-[1.25rem]">{cards[1].title}</p>
//           {/* Show only on hover */}
//           <p className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//             {cards[1].desc}
//           </p>
//         </div>
//       </div>

//       {/* center card */}
//       <div className="flex justify-center -mt-[14rem]">
//         <div
//           ref={(el) => (cardsRef.current[2] = el)}
//           className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer group"
//           onMouseMove={(e) => handleMouseMove(e, 2)}
//           onMouseLeave={() => handleMouseLeave(2)}
//         >
//           <Image
//             src={cards[2].img}
//             alt={cards[2].title}
//             width={600}
//             height={600}
//             className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
//           />
//           <p className="py-2 font-[700] text-[1.25rem]">{cards[2].title}</p>
//           <p className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//             {cards[2].desc}
//           </p>
//         </div>
//       </div>

//       {/* bottom cards */}
//       <div className="flex justify-between">
//         <div
//           ref={(el) => (cardsRef.current[3] = el)}
//           className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer -mt-[10rem] group"
//           onMouseMove={(e) => handleMouseMove(e, 3)}
//           onMouseLeave={() => handleMouseLeave(3)}
//         >
//           <Image
//             src={cards[3].img}
//             alt={cards[3].title}
//             width={600}
//             height={600}
//             className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
//           />
//           <p className="py-2 font-[700] text-[1.25rem]">{cards[3].title}</p>
//           <p className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//             {cards[3].desc}
//           </p>
//         </div>

//         <div
//           ref={(el) => (cardsRef.current[4] = el)}
//           className="xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer group"
//           onMouseMove={(e) => handleMouseMove(e, 4)}
//           onMouseLeave={() => handleMouseLeave(4)}
//         >
//           <Image
//             src={cards[4].img}
//             alt={cards[4].title}
//             width={600}
//             height={600}
//             className="w-[22rem] h-auto object-cover transition-transform duration-500 ease-out"
//           />
//           <p className="py-2 font-[700] text-[1.25rem]">{cards[4].title}</p>
//           <p className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//             {cards[4].desc}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }



































// 'use client'

// import { recent1, recent2, recent3, recent4, recent5 } from '@/Assets/Main/Image'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function OurRecentWork() {
//   const cardsRef = useRef([])

//   useEffect(() => {
//     // Animate cards one by one on scroll
//     gsap.fromTo(
//       cardsRef.current,
//       { height: 0, opacity: 0, y: 50 },
//       {
//         height: 'auto',
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: 'power3.out',
//         stagger: 0.3,
//         scrollTrigger: {
//           trigger: cardsRef.current[0], // start from first card
//           start: 'top 80%', // when cards enter viewport
//         },
//       }
//     )
//   }, [])

//   const handleMouseMove = (e, index) => {
//     const card = cardsRef.current[index]
//     const rect = card.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top
//     const moveX = (x - rect.width / 2) / 20
//     const moveY = (y - rect.height / 2) / 20

//     gsap.to(card.querySelector('img'), {
//       x: moveX,
//       y: moveY,
//       scale: 1.03, // scale 3%
//       duration: 0.4,
//       ease: 'power2.out',
//     })
//   }

//   const handleMouseLeave = (index) => {
//     const card = cardsRef.current[index]
//     gsap.to(card.querySelector('img'), {
//       x: 0,
//       y: 0,
//       scale: 1,
//       duration: 0.6,
//       ease: 'power3.out',
//     })
//   }

//   const cards = [
//     { img: recent1, title: 'Classical Mirror', desc: 'As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style' },
//     { img: recent2, title: 'Classic Railing' },
//     { img: recent5, title: 'Classic Mural' },
//     { img: recent3, title: 'Pooja Door' },
//     { img: recent4, title: 'Classic Handle' },
//   ]

//   return (
//     <div className='px-[3.75rem] xl:h-[90rem]'>
//       <div className='flex justify-between'>
//         <div
//           ref={(el) => (cardsRef.current[0] = el)}
//           className='xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer'
//           onMouseMove={(e) => handleMouseMove(e, 0)}
//           onMouseLeave={() => handleMouseLeave(0)}
//         >
//           <Image
//             src={cards[0].img}
//             alt={cards[0].title}
//             width={600}
//             height={600}
//             className='xl:w-[22rem] h-auto object-cover transition-transform duration-500 ease-out'
//           />
//           <p className='py-2 font-[700] text-[1.25rem]'>{cards[0].title}</p>
//           <p>{cards[0].desc}</p>
//         </div>

//         {/* center text */}
//         <div className='text-center flex flex-col gap-5 items-center pt-[5rem]'>
//           <h3 className='text-[#1F1F1F] xl:text-[3.125rem] text-[2.125rem]'>Our recent works</h3>
//           <Link
//             href={''}
//             className='text-[#9C458B] flex items-center gap-2 border-b-2 border-[#9C458B] pb-1'
//           >
//             <span>SEE ALL WORKS</span>
//             <span>
//               <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                 <g clipPath='url(#clip0_3799_334)'>
//                   <path d='M1.08984 10.9246L10.9259 1.0885' stroke='#9C458B' strokeWidth='1.65' strokeLinecap='round' strokeLinejoin='round' />
//                   <path d='M1.08984 1.0885H10.9259V10.9246' stroke='#9C458B' strokeWidth='1.65' strokeLinecap='round' strokeLinejoin='round' />
//                 </g>
//                 <defs>
//                   <clipPath id='clip0_3799_334'>
//                     <rect width='12' height='12' fill='white' />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//           </Link>
//         </div>

//         <div
//           ref={(el) => (cardsRef.current[1] = el)}
//           className='xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer pt-[12rem]'
//           onMouseMove={(e) => handleMouseMove(e, 1)}
//           onMouseLeave={() => handleMouseLeave(1)}
//         >
//           <Image
//             src={cards[1].img}
//             alt={cards[1].title}
//             width={600}
//             height={600}
//             className='w-[22rem] h-auto object-cover transition-transform duration-500 ease-out'
//           />
//           <p className='py-2 font-[700] text-[1.25rem]'>{cards[1].title}</p>
//         </div>
//       </div>

//       {/* center card */}
//       <div className='flex justify-center -mt-[14rem]'>
//         <div
//           ref={(el) => (cardsRef.current[2] = el)}
//           className='xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer'
//           onMouseMove={(e) => handleMouseMove(e, 2)}
//           onMouseLeave={() => handleMouseLeave(2)}
//         >
//           <Image
//             src={cards[2].img}
//             alt={cards[2].title}
//             width={600}
//             height={600}
//             className='w-[22rem] h-auto object-cover transition-transform duration-500 ease-out'
//           />
//           <p className='py-2 font-[700] text-[1.25rem]'>{cards[2].title}</p>
//         </div>
//       </div>

//       {/* bottom cards */}
//       <div className='flex justify-between'>
//         <div
//           ref={(el) => (cardsRef.current[3] = el)}
//           className='xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer -mt-[10rem]'
//           onMouseMove={(e) => handleMouseMove(e, 3)}
//           onMouseLeave={() => handleMouseLeave(3)}
//         >
//           <Image
//             src={cards[3].img}
//             alt={cards[3].title}
//             width={600}
//             height={600}
//             className='w-[22rem] h-auto object-cover transition-transform duration-500 ease-out'
//           />
//           <p className='py-2 font-[700] text-[1.25rem]'>{cards[3].title}</p>
//         </div>

//         <div
//           ref={(el) => (cardsRef.current[4] = el)}
//           className='xl:max-w-[22rem] max-w-[15rem] overflow-hidden cursor-pointer'
//           onMouseMove={(e) => handleMouseMove(e, 4)}
//           onMouseLeave={() => handleMouseLeave(4)}
//         >
//           <Image
//             src={cards[4].img}
//             alt={cards[4].title}
//             width={600}
//             height={600}
//             className='w-[22rem] h-auto object-cover transition-transform duration-500 ease-out'
//           />
//           <p className='py-2 font-[700] text-[1.25rem]'>{cards[4].title}</p>
//         </div>
//       </div>
//     </div>
//   )
// }





























// import { recent1, recent2, recent3, recent4, recent5 } from '@/Assets/Main/Image'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// export default function OurRecentWork() {
//     return (
//         <div className='px-[3.75rem] '>
//             <div>
//                 {/* top */}
//                 <div className='flex justify-between'>
//                     <div className='max-w-[22rem]'>
//                         <Image
//                             src={recent1}
//                             alt='recent1'
//                             width={600}
//                             height={600}
//                             className='w-[22rem] h-auto object-cover'
//                         />
//                         <p className='py-2 font-[700] text-[1.25rem]'>Classical Mirror</p>
//                         <p>As the name suggests, classical mirrors represent an exemplary standard within a traditional and long-established form or style</p>
//                     </div>
//                     <div className='text-center flex flex-col gap-5 items-center pt-[5rem]'>
//                         <h3 className='text-[#1F1F1F] text-[3.125rem]'>Our recent works</h3>
//                         <Link
//                             href={''}
//                             className="text-[#9C458B] flex items-center gap-2 border-b-2 border-[#9C458B] pb-1"
//                         >
//                             <span>SEE ALL WORKS</span>
//                             <span>
//                                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <g clipPath="url(#clip0_3799_334)">
//                                         <path d="M1.08984 10.9246L10.9259 1.0885" stroke="#9C458B" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                                         <path d="M1.08984 1.0885H10.9259V10.9246" stroke="#9C458B" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
//                                     </g>
//                                     <defs>
//                                         <clipPath id="clip0_3799_334">
//                                             <rect width="12" height="12" fill="white" />
//                                         </clipPath>
//                                     </defs>
//                                 </svg>
//                             </span>
//                         </Link>

//                     </div>
//                     <div className='max-w-[22rem] pt-[12rem]'>
//                         <Image
//                             src={recent2}
//                             alt='recent1'
//                             width={600}
//                             height={600}
//                             className='w-[22rem] h-auto object-cover'
//                         />
//                         <p className='py-2 font-[700] text-[1.25rem]'>Classic Railing</p>
//                     </div>
//                 </div>

//                 {/* center */}
//                 <div className='flex justify-center -mt-[14rem]'>
//                     <div className='max-w-[22rem]'>
//                         <Image
//                             src={recent5}
//                             alt='recent1'
//                             width={600}
//                             height={600}
//                             className='w-[22rem] h-auto object-cover'
//                         />
//                         <p className='py-2 font-[700] text-[1.25rem]'>Classic Mural</p>
//                     </div>
//                 </div>

//                 {/* bottom */}
//                 <div className='flex justify-between'>
//                     <div className='max-w-[22rem] -mt-[10rem]'>
//                         <Image
//                             src={recent3}
//                             alt='recent1'
//                             width={600}
//                             height={600}
//                             className='w-[22rem] h-auto object-cover'
//                         />
//                         <p className='py-2 font-[700] text-[1.25rem]'>Pooja Door</p>
//                     </div>

//                     <div className='max-w-[22rem]'>
//                         <Image
//                             src={recent4}
//                             alt='recent1'
//                             width={600}
//                             height={600}
//                             className='w-[22rem] h-auto object-cover'
//                         />
//                         <p className='py-2 font-[700] text-[1.25rem]'>Classic Handle</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
