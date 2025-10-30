"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HeartStory = ({
    heart_story_title,
    heart_story_description
}) => {
    const sectionRef = useRef(null)
    const paraRefs = useRef([])
    const headingRefs = useRef([])

    const storyData = {
        title: "The heart story",
        paragraphs: [
            "From a small group of fine art graduates forming Artisticks in 1989, our company has grown wide and deep, flowering all the way. We serve our client with stunning designs translating into quality products with the underlying fabric of integrity. Today with Professional artist ,design team and more than a hundred hands-on talented artists and gifted craftsmen, Well equipped 30,000 Sqft of Studio our joy and enthusiasm to cater to the aesthetic demands of our esteemed clients, designers has only grown exponentially.",
            "Through our designs we simply make sure that our clients feel at home wherever they are. Our products are inspired from nature, which is the greatest creator of all, with its never ending possibilities and unceasing marvel. From a geometric honeycomb to a wind-swept riverbed, from a cloudy leopard skin to a callous mountain ridge, nothing fails to inspire our simple mind. Our designs speak the language you want them to speak. We give a subtle form to your thoughts and percepts; we add some colour to your dreams."
        ]
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate heading letters
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
                    }
                }
            )

            // Animate paragraphs
            gsap.from(paraRefs.current, {
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.4,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={sectionRef}
            className="px-[1.25rem] md:px-[3.75rem] py-[3.125rem] md:pb-[6.25rem]"
        >
            <div className="text-center">
                <h2 className="text-[#4A4A4A] md:text-[3.125rem] text-[1.25rem] leading-[1.1]">
                    {heart_story_title.split("").map((char, i) => (
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
            <div className="text-center pt-[1rem] max-w-[63rem] mx-auto text-[#1F1F1F]">

                <div

                    ref={(el) => (paraRefs.current = el)}
                    className={`text-[1rem] leading-[1.5] para`} dangerouslySetInnerHTML={{ __html: heart_story_description }}
                >

                </div>
            </div>
        </div>
    )
}

export default HeartStory
