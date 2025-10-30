
'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { doorleft, doorlock, doorright, parttern } from '@/Assets/Main/Image'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)




export default function Interiors({
  section_two_title,
  section_two_tag,
  section_two_description
}) {
  const sectionRef = useRef(null)
  const leftDoorRef = useRef(null)
  const rightDoorRef = useRef(null)
  const lockRef = useRef(null)
  const lockRefMobile = useRef(null)
  const textRef = useRef(null) // For text container
  const texttwoRef = useRef(null)
  const btnRef = useRef(null)
  const dotRef = useRef(null)
  const textsRef = useRef(null)

  useEffect(() => {
    if (!btnRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(dotRef.current, {
      scale: 40,
      duration: 1,
      ease: "power4.inOut"
    }, 0);
    tl.to(textsRef.current, {
      color: "#fff",
      duration: 1,
      ease: "power4.inOut"
    }, 0.1);

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    btnRef.current.addEventListener("mouseenter", handleEnter);
    btnRef.current.addEventListener("mouseleave", handleLeave);

    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener("mouseenter", handleEnter);
        btnRef.current.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);


  // data
  const InteriorsData = {
    heading: section_two_title,
    subheading: section_two_tag,
    para: section_two_description,
    buttonname: "Explore More",
    buttonlink: '/products'
  }

  // Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=900',
        pin: true,
        scrub: true,
        onEnter: () => {
          // Door animations
          gsap.to(leftDoorRef.current, {
            x: '-230%',
            duration: 1,
            ease: 'power2.inOut',
          })
          gsap.to(rightDoorRef.current, {
            x: '230%',
            duration: 1,
            ease: 'power2.inOut',
          })
          gsap.to(lockRef.current, {
            opacity: 1,
            scale: 0.5,
            paddingTop: '28rem',
            ease: 'power2.inOut',
            duration: 1,
          })

          // Text reveal animation
          gsap.fromTo(
            textRef.current.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              delay: 0.5, // Starts slightly after doors begin opening
              duration: 1,
              ease: 'power3.out',
            }
          )
          gsap.fromTo(
            texttwoRef.current.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              delay: 0.5,
              duration: 1,
              ease: 'power3.out',
            }
          )
        },

        onLeaveBack: () => {
          gsap.to(leftDoorRef.current, {
            x: '0%',
            duration: 1,
            ease: 'power2.inOut',
          })
          gsap.to(rightDoorRef.current, {
            x: '0%',
            duration: 1,
            ease: 'power2.inOut',
          })
          gsap.to(lockRef.current, {
            opacity: 1,
            scale: 1,
            paddingTop: '0rem',
            ease: 'power2.inOut',
            duration: 1,
          })

          // Hide text again when scrolling back
          gsap.to(textRef.current.children, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          })
          gsap.to(texttwoRef.current.children, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className='hidden lg:flex flex-row justify-center items-center w-full overflow-hidden relative bg-white'
    >
      {/* Text Layer */}
      <div
        ref={textRef}
        className='absolute top-[7rem] px-[1.25rem] md:px-0'
      >
        <h2 className='lg:text-[4rem] text-[1.25rem] text-[#4A4A4A] text-center max-w-[48rem] opacity-0'>
          {InteriorsData.heading}
        </h2>
        <p className='text-center text-[#9C458B] -mt-[2rem] md:-mt-[5.5rem] lg:text-[13rem] text-[4.25rem] max-w-[48rem] font-MiamiSunday opacity-0'>
          {InteriorsData.subheading}
        </p>
      </div>

      {/* Lock */}
      <div
        ref={lockRef}
        className='md:w-[13rem] w-[10rem] h-auto absolute left-1/2 top-[46%] md:top-[46%] xl:top-[46.3%] -translate-x-1/2 -translate-y-1/2 z-[10] hidden md:block'
      >
        <Image
          src={doorlock}
          alt='doorlock'
          className='object-contain'
          width={1000}
          height={1000}
          priority={true}
          quality={100}
        />
      </div>
      {/* Lock */}
      <div
        ref={lockRefMobile}
        className='md:w-[13rem] w-[10rem] h-auto absolute left-1/2 top-[46%] md:top-[46%] xl:top-[46.3%] -translate-x-1/2 -translate-y-1/2 z-[10] md:hidden'
      >
        <Image
          src={doorlock}
          alt='doorlock'
          className='object-contain'
          width={1000}
          height={1000}
          priority={true}
          quality={100}
        />
      </div>

      {/* Text Layer */}
      <div ref={texttwoRef} className='absolute top-[28rem] md:top-[35rem] flex justify-center items-center gap-5 flex-col '>
        <div className='text-center max-w-[28rem] text-[1.1rem] text-[#1F1F1F]' dangerouslySetInnerHTML={{ __html: InteriorsData.para }}></div>
        <Link
          ref={btnRef}
          href={InteriorsData.buttonlink}
          className=' px-4 py-2 relative text-[0.9rem] overflow-hidden flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
        >
          <span ref={textsRef} className='relative z-10 text-[#9C458B]'>{InteriorsData.buttonname}</span>
          <div
            ref={dotRef}
            className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B] "
            style={{ transformOrigin: "center" }}
          ></div>
        </Link>
      </div>

      {/* Left Door */}
      <div ref={leftDoorRef}>
        <div className='z-[2] relative'>
          <Image
            src={doorleft}
            alt='doorleft'
            className='w-auto h-dvh'
            width={1000}
            height={1000}
            priority={true}
            quality={100}
          />
          <div
            className='absolute top-0 inset-0 -left-[60rem] right-[9rem] -z-20'
            style={{
              backgroundImage: `url(${parttern.src})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '1.5%',
              opacity: 1,
            }}
          ></div>
        </div>
      </div>

      {/* Right Door */}
      <div ref={rightDoorRef}>
        <div className='z-[2] relative'>
          <Image
            src={doorright}
            alt='doorright'
            className='w-auto h-dvh'
            width={1000}
            height={1000}
            priority={true}
            quality={100}
          />
          <div
            className='absolute top-0 inset-0 -right-[60rem] left-[9rem] -z-20'
            style={{
              backgroundImage: `url(${parttern.src})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '1.5%',
              opacity: 1,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}























// 'use client'

// import React, { useEffect, useRef } from 'react'
// import { doorleft, doorlock, doorright, parttern } from '@/Assets/Main/Image'
// import Image from 'next/image'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Link from 'next/link'

// gsap.registerPlugin(ScrollTrigger)




// export default function Interiors({
//   section_two_title,
//   section_two_tag,
//   section_two_description
// }) {
//   const sectionRef = useRef(null)
//   const leftDoorRef = useRef(null)
//   const rightDoorRef = useRef(null)
//   const lockRef = useRef(null)
//   const lockRefMobile = useRef(null)
//   const textRef = useRef(null) // For text container
//   const texttwoRef = useRef(null)
//   const btnRef = useRef(null)
//   const dotRef = useRef(null)
//   const textsRef = useRef(null)

//   useEffect(() => {
//     if (!btnRef.current) return;

//     const tl = gsap.timeline({ paused: true });
//     tl.to(dotRef.current, {
//       scale: 40,
//       duration: 1,
//       ease: "power4.inOut"
//     }, 0);
//     tl.to(textsRef.current, {
//       color: "#fff",
//       duration: 1,
//       ease: "power4.inOut"
//     }, 0.1);

//     const handleEnter = () => tl.play();
//     const handleLeave = () => tl.reverse();

//     btnRef.current.addEventListener("mouseenter", handleEnter);
//     btnRef.current.addEventListener("mouseleave", handleLeave);

//     return () => {
//       if (btnRef.current) {
//         btnRef.current.removeEventListener("mouseenter", handleEnter);
//         btnRef.current.removeEventListener("mouseleave", handleLeave);
//       }
//     };
//   }, []);


//   // data
//   const InteriorsData = {
//     heading: section_two_title,
//     subheading: section_two_tag,
//     para: section_two_description,
//     buttonname: "Explore More",
//     buttonlink: '/'
//   }

//   // Animation
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: 'top top',
//         end: '+=900',
//         pin: true,
//         scrub: true,
//         onEnter: () => {
//           // Door animations
//           gsap.to(leftDoorRef.current, {
//             x: '-230%',
//             duration: 1,
//             ease: 'power2.inOut',
//           })
//           gsap.to(rightDoorRef.current, {
//             x: '230%',
//             duration: 1,
//             ease: 'power2.inOut',
//           })
//           gsap.to(lockRef.current, {
//             opacity: 1,
//             scale: 0.5,
//             paddingTop: '28rem',
//             ease: 'power2.inOut',
//             duration: 1,
//           })

//           // Text reveal animation
//           gsap.fromTo(
//             textRef.current.children,
//             { y: 30, opacity: 0 },
//             {
//               y: 0,
//               opacity: 1,
//               stagger: 0.15,
//               delay: 0.5, // Starts slightly after doors begin opening
//               duration: 1,
//               ease: 'power3.out',
//             }
//           )
//           gsap.fromTo(
//             texttwoRef.current.children,
//             { y: 30, opacity: 0 },
//             {
//               y: 0,
//               opacity: 1,
//               stagger: 0.15,
//               delay: 0.5,
//               duration: 1,
//               ease: 'power3.out',
//             }
//           )
//         },

//         onLeaveBack: () => {
//           gsap.to(leftDoorRef.current, {
//             x: '0%',
//             duration: 1,
//             ease: 'power2.inOut',
//           })
//           gsap.to(rightDoorRef.current, {
//             x: '0%',
//             duration: 1,
//             ease: 'power2.inOut',
//           })
//           gsap.to(lockRef.current, {
//             opacity: 1,
//             scale: 1,
//             paddingTop: '0rem',
//             ease: 'power2.inOut',
//             duration: 1,
//           })

//           // Hide text again when scrolling back
//           gsap.to(textRef.current.children, {
//             y: 20,
//             opacity: 0,
//             duration: 0.5,
//             ease: 'power2.inOut',
//           })
//           gsap.to(texttwoRef.current.children, {
//             y: 20,
//             opacity: 0,
//             duration: 0.5,
//             ease: 'power2.inOut',
//           })
//         },
//       })
//     }, sectionRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <div
//       ref={sectionRef}
//       className='hidden lg:flex flex-row justify-center items-center w-full overflow-hidden relative bg-white'
//     >
//       {/* Text Layer */}
//       <div
//         ref={textRef}
//         className='absolute top-[7rem] px-[1.25rem] md:px-0'
//       >
//         <h2 className='lg:text-[4rem] text-[1.25rem] text-[#4A4A4A] text-center max-w-[48rem] opacity-0'>
//           {InteriorsData.heading}
//         </h2>
//         <p className='text-center text-[#9C458B] -mt-[2rem] md:-mt-[5.5rem] lg:text-[13rem] text-[4.25rem] max-w-[48rem] font-MiamiSunday opacity-0'>
//           {InteriorsData.subheading}
//         </p>
//       </div>

//       {/* Lock */}
//       <div
//         ref={lockRef}
//         className='md:w-[13rem] w-[10rem] h-auto absolute left-1/2 top-[46%] md:top-[46%] xl:top-[46.3%] -translate-x-1/2 -translate-y-1/2 z-[10] hidden md:block'
//       >
//         <Image
//           src={doorlock}
//           alt='doorlock'
//           className='object-contain'
//           width={1000}
//           height={1000}
//           priority={true}
//           quality={100}
//         />
//       </div>
//       {/* Lock */}
//       <div
//         ref={lockRefMobile}
//         className='md:w-[13rem] w-[10rem] h-auto absolute left-1/2 top-[46%] md:top-[46%] xl:top-[46.3%] -translate-x-1/2 -translate-y-1/2 z-[10] md:hidden'
//       >
//         <Image
//           src={doorlock}
//           alt='doorlock'
//           className='object-contain'
//           width={1000}
//           height={1000}
//           priority={true}
//           quality={100}
//         />
//       </div>

//       {/* Text Layer */}
//       <div ref={texttwoRef} className='absolute top-[28rem] md:top-[35rem] flex justify-center items-center gap-5 flex-col '>
//         <div className='text-center max-w-[28rem] text-[1.1rem] text-[#1F1F1F]' dangerouslySetInnerHTML={{ __html: InteriorsData.para }}></div>
//         <Link
//           ref={btnRef}
//           href={InteriorsData.buttonlink}
//           className=' px-4 py-2 relative text-[0.9rem] overflow-hidden flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
//         >
//           <span ref={textsRef} className='relative z-10 text-[#9C458B]'>{InteriorsData.buttonname}</span>
//           <div
//             ref={dotRef}
//             className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B] "
//             style={{ transformOrigin: "center" }}
//           ></div>
//         </Link>
//       </div>

//       {/* Left Door */}
//       <div ref={leftDoorRef}>
//         <div className='z-[2] relative'>
//           <Image
//             src={doorleft}
//             alt='doorleft'
//             className='w-auto h-dvh'
//             width={1000}
//             height={1000}
//             priority={true}
//             quality={100}
//           />
//           <div
//             className='absolute top-0 inset-0 -left-[60rem] right-[9rem] -z-20'
//             style={{
//               backgroundImage: `url(${parttern.src})`,
//               backgroundRepeat: 'repeat',
//               backgroundSize: '1.5%',
//               opacity: 1,
//             }}
//           ></div>
//         </div>
//       </div>

//       {/* Right Door */}
//       <div ref={rightDoorRef}>
//         <div className='z-[2] relative'>
//           <Image
//             src={doorright}
//             alt='doorright'
//             className='w-auto h-dvh'
//             width={1000}
//             height={1000}
//             priority={true}
//             quality={100}
//           />
//           <div
//             className='absolute top-0 inset-0 -right-[60rem] left-[9rem] -z-20'
//             style={{
//               backgroundImage: `url(${parttern.src})`,
//               backgroundRepeat: 'repeat',
//               backgroundSize: '1.5%',
//               opacity: 1,
//             }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   )
// }