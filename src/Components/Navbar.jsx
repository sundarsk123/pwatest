'use client'

import { Logo, Logocolor } from '@/Assets/Main/Image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion } from "framer-motion"

const navbarLinks = [
  { label: 'Shop', href: '' },
  { label: 'CUSTOMZATION', href: '' },
  { label: 'BRANDS', href: '' },
  { label: 'LOGO', href: '/', isLogo: true },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Works', href: '/our-works' },
]

export default function Navbar({ bgcolor = false }) {
  const navbarRef = useRef(null)
  let lastScrollY = 0
  const menuOverlayRef = useRef(null);
  const btnRef = useRef(null)
  const dotRef = useRef(null)
  const textRef = useRef(null)
  const [color, setColor] = useState(bgcolor)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setColor(bgcolor)
  }, [bgcolor])


  useEffect(() => {
    if (!btnRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(dotRef.current, {
      scale: 30,
      duration: 0.6,
      ease: "power4.inOut"
    }, 0);
    tl.to(textRef.current, {
      color: "#fff",
      duration: 0.6,
      ease: "power4.inOut"
    }, 0.1);

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    btnRef.current.addEventListener("mouseenter", handleMouseEnter);
    btnRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener("mouseenter", handleMouseEnter);
        btnRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const scrollPercent = currentScroll / (document.body.scrollHeight - window.innerHeight);

      // Show/hide navbar
      if (currentScroll > lastScrollY && currentScroll > 1) {
        gsap.to(navbarRef.current, { y: '-100%', duration: 1, ease: 'power2.out' });
      } else {
        gsap.to(navbarRef.current, { y: '0%', duration: 1, ease: 'power2.out' });
      }

      // Change background at 20% scroll
      if (scrollPercent > 0.1) {
        setColor(true);  // solid color
      } else {
        setColor(false); // semi-transparent
      }

      lastScrollY = currentScroll;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOverlayRef.current) {
      if (menuOpen) {
        // Animate the menu overlay down
        gsap.to(menuOverlayRef.current, {
          y: "0%",
          duration: 0.8,
          ease: "power4.out",
        });

        // Animate menu links appearing one by one
        gsap.fromTo(
          ".menu-link",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      } else {
        // Animate menu links hiding one by one first
        gsap.to(".menu-link", {
          y: 10,
          opacity: 0,
          duration: 0.1,
          stagger: 0.1, // Reverse stagger for closing
          ease: "power3.in",
          onComplete: () => {
            // Once links are hidden, slide the whole menu up
            gsap.to(menuOverlayRef.current, {
              y: "-100%",
              duration: 0.2,
              ease: "power4.in",
            });
          },
        });
      }
    }
  }, [menuOpen]);


  return (
    <div
      ref={navbarRef}
      className={`lg:px-[3rem] px-[1.25rem] py-[1rem] ${color ? 'bg-[#643C21]/[0.8] backdrop-blur-[30px]' : 'bg-[#643C21]/[0.27] backdrop-blur-[30px]'}  flex justify-between items-center fixed top-0 left-0 z-[999] text-white w-full`}
    >
      <div className='hidden lg:block xl:w-[6%]'>
      </div>
      <div className='md:flex items-center gap-[2rem] lg:gap-[3rem] uppercase'>
        {navbarLinks.map((link, index) =>
          link.isLogo ? (
            <motion.div
              key={index}
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link key={index} href={link.href} className='relative z-[1001]'>
                <Image
                  src={color ? Logo : Logo}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="object-cover w-[10rem] lg:w-[10rem] xl:w-[14rem] h-auto"
                  priority
                />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              className="relative hidden lg:block overflow-hidden"
            >
              <Link
                href={link.href}
                className="relative block xl:text-[0.9rem] md:text-[0.7rem] font-[400] uppercase group"
              >
                {/* default text */}
                <span className="block text-white transition-all duration-300 group-hover:-translate-y-[120%]">
                  {link.label}
                </span>

                {/* hover text (slides up) */}
                <span className="absolute left-0 top-0 block text-[#fff] translate-y-[120%] transition-all duration-300 group-hover:translate-y-0">
                  {link.label}
                </span>
              </Link>
            </motion.div>

          )
        )}
      </div>
      <div className='hidden lg:block'>
        <Link
          href={'/contact-us'}
          ref={btnRef}
          className="relative bg-white px-[1.5rem] py-3 flex items-center rounded-[10rem] gap-3 overflow-hidden"
        >
          <span
            ref={textRef}
            className="text-[#9C458B] uppercase font-[400] text-[0.9rem] relative z-10 "
          >
            CONTACT
          </span>
          <div
            ref={dotRef}
            className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B] "
            style={{ transformOrigin: "center" }}
          ></div>
        </Link>

      </div>
      <div className='lg:hidden relative z-[1001]'>
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="transition-transform duration-300 ease-in-out"
          aria-label="Open menu"
        >
          {menuOpen ? (
            // Close Icon
            <svg width="32" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="28" y2="28" stroke="white" strokeWidth="2" />
              <line x1="28" y1="4" x2="4" y2="28" stroke="white" strokeWidth="2" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.692383" width="27.0769" height="1.69231" fill="white" />
              <rect x="4" y="9.15381" width="27.0769" height="1.69231" fill="white" />
              <rect y="17.6152" width="27.0769" height="1.69231" fill="white" />
            </svg>
          )}
        </button>
      </div>


      {/* Mobile Menu Button */}
      {/* <div className='lg:hidden relative z-[1001]'>
        <button
         
          className="relative w-[2.5rem] h-[1.5rem] flex flex-col justify-between"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4 }}
            className="block w-[1.8rem] h-[2px] bg-white rounded"
          ></motion.span>
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="block w-[1.8rem] h-[2px] bg-white rounded"
          ></motion.span>
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4 }}
            className="block w-[1.8rem] h-[2px] bg-white rounded"
          ></motion.span>
        </button>
      </div> */}

      {/* Mobile Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 w-full h-svh bg-[#9C458B] text-white flex flex-col py-[8rem] px-[1.5rem] -translate-y-full z-[1000]"
      >
        {/* Menu Links */}
        <ul className="space-y-5 uppercase flex-1">
          {navbarLinks.map((link, index) =>
            link.isLogo ? null : (
              <li
                key={index}
                className="menu-link border-b border-[#F3D9F4]/30 pb-5 relative group"
              >
                <Link
                  href={link.href}
                  className="block hover:text-[#F3D9F4] transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F3D9F4] transition-all duration-500 group-hover:w-full"></span>
              </li>
            )
          )}
        </ul>

        {/* Contact Button at Bottom */}
        <div className="absolute bottom-0 left-[0rem] px-4 pb-6 max-w-[13rem] w-full menu-link">
          <Link
            href="/contact-us"
            className="relative w-full bg-white py-4 flex items-center justify-center rounded-full gap-3 overflow-hidden"
          >
            <span
              className="text-[#9C458B] uppercase font-[500] text-[1rem] relative z-10 tracking-wide"
            >
              Contact
            </span>
            <div
              className="w-2 h-2 rounded-full bg-[#9C458B] transition-transform duration-300 ease-in-out"
            ></div>
          </Link>
        </div>
      </div>


    </div>
  )
}
