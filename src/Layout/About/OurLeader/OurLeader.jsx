"use client"
import { leader1, leader2, leader3, leader4 } from '@/Assets/Main/Image'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OurLeader({
  meet_leaders_title,
  meet_leaders
}) {
  // Dynamic data for each leader
  const leaders = [
    {
      img: leader1,
      name: 'John Doe',
      role: 'CEO & Founder',
    },
    {
      img: leader2,
      name: 'Jane Smith',
      role: 'Chief Designer',
    },
    {
      img: leader3,
      name: 'Michael Lee',
      role: 'Head of Marketing',
    },
    {
      img: leader4,
      name: 'Sarah Johnson',
      role: 'Operations Manager',
    },
  ]

  const cardRefs = useRef([])

  useEffect(() => {


    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: index * 0.1, // staggered effect
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="px-[20px] md:px-[3.75rem] pb-[50px] md:py-[6.25rem]">
      <div className="flex flex-wrap gap-5 md:gap-[1.75rem]">

        {/* Section Heading */}
        <div className="w-full md:w-[calc(33.333%-1.75rem)]">
          <h2 className="text-[#4A4A4A] md:text-[2.125rem] lg:text-[3.125rem] text-[1.25rem] leading-[1.1] max-w-[10rem]">
            {meet_leaders_title}
          </h2>
        </div>

        {/* Leader Cards */}
        {meet_leaders.map((leader, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="w-[46%] md:w-[calc(33.333%-1.75rem)] rounded-xl overflow-hidden relative group opacity-0"
          >
            {/* Leader Image */}
            <Image
              src={leader.leaders_image.url}
              alt={leader.leaders_image.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />

            {/* Overlay with Dynamic Content */}
            <div
              className="absolute bottom-0 left-0 right-0 py-[1.5rem] px-[20px] 
                         bg-gradient-to-b from-transparent to-[#0F0601] opacity-0 translate-y-3 
                         transition-all duration-500 ease-in-out 
                         group-hover:opacity-100 group-hover:translate-y-0"
            >
              <p className="text-[1rem] md:text-[1.25rem] text-white">
                {leader.leaders_name}
              </p>
              {/* <p className="text-[0.875rem] text-gray-300">
                {leader.role}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
