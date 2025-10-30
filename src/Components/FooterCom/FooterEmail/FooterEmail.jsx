"use client";
import { Api_End_Point } from "@/Services/Api";
import React, { useState, useEffect } from "react";

export default function FooterEmail({ handleMouseEnter, handleMouseLeave, arrowRef }) {
    const [email, setEmail] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [errors, setErrors] = useState({ email: "", accept: "" });
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState(""); // ✅ Toast message state
    const [showToast, setShowToast] = useState(false); // ✅ Toast visibility

    // ✅ Validate Email
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    // ✅ Show toast for 3 seconds
    const triggerToast = (message) => {
        setToastMsg(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    // ✅ Submit Handler
    const handleSubmit = async () => {
        let hasError = false;
        let newErrors = { email: "", accept: "" };

        // Email Validation
        if (!email) {
            newErrors.email = "Email is required";
            hasError = true;
        } else if (!validateEmail(email)) {
            newErrors.email = "Enter a valid email";
            hasError = true;
        }

        // Checkbox Validation
        if (!accepted) {
            newErrors.accept = "You must accept the privacy policy";
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        // ✅ API Call
        setLoading(true);
        try {
            const response = await fetch(
                `${Api_End_Point}wp-json/artistickssubscription/v1/submit-form`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fsemail: email,
                        fsaccept: accepted ? "yes" : "no",
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                triggerToast("Subscription successful! ✅"); // ✅ Success toast
                setEmail("");
                setAccepted(false);
            } else {
                triggerToast(data?.message || "Something went wrong! ❌");
            }
        } catch (error) {
            triggerToast("Error: Unable to submit form ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <div className="flex relative pt-[1rem] max-w-[28rem]">
                    {/* Email Input */}
                    <input
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-[#8C357B] w-[29rem] text-white placeholder-[#E489D2] placeholder:italic px-6 py-5 rounded-[20rem] border ${errors.email ? "border-red-500" : "border-transparent"
                            } focus:outline-none`}
                    />
                    <button
                        className="absolute right-0 cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <svg
                            ref={arrowRef}
                            style={{ width: "3.7rem", height: "3.7rem" }}
                            viewBox="0 0 67 67"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="67" height="67" rx="33.5" fill="#7E1F6B" />
                            <path
                                d="M23.9961 42.0284L42.0289 23.9956"
                                stroke="white"
                                strokeWidth="1.65"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M23.9961 23.9956H42.0289V42.0284"
                                stroke="white"
                                strokeWidth="1.65"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Email Error */}
                {/* {errors.email && <p className="text-red-500 text-sm pt-2">{errors.email}</p>} */}

                {/* Checkbox */}
                <div className="flex gap-2 pt-7 items-center lg:justify-center">
                    <div className="relative">
                        <label className="checkbox-label">
                            <div></div>
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                className={`${errors.accept ? "border-red-500" : ""}`}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <p
                        className={`text-[0.8rem] ${errors.accept ? "text-red-500" : "text-[#D7D7D7]"
                            }`}
                    >
                        I accept the terms of the Privacy Policy regarding my personal data.
                    </p>
                </div>
            </div>

            {/* ✅ Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-slide-up">
                    {toastMsg}
                </div>
            )}

            {/* ✅ Animation for toast */}
            <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </>
    );
}
