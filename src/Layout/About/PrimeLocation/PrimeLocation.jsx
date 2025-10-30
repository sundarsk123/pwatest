'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import designbg from '@/Assets/About/design/image 95.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PrimeLocation = ({
  counter_one_number,
  counter_one_text,
  counter_two_number,
  counter_two_symbol,
  counter_two_text,
  counter_three_text,
  counter_three_number,
  counter_three_symbol
}) => {
  const sectionRef = useRef(null)
  const number1Ref = useRef(null)
  const number2Ref = useRef(null)
  const number3Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Helper function to animate count
      const animateCount = (ref, endValue, suffix = '', prefix = '', duration = 1) => {
        gsap.fromTo(
          ref,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: duration,
            ease: 'power1.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              ref.innerText = `${prefix}${Math.floor(ref.innerText)}${suffix}`
            },
          }
        )
      }

      // Animate counters
      animateCount(number1Ref.current, 7, '', '0')          // 07
      animateCount(number2Ref.current, 1, 'L')             // 1L+
      animateCount(number3Ref.current, 200, '')            // 200+
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className='px-[1.25rem] md:px-[3.75rem] pb-[2.5rem] grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 items-center gap-[1rem]'
    >
      {/* First Counter */}
      <div className='grid justify-center'>
        <div>
          <h3 className='text-[3.75rem] leading-[1.2] text-[#4A4A4A]'>
            <span ref={number1Ref}>{counter_one_number}</span>
          </h3>
        </div>
        <div>
          <p className='text-[1rem] md:text-[1.125rem] leading-[1.2] text-[#1F1F1F]'>
            {counter_one_text}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className='grid justify-center'>
        <Image
          src={designbg}
          width={267}
          height={107}
          alt={ 'Section Image'}
          className='w-full h-[6.6875rem]'
        />
      </div>

      {/* Second Counter */}
      <div className='grid justify-center'>
        <div>
          <h3 className="text-[3.75rem] leading-[1.2] text-[#4A4A4A]">
            <span ref={number2Ref}>{counter_two_number}</span>
            <span className="text-[2rem] align-top">{counter_two_symbol}</span>
          </h3>
        </div>
        <div>
          <p className='text-[1rem] md:text-[1.125rem] leading-[1.2] text-[#1F1F1F]'>
            {counter_two_text}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className='grid justify-center'>
        <Image
          src={designbg}
          width={267}
          height={107}
          alt={'Section Image'}
          className='w-full h-[6.6875rem]'
        />
      </div>

      {/* Third Counter */}
      <div className='grid justify-center'>
        <div>
          <h3 className="text-[2.5rem] md:text-[3.75rem] leading-[1.2] text-[#4A4A4A]">
            <span ref={number3Ref}>{counter_three_number}</span>
            <span className="text-[1rem] md:text-[2rem] align-top">{counter_three_symbol}</span>
          </h3>
        </div>
        <div>
          <p className='text-[1rem] md:text-[1.125rem] leading-[1.2] text-[#1F1F1F]'>
            {counter_three_text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrimeLocation
