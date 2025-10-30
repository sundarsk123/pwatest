"use client";
import React, { useState } from "react";
import Image from "next/image";
import bannerimg from "@/Assets/Product/attachments/enter.svg";
import { Api_End_Point } from "@/Services/Api";

const fields = ["Name", "Email", "Phone", "Message"];

const ArtForm = ({pages}) => {
  const [activeField, setActiveField] = useState("Name");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({}); // Validation errors
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [activeField]: e.target.value,
    });
    setErrors({ ...errors, [activeField]: "" }); // Clear error on typing
  };

  // Check if all fields are filled
  const isFormComplete = fields.every((field) => formData[field].trim() !== "");

  // Validate current field before moving to next
  const validateCurrentField = () => {
    if (formData[activeField].trim() === "") {
      setErrors({
        ...errors,
        [activeField]: `${activeField} is required`,
      });
      return false;
    }
    return true;
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (!validateCurrentField()) return; // Stop if current field is empty

    const currentIndex = fields.indexOf(activeField);
    const nextIndex = (currentIndex + 1) % fields.length;
    setActiveField(fields[nextIndex]);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isFormComplete) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  // Submit form
  const handleSubmit = async () => {
    // Validate all fields before submitting
    const newErrors = {};
    fields.forEach((field) => {
      if (formData[field].trim() === "") {
        newErrors[field] = `${field} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const payload = {
      fname: formData.Name,
      femail: formData.Email,
      fmobile: formData.Phone,
      fmessage: formData.Message,
      fpage: pages, // Hidden field
    };

    try {
      const res = await fetch(
        `${Api_End_Point}wp-json/artisticksfootercontact/v1/submit-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide popup after 3 sec

        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          Message: "",
        });
        setErrors({});
        setActiveField("Name");
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="pt-[7rem] sm:pt-[8.125rem] pb-[3.5rem] md:pb-[5rem] px-[20px] md:px-[3.75rem] max-w-[80rem] mx-auto text-white">
        {/* Active Input */}
        <div className="w-full">
          <input
            className={`placeholder:opacity-70 font-tan-pearl pt-[0.375rem] border-b text-[1.5rem] md:text-[2rem] lg:text-[3.75rem] w-full focus:outline-none bg-transparent transition-colors duration-300
              ${errors[activeField]
                ? "border-red-500 placeholder-red-500 text-red-500"
                : "border-white text-white"
              }`}
            type="text"
            placeholder={errors[activeField] ? errors[activeField] : activeField}
            value={formData[activeField]}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Enter key handler
          />
        </div>

        {/* Field Tabs + Next/Submit */}
        <div className="py-[1.25rem] flex justify-between">
          {/* Field Tabs */}
          <div className="flex gap-[8px] lg:gap-[1.25rem]">
            {fields.map((field) => (
              <div
                key={field}
                className={`cursor-pointer ${activeField === field ? "border-b border-white" : "opacity-20"
                  }`}
                onClick={() => setActiveField(field)}
              >
                <span className="text-[0.875rem] md:text-[1rem] text-white">
                  {field}
                </span>
              </div>
            ))}
          </div>

          {/* Next or Submit Button */}
          {!isFormComplete ? (
            // Show "Next" if form is incomplete
            <div
              className="flex gap-[0.5rem] items-center cursor-pointer"
              onClick={handleNext}
            >
              <Image
                src={bannerimg}
                width={1.6875 * 16}
                height={1.3125 * 16}
                alt="next"
                className="w-[1.125rem] h-[0.75rem] md:w-[1.6875rem] md:h-auto"
              />
              <span className="text-[0.875rem] md:text-[1rem] text-white">
                Next
              </span>
            </div>
          ) : (
            // Show "Submit" when form is complete
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex gap-[0.5rem] items-center cursor-pointer"
            >

              <Image
                src={bannerimg}
                width={1.6875 * 16}
                height={1.3125 * 16}
                alt="next"
                className="w-[1.125rem] h-[0.75rem] md:w-[1.6875rem] md:h-auto"
              />
              <span className="text-[0.875rem] md:text-[1rem] text-white">
                {loading ? "Submitting..." : "Submit"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-500">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default ArtForm;



























// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import bannerimg from "@/Assets/Product/attachments/enter.svg";

// const fields = ["Name", "Email", "Phone", "Message"];

// const ArtForm = () => {
//   const [activeField, setActiveField] = useState("Name");
//   const [formData, setFormData] = useState({
//     Name: "",
//     Email: "",
//     Phone: "",
//     Message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [activeField]: e.target.value,
//     });
//   };

//   return (
//     <div className="pt-[7rem] sm:pt-[8.125rem] pb-[3.5rem] md:pb-[5rem] px-[20px] md:px-[3.75rem] max-w-[80rem] mx-auto">
//       {/* Active Input Box */}
//       <div className="w-full ">
//         <input
//           className="placeholder:text-white opacity-70 font-tan-pearl pt-[0.375rem] border-b border-white text-[1.5rem] md:text-[2rem] lg:text-[3.75rem] w-full focus:text-white focus:outline-none bg-transparent"
//           type="text"
//           placeholder={activeField}
//           value={formData[activeField]}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Field Tabs */}
//       <div className="py-[1.25rem] flex justify-between">
//         <div className="flex gap-[8px] lg:gap-[1.25rem]">
//           {fields.map((field) => (
//             <div
//               key={field}
//               className={`cursor-pointer ${activeField === field
//                   ? "border-b border-white"
//                   : "opacity-20"
//                 }`}
//               onClick={() => setActiveField(field)}
//             >
//               <span className="text-[0.875rem] md:text-[1rem] text-white">{field}</span>
//             </div>
//           ))}
//         </div>

//         {/* Next Button */}
//         <div
//           className="flex gap-[0.5rem]  items-center cursor-pointer"
//           onClick={() => {
//             const currentIndex = fields.indexOf(activeField);
//             const nextIndex = (currentIndex + 1) % fields.length;
//             setActiveField(fields[nextIndex]);
//           }}
//         >
//           <Image src={bannerimg} width={1.6875 * 16} height={1.3125 * 16} alt="next" className="w-[1.125rem] h-[0.75rem] md:w-[1.6875rem] md:h-auto" />
//           <span className="text-[0.875rem] md:text-[1rem] text-white">Next</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtForm;
