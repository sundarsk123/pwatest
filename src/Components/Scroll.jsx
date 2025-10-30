"use client";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Scroll = () => {

  useGSAP(() => {
    if (window.innerWidth >= 1024) {
      const lenis = new Lenis({
        lerp: 0.06,
        wheelMultiplier: 1.0,
        smoothWheel: true,
        infinite: false,
      });

      gsap.registerPlugin(ScrollTrigger);

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time ) => {
        lenis.raf(time * 1900);
      });

      gsap.ticker.lagSmoothing(0);

      window.scrollTo(0, 0);

      return () => {
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(lenis.raf);
        lenis.destroy();
      };
    }
  }, []);

  return null;
};

export default Scroll;