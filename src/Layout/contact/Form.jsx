"use client"
import React, { useEffect, useRef, useState } from 'react'
import RequirementInput from './RequirementInput/RequirementInput'
import Link from 'next/link'
import './Form.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Api_End_Point } from '@/Services/Api'

gsap.registerPlugin(ScrollTrigger)

export default function Form() {
    const btnRef = useRef(null)
    const dotRef = useRef(null)
    const textsRef = useRef(null)

    // ✅ State for form inputs
    const [formData, setFormData] = useState({
        cname: "",
        cemail: "",
        cmobile: "",
        crequirement: "",
        cspecification: ""
    })
    const [errors, setErrors] = useState({})
    const [isChecked, setIsChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)

    // ✅ GSAP Hover Animation
    useEffect(() => {
        if (!btnRef.current) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(dotRef.current, {
            scale: 40,
            duration: 0.6,
            ease: "power4.inOut"
        }, 0);
        tl.to(textsRef.current, {
            color: "#fff",
            duration: 0.6,
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

    // const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

    // ✅ Handle Change
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
        setErrors(prev => ({ ...prev, [id]: false }))
    }

    // ✅ Requirement input change
    const handleRequirementChange = (value) => {
        setFormData(prev => ({ ...prev, crequirement: value }))
        setErrors(prev => ({ ...prev, crequirement: false }))
    }

    // ✅ Validation
    const validateForm = () => {
        let newErrors = {}
        if (!formData.cname) newErrors.cname = true
        if (!formData.cemail) newErrors.cemail = true
        if (!formData.cmobile) newErrors.cmobile = true
        if (!formData.crequirement) newErrors.crequirement = true
        if (!formData.cspecification) newErrors.cspecification = true
        if (!isChecked) newErrors.checkbox = true
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // ✅ Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setLoading(true)

        try {
            const res = await fetch(`${Api_End_Point}wp-json/artistickscontact/v1/submit-form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                // ✅ Clear form after success
                setFormData({
                    cname: "",
                    cemail: "",
                    cmobile: "",
                    crequirement: "",
                    cspecification: ""
                })
                setIsChecked(false)

                // ✅ Show success message (toast)
                setSuccessMsg(true)
                setTimeout(() => setSuccessMsg(false), 3000)
            } else {
                alert("❌ Submission failed: " + (data?.message || "Unknown error"))
            }
        } catch (err) {
            console.error(err)
            alert("❌ Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="py-[3rem] px-[1rem] md:py-[6.25rem] md:px-[3.75rem]"
            >
                <div className="xl:text-[2.4rem] text-[1.3rem] font-tan-pearl text-[#4A4A4A] flex flex-col gap-6 md:gap-10">

                    {/* Name Input */}
                    <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                        <p className="whitespace-nowrap">Hello! I am&nbsp;</p>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="cname"
                                value={formData.cname}
                                onChange={handleChange}
                                placeholder=" "
                                className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent
                                    ${errors.cname ? "border-red-500" : "border-[#4A4A4A]"}`}
                            />
                            <label
                                htmlFor="cname"
                                className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
                                peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] 
                                md:peer-placeholder-shown:text-[2rem]
                                peer-not-placeholder-shown:hidden"
                            >
                                name...
                            </label>
                        </div>
                        <p className="whitespace-nowrap mt-2 md:mt-0">, this is my</p>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                        <p className="whitespace-nowrap">email&nbsp;</p>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="cemail"
                                value={formData.cemail}
                                onChange={handleChange}
                                placeholder=" "
                                className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent
                                    ${errors.cemail ? "border-red-500" : "border-[#4A4A4A]"}`}
                            />

                            <label
                                htmlFor="cemail"
                                className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
                                peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] 
                                md:peer-placeholder-shown:text-[2rem]
                                peer-not-placeholder-shown:hidden"
                            >
                                jhon@example.com
                            </label>
                        </div>
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                        <p className="whitespace-nowrap">and my phone number&nbsp;</p>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="cmobile"
                                value={formData.cmobile}
                                onChange={handleChange}
                                placeholder=" "
                                className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent !leading-[1]
                                    ${errors.cmobile ? "border-red-500" : "border-[#4A4A4A]"}`}
                            />

                            <label
                                htmlFor="cmobile"
                                className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all 
                                peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] 
                                md:peer-placeholder-shown:text-[2rem]
                                peer-not-placeholder-shown:hidden"
                            >
                                987654329
                            </label>
                        </div>
                    </div>

                    {/* Requirement Input */}
                    <RequirementInput
                        value={formData.crequirement} // controlled value
                        onChange={handleRequirementChange} // ✅ updates parent state
                        error={errors.crequirement}
                    />

                    {/* Message Input */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            id="cspecification"
                            value={formData.cspecification}
                            onChange={handleChange}
                            placeholder=" "
                            className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent
                                ${errors.cspecification ? "border-red-500" : "border-[#4A4A4A]"}`}
                        />

                        <label
                            htmlFor="cspecification"
                            className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
                                peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] 
                                md:peer-placeholder-shown:text-[2rem]
                                peer-not-placeholder-shown:hidden"
                        >
                            message...
                        </label>
                    </div>
                </div>

                {/* Submit Section */}
                <div className='md:flex justify-end'>
                    <div className='flex flex-col md:flex-row md:items-center pt-[2rem] md:pt-[5rem] gap-3.5 '>
                        <div className='flex items-center gap-3'>
                            <label className="checkbox-label-Form">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <span className="checkmark-Form"></span>
                            </label>
                            <p className={`text-[0.8rem] ${errors.checkbox ? "text-red-500" : "text-[#A4A4A4]"}`}>
                                By clicking the button, you agree to discover market
                                <Link href={''} className='border-b'> Terms of Use </Link> and
                                <Link href={''} className='border-b'> Privacy Policy.</Link>
                            </p>
                        </div>
                        <button
                            ref={btnRef}
                            type="submit"
                            disabled={loading}
                            className='max-w-[6.5rem] cursor-pointer px-4 py-2 relative text-[0.9rem] overflow-hidden flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
                        >
                            <span ref={textsRef} className='relative text-[#9C458B] md:z-10'>
                                {loading ? "Submiting..." : "Submit"}
                            </span>
                            <div
                                ref={dotRef}
                                className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B]"
                                style={{ transformOrigin: "center" }}
                            ></div>
                        </button>
                    </div>
                </div>
            </form>

            {/* ✅ Success Toast */}
            {successMsg && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
                    Form sent successfully!
                </div>
            )}
        </>
    )
}


























// "use client"
// import React, { useEffect, useRef, useState } from 'react'
// import RequirementInput from './RequirementInput/RequirementInput'
// import Link from 'next/link'
// import './Form.css'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function Form() {
//     const btnRef = useRef(null)
//     const dotRef = useRef(null)
//     const textsRef = useRef(null)

//     // ✅ State for form inputs
//     const [formData, setFormData] = useState({
//         cname: "",
//         cemail: "",
//         cmobile: "",
//         crequirement: "",
//         cspecification: ""
//     })
//     const [errors, setErrors] = useState({})
//     const [isChecked, setIsChecked] = useState(false)
//     const [loading, setLoading] = useState(false)

//     // ✅ GSAP Hover Animation
//     useEffect(() => {
//         if (!btnRef.current) return;

//         const tl = gsap.timeline({ paused: true });
//         tl.to(dotRef.current, {
//             scale: 40,
//             duration: 1,
//             ease: "power4.inOut"
//         }, 0);
//         tl.to(textsRef.current, {
//             color: "#fff",
//             duration: 1,
//             ease: "power4.inOut"
//         }, 0.1);

//         const handleEnter = () => tl.play();
//         const handleLeave = () => tl.reverse();

//         btnRef.current.addEventListener("mouseenter", handleEnter);
//         btnRef.current.addEventListener("mouseleave", handleLeave);

//         return () => {
//             if (btnRef.current) {
//                 btnRef.current.removeEventListener("mouseenter", handleEnter);
//                 btnRef.current.removeEventListener("mouseleave", handleLeave);
//             }
//         };
//     }, []);

//     const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

//     // ✅ Handle Change
//     const handleChange = (e) => {
//         const { id, value } = e.target
//         setFormData(prev => ({ ...prev, [id]: value }))
//         setErrors(prev => ({ ...prev, [id]: false }))
//     }

//     // ✅ Requirement input change
//     const handleRequirementChange = (value) => {
//         setFormData(prev => ({ ...prev, crequirement: value }))
//         setErrors(prev => ({ ...prev, crequirement: false }))
//     }

//     // ✅ Validation
//     const validateForm = () => {
//         let newErrors = {}
//         if (!formData.cname) newErrors.cname = true
//         if (!formData.cemail) newErrors.cemail = true
//         if (!formData.cmobile) newErrors.cmobile = true
//         if (!formData.crequirement) newErrors.crequirement = true
//         if (!formData.cspecification) newErrors.cspecification = true
//         if (!isChecked) newErrors.checkbox = true
//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     // ✅ Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (!validateForm()) return
//         setLoading(true)

//         try {
//             const res = await fetch("https://dezvolta.in/artisticks/wp-json/artistickscontact/v1/submit-form", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await res.json()
//             alert("✅ Form submitted successfully!")
//             console.log(data)
//         } catch (err) {
//             console.error(err)
//             alert("❌ Something went wrong!")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="py-[3rem] px-[1rem] md:py-[6.25rem] md:px-[3.75rem]"
//         >
//             <div className="xl:text-[2.4rem] text-[1.3rem] font-tan-pearl text-[#4A4A4A] flex flex-col gap-6 md:gap-10">

//                 {/* Name Input */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
//                     <p className="whitespace-nowrap">Hello! My name is&nbsp;</p>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             id="cname"
//                             value={formData.cname}
//                             onChange={handleChange}
//                             placeholder=" "
//                             className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent
//                                 ${errors.cname ? "border-red-500" : "border-[#4A4A4A]"}`}
//                         />
//                         <label
//                             htmlFor="cname"
//                             className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//                                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//                                 md:peer-placeholder-shown:text-[2rem]
//                                 peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                     <p className="whitespace-nowrap mt-2 md:mt-0">, this is my</p>
//                 </div>

//                 {/* Email Input */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
//                     <p className="whitespace-nowrap">email&nbsp;</p>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             id="cemail"
//                             value={formData.cemail}
//                             onChange={handleChange}
//                             placeholder=" "
//                             className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent
//                                 ${errors.cemail ? "border-red-500" : "border-[#4A4A4A]"}`}
//                         />
//                         <label
//                             htmlFor="cemail"
//                             className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//                                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//                                 md:peer-placeholder-shown:text-[2rem]
//                                 peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                 </div>

//                 {/* Phone Input */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
//                     <p className="whitespace-nowrap">and my phone number&nbsp;</p>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             id="cmobile"
//                             value={formData.cmobile}
//                             onChange={handleChange}
//                             placeholder=" "
//                             className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent leading-2.5
//                                 ${errors.cmobile ? "border-red-500" : "border-[#4A4A4A]"}`}
//                         />
//                         <label
//                             htmlFor="cmobile"
//                             className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//                                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//                                 md:peer-placeholder-shown:text-[2rem]
//                                 peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                 </div>

//                 {/* Requirement Input */}
//                 <RequirementInput options={options} onChange={handleRequirementChange} error={errors.crequirement} />

//                 {/* Message Input */}
//                 <div className="relative w-full">
//                     <input
//                         type="text"
//                         id="cspecification"
//                         value={formData.cspecification}
//                         onChange={handleChange}
//                         placeholder=" "
//                         className={`peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] border-b border-dotted bg-transparent
//                             ${errors.cspecification ? "border-red-500" : "border-[#4A4A4A]"}`}
//                     />
//                     <label
//                         htmlFor="cspecification"
//                         className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//                                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//                                 md:peer-placeholder-shown:text-[2rem]
//                                 peer-not-placeholder-shown:hidden"
//                     >
//                         type...
//                     </label>
//                 </div>
//             </div>

//             {/* Submit Section */}
//             <div className='md:flex justify-end'>
//                 <div className='flex flex-col md:flex-row md:items-center pt-[2rem] md:pt-[5rem] gap-3.5 '>
//                     <div className='flex items-center gap-3'>
//                         <label className="checkbox-label-Form">
//                             <input
//                                 type="checkbox"
//                                 checked={isChecked}
//                                 onChange={() => setIsChecked(!isChecked)}
//                             />
//                             <span className="checkmark-Form"></span>
//                         </label>
//                         <p className={`text-[0.8rem] ${errors.checkbox ? "text-red-500" : "text-[#A4A4A4]"}`}>
//                             By clicking the button, you agree to discover market
//                             <Link href={''} className='border-b'> Terms of Use </Link> and
//                             <Link href={''} className='border-b'> Privacy Policy.</Link>
//                         </p>
//                     </div>
//                     <button
//                         ref={btnRef}
//                         type="submit"
//                         disabled={loading}
//                         className='max-w-[6.5rem] px-4 py-2 relative text-[0.9rem] overflow-hidden flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
//                     >
//                         <span ref={textsRef} className='relative text-[#9C458B] md:z-10'>
//                             {loading ? "..." : "Submit"}
//                         </span>
//                         <div
//                             ref={dotRef}
//                             className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B]"
//                             style={{ transformOrigin: "center" }}
//                         ></div>
//                     </button>
//                 </div>
//             </div>
//         </form>
//     )
// }






































// "use client"
// import React, { useEffect, useRef } from 'react'
// import RequirementInput from './RequirementInput/RequirementInput'
// import Link from 'next/link'
// import './Form.css'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function Form() {
//     const btnRef = useRef(null)
//     const dotRef = useRef(null)
//     const textsRef = useRef(null)

//     useEffect(() => {
//         if (!btnRef.current) return;

//         const tl = gsap.timeline({ paused: true });
//         tl.to(dotRef.current, {
//             scale: 40,
//             duration: 1,
//             ease: "power4.inOut"
//         }, 0);
//         tl.to(textsRef.current, {
//             color: "#fff",
//             duration: 1,
//             ease: "power4.inOut"
//         }, 0.1);

//         const handleEnter = () => tl.play();
//         const handleLeave = () => tl.reverse();

//         btnRef.current.addEventListener("mouseenter", handleEnter);
//         btnRef.current.addEventListener("mouseleave", handleLeave);

//         return () => {
//             if (btnRef.current) {
//                 btnRef.current.removeEventListener("mouseenter", handleEnter);
//                 btnRef.current.removeEventListener("mouseleave", handleLeave);
//             }
//         };
//     }, []);

//         const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

//     return (
//         <div className="py-[3rem] px-[1rem] md:py-[6.25rem] md:px-[3.75rem]">
//             <div className="xl:text-[2.4rem] text-[1.3rem] font-tan-pearl text-[#4A4A4A] flex flex-col gap-6 md:gap-10">

//                 {/* Name Input */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
//                     <p className="whitespace-nowrap">Hello! My name is&nbsp;</p>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             id="name"
//                             placeholder=" "
//                             className="peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] text-[#4A4A4A] border-b border-dotted border-[#4A4A4A] bg-transparent"
//                         />
//                          <label
//                     htmlFor="name"
//                     className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//     peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//     md:peer-placeholder-shown:text-[2rem]
//     peer-not-placeholder-shown:hidden"
//                 >
//                     type...
//                 </label>
//                     </div>
//                     <p className="whitespace-nowrap mt-2 md:mt-0">, this is my</p>
//                 </div>

//                 {/* Email Input */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
//                     <p className="whitespace-nowrap">email&nbsp;</p>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             id="email"
//                             placeholder=" "
//                             className="peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] text-[#4A4A4A] border-b border-dotted border-[#4A4A4A] bg-transparent"
//                         />
//                         <label
//                             htmlFor="email"
//                              className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//     peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//     md:peer-placeholder-shown:text-[2rem]
//     peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                 </div>

//                 {/* Phone Input */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
//                     <p className="whitespace-nowrap">and my phone number&nbsp;</p>
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             id="phone"
//                             placeholder=" "
//                             className="peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] text-[#4A4A4A] border-b border-dotted border-[#4A4A4A] bg-transparent"
//                         />
//                         <label
//                             htmlFor="phone"
//                              className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//     peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//     md:peer-placeholder-shown:text-[2rem]
//     peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                 </div>

//                 {/* Requirement Input */}
//                 <RequirementInput options={options}/>

//                 {/* Message Input */}
//                 <div className="relative w-full">
//                     <input
//                         type="text"
//                         id="msg"
//                         placeholder=" "
//                         className="peer w-full focus:outline-0 text-[1.1rem] md:text-[1.4rem] text-[#4A4A4A] border-b border-dotted border-[#4A4A4A] bg-transparent"
//                     />
//                     <label
//                         htmlFor="msg"
//                        className="absolute left-0 top-0 text-[#A1A1A1]/40 text-[1.2rem] md:text-[2rem] transition-all
//     peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%]
//     md:peer-placeholder-shown:text-[2rem]
//     peer-not-placeholder-shown:hidden"
//                     >
//                         type...
//                     </label>
//                 </div>
//             </div>

//             {/* Submit Section */}



//             <div className='md:flex justify-end'>
//                 <div className='flex flex-col md:flex-row md:items-center pt-[2rem] md:pt-[5rem] gap-3.5 '>
//                     <div className='flex items-center gap-3'>
//                     <label className="checkbox-label-Form">
//                         <input type="checkbox" />
//                         <span className="checkmark-Form"></span>
//                     </label>
//                     <p className='text-[0.8rem] text-[#A4A4A4] '>By clicking the button, you agree to discover market <Link href={''} className='border border-t-0 border-x-0'>Terms of Use </Link> and <Link href={''} className='border border-t-0 border-x-0'>Privacy Policy.</Link></p>
//                     </div>
//                     <Link
//                         ref={btnRef}
//                         href={''}
//                         className='max-w-[6.5rem] px-4 py-2 relative text-[0.9rem] overflow-hidden flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
//                     >
//                         <span ref={textsRef} className='relative  text-[#9C458B] md:z-10'>Submit</span>
//                         <div
//                             ref={dotRef}
//                             className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B] "
//                             style={{ transformOrigin: "center" }}
//                         ></div>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

























// "use client"
// import React, { useEffect, useRef } from 'react'
// import RequirementInput from './RequirementInput/RequirementInput'
// import Link from 'next/link'
// import './Form.css'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function Form() {
//     const btnRef = useRef(null)
//     const dotRef = useRef(null)
//     const textsRef = useRef(null)

//     useEffect(() => {
//         if (!btnRef.current) return;

//         const tl = gsap.timeline({ paused: true });
//         tl.to(dotRef.current, {
//             scale: 40,
//             duration: 1,
//             ease: "power4.inOut"
//         }, 0);
//         tl.to(textsRef.current, {
//             color: "#fff",
//             duration: 1,
//             ease: "power4.inOut"
//         }, 0.1);

//         const handleEnter = () => tl.play();
//         const handleLeave = () => tl.reverse();

//         btnRef.current.addEventListener("mouseenter", handleEnter);
//         btnRef.current.addEventListener("mouseleave", handleLeave);

//         return () => {
//             if (btnRef.current) {
//                 btnRef.current.removeEventListener("mouseenter", handleEnter);
//                 btnRef.current.removeEventListener("mouseleave", handleLeave);
//             }
//         };
//     }, []);
//     return (
//         <div className='py-[6.25rem] px-[3.75rem]'>
//             <div className='xl:text-[2.4rem] font-tan-pearl text-[#4A4A4A]  flex flex-wrap items-center'>

//                 {/* Name Input */}
//                 <div className="flex items-center w-full">
//                     {/* Left text */}
//                     <p className="whitespace-nowrap">Hello! My name is&nbsp;</p>

//                     {/* Input field */}
//                     <div className="relative flex-grow">
//                         <input
//                             type="text"
//                             id="name"
//                             placeholder=" "
//                             className="peer w-full focus:outline-0 md:text-left text-[#4A4A4A] font-14 border-b border-dotted border-[#4A4A4A] bg-transparent"
//                         />
//                         <label
//                             htmlFor="name"
//                             className="absolute left-0 top-0 text-[#A1A1A1]/40 xl:text-[2.5rem] transition-all
//             peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] peer-placeholder-shown:text-[1.8rem]
//             peer-focus:top-[-1.2rem] peer-focus:text-[0.9rem]
//             peer-hover:top-[-1.2rem] peer-hover:text-[0.9rem]
//             peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>

//                     {/* Right text */}
//                     <p className="whitespace-nowrap">&nbsp;, this is my</p>
//                 </div>


//                 {/* Email Input */}
//                 <div className="flex items-center w-full mt-[3.5rem]">
//                     {/* Left Text */}
//                     <p className="whitespace-nowrap">email&nbsp;</p>

//                     {/* Input Field */}
//                     <div className="relative flex-grow">
//                         <input
//                             type="text"
//                             id="email"
//                             placeholder=" "
//                             className="peer w-full focus:outline-0 md:text-left text-[#4A4A4A] font-14 border-b border-dotted border-[#4A4A4A] bg-transparent"
//                         />
//                         <label
//                             htmlFor="email"
//                             className="absolute left-0 top-0 text-[#A1A1A1]/40 xl:text-[2.5rem] transition-all
//             peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] peer-placeholder-shown:text-[1.8rem]
//             peer-focus:top-[-1.2rem] peer-focus:text-[0.9rem]
//             peer-hover:top-[-1.2rem] peer-hover:text-[0.9rem]
//             peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                 </div>

//                 {/* Phone Input */}
//                 <div className="flex items-center w-full mt-[3.5rem]">
//                     {/* Left Text */}
//                     <p className="whitespace-nowrap">and my phone number&nbsp;</p>

//                     {/* Input Field */}
//                     <div className="relative flex-grow">
//                         <input
//                             type="text"
//                             id="phone"
//                             placeholder=" "
//                             className="peer w-full focus:outline-0 md:text-left text-[#4A4A4A] font-14 border-b border-dotted border-[#4A4A4A] bg-transparent"
//                         />
//                         <label
//                             htmlFor="phone"
//                             className="absolute left-0 top-0 text-[#A1A1A1]/40 xl:text-[2.5rem] transition-all
//             peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] peer-placeholder-shown:text-[1.8rem]
//             peer-focus:top-[-1.2rem] peer-focus:text-[0.9rem]
//             peer-hover:top-[-1.2rem] peer-hover:text-[0.9rem]
//             peer-not-placeholder-shown:hidden"
//                         >
//                             type...
//                         </label>
//                     </div>
//                 </div>


//                 {/* requirement */}
//                 <RequirementInput />

//                 {/* input */}

//                 <div className="relative flex-grow mt-[5rem]">
//                     <input
//                         type="text"
//                         id="msg"
//                         placeholder=" "
//                         className="peer w-full focus:outline-0 md:text-left text-[#4A4A4A] font-14 border-b border-dotted border-[#4A4A4A] bg-transparent"
//                     />
//                     <label
//                         htmlFor="msg"
//                         className="absolute left-0 top-0 text-[#A1A1A1]/40 xl:text-[2.5rem] transition-all
//             peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-30%] peer-placeholder-shown:text-[1.8rem]
//             peer-focus:top-[-1.2rem] peer-focus:text-[0.9rem]
//             peer-hover:top-[-1.2rem] peer-hover:text-[0.9rem]
//             peer-not-placeholder-shown:hidden"
//                     >
//                         type...
//                     </label>
//                 </div>


//             </div>
//             <div className='flex justify-end'>
//                 <div className='flex items-center pt-[5rem] gap-3.5 '>
//                     <label className="checkbox-label-Form">
//                         <input type="checkbox" />
//                         <span className="checkmark-Form"></span>
//                     </label>
//                     <p className='text-[0.8rem] text-[#A4A4A4] '>By clicking the button, you agree to discover market <Link href={''} className='border border-t-0 border-x-0'>Terms of Use </Link> and <Link href={''} className='border border-t-0 border-x-0'>Privacy Policy.</Link></p>
//                     <Link
//                         ref={btnRef}
//                         href={''}
//                         className=' px-4 py-2 relative text-[0.9rem] overflow-hidden flex items-center rounded-[10rem] gap-3 uppercase border border-[#9C458B]'
//                     >
//                         <span ref={textsRef} className='relative z-10 text-[#9C458B]'>Submit</span>
//                         <div
//                             ref={dotRef}
//                             className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#9C458B] "
//                             style={{ transformOrigin: "center" }}
//                         ></div>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }
