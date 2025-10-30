"use client"
import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import circle1 from "@/Assets/About/design/iocn-03.svg"
import circle2 from "@/Assets/About/design/iocn-02.svg"
import circle3 from "@/Assets/About/design/iocn-04.svg"

gsap.registerPlugin(ScrollTrigger)

const whyChooseData = [
  {
    title: "Superior Craftsmanship",
    description:
      "Benefit from our heritage of artisanal excellence, ensuring each brass decor piece is crafted with precision and passion.",
    extraClasses: "md:border-l border-t md:border-t-0",
    icon: circle1,
  },
  {
    title: "Timeless Elegance",
    description:
      "Embrace the enduring beauty of brass decor, adding a touch of sophistication and charm to your home or space.",
    extraClasses: "md:border-l border-t md:border-t-0 lg:pt-[21.25rem]", // 340px = 21.25rem
    icon: circle2,
  },
  {
    title: "Customization Options",
    description:
      "Enjoy the flexibility to personalize your decor with bespoke design consultations, tailored to your unique style and preferences.",
    extraClasses: "md:border-x border-y md:border-y-0 lg:pt-[8.125rem]", // 130px = 8.125rem
    icon: circle3,
  },
]

const WhyChoose = ({ why_choose_title, why_choose_grids }) => {
  const sectionRef = useRef(null)
  const headingRefs = useRef([])
  const cardRefs = useRef([])

  useEffect(() => {
    // Heading animation (letter by letter)
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

    // Grid cards animation (bottom to top)
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 5 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  return (
    <div
      ref={sectionRef}
      className="px-[1.25rem] md:px-[3.75rem] py-[3.125rem] lg:flex" // 20px, 60px, 50px
    >
      {/* Left Heading */}
      <div className="lg:w-[42%]">
        <h2 className="text-[#4A4A4A] md:text-[3.125rem] text-[1.25rem] leading-[1.1]">
          {why_choose_title.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (headingRefs.current[i] = el)}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </div>

      {/* Dynamic Items */}
      <div className="grid md:grid-cols-3 lg:grid-cols-3 lg:w-[58%] pt-[3.125rem] lg:pt-0"> {/* 50px = 3.125rem */}
        {whyChooseData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`${item.extraClasses} border-[#000000]/20 md:px-[0.625rem] lg:px-[0.9375rem] py-[1.25rem]`} // 10px=0.625rem, 15px=0.9375rem, 20px=1.25rem
          >
            <div>
              <Image
                src={item.icon}
                width={80}
                height={80}
                alt={item.title}
                className="w-[3.5rem] h-[3.5rem] md:w-[5rem] md:h-[5rem]" // 56px=3.5rem, 80px=5rem
              />
            </div>
            <div className="pt-[0.625rem] md:pt-[1.25rem]"> {/* 10px=0.625rem, 20px=1.25rem */}
              <p className="text-[1.125rem] md:text-[1.25rem] text-black leading-[1.2] font-500">
                {item.title}
              </p>
              <p className="text-[#6F6F6F] text-[1rem] leading-[1.2] pt-[0.5rem]"> {/* 8px=0.5rem */}
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChoose
