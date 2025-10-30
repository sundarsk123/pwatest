import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export function AnimatedLink({ href, childrens }) {
    const linkRef = useRef(null);
    const underlineRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(linkRef.current, {
            color: "#fff",
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(underlineRef.current, {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(linkRef.current, {
            color: "#FEEAFA",
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
        });

        gsap.to(underlineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.3,
            ease: "power2.inOut",
        });
    };

    return (
        <div className="relative inline-block">
            <Link
                href={href}
                ref={linkRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative inline-block reveal-text"
            >
                {childrens}
                <span
                    ref={underlineRef}
                    className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-[#E489D2] scale-x-0 origin-left"
                ></span>
            </Link>
        </div>
    );
}
