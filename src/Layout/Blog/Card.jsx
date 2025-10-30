"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Filter from "./Filter";

export default function Card({ data }) {
  // ✅ Clean up data from WP API
  const blogs = data?.map((item, index) => ({
    id: index,
    title: item?.title?.rendered || "Untitled Post",
    slug: item?.slug || "",
    date: new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    categories: Array.isArray(item?._embedded?.["wp:term"]?.[0])
      ? item._embedded["wp:term"][0].map((cat) => cat?.name)
      : [],
    image: item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
  })) || [];


  const dynamicCategories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        blogs.flatMap((blog) => blog.categories).filter((cat) => cat !== "Blog")
      ),
    ];

    return ["All", ...uniqueCategories]; // Add "All" only here
  }, [blogs]);


  // ✅ Group blogs automatically (main + 2 sub-cards)
  function groupBlogs(data) {
    const grouped = [];
    for (let i = 0; i < data.length; i += 3) {
      grouped.push({
        main: data[i],
        subCards: data.slice(i + 1, i + 3),
      });
    }
    return grouped;
  }

  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all blogs

  // ✅ Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return blogs;
    return blogs.filter((blog) =>
      blog.categories.includes(selectedCategory)
    );
  }, [selectedCategory, blogs]);

  const blogRows = groupBlogs(filteredBlogs);

  return (
    <div className="px-[20px] md:px-[3.75rem] py-[3.125rem] md:py-[6.25rem]">
      {/* Filter Dropdown */}
      <Filter
        categories={dynamicCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-col gap-[3.25rem] mt-[3.25rem]">
        {blogRows.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blogs found.</p>
        ) : (
          blogRows.map((row, index) => (
            <div
              key={row.main.id}
              className={`flex flex-col md:flex-row gap-[1.125rem] md:gap-[3.25rem] justify-between ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* LEFT SIDE - MAIN BIG CARD */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-[1rem]">
                <Link href={`blog/${row.main.slug}`} className="h-full w-full relative block group">
                  <Image
                    src={row.main.image}
                    alt={row.main.title}
                    width={1521}
                    height={1080}
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute bottom-[0.9rem] left-[0.9rem] md:bottom-[1.5rem] md:left-[1.5rem] z-20 rounded-[2rem] ">
                    {/* Category Badge */}
                    {row.main.categories.length > 0 && (
                      <div className="max-w-[7rem] md:max-w-[10rem] text-center -mb-3.5 z-30 relative ml-[1rem] lg:ml-[2rem]">
                        <p className="text-white bg-[#8C357B] px-[1rem] py-[0.6rem] rounded-[0.5rem]">
                          {row.main.categories.join(", ")}
                        </p>
                      </div>
                    )}
                    <div className="bg-white pt-[1.5rem] md:pt-[2.5rem] pb-2.5 px-[1rem] md:px-[2.5rem] rounded-[1rem] ">
                      <div>
                        <h2 className="max-w-[14rem] xl:max-w-[20rem] text-[0.8rem] !leading-[1.3] xl:text-[1.2rem]">
                          {row.main.title}
                        </h2>
                        <p className="flex justify-end pt-2.5 text-[0.8rem] md:text-[1rem]">
                          {row.main.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* RIGHT SIDE - TWO SMALL CARDS */}
              <div className="w-full md:w-1/2 grid grid-rows-2 gap-[1.125rem] md:gap-[3.25rem]">
                {row.subCards.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={`blog/${subItem.slug}`}
                    className="relative block group overflow-hidden rounded-[1rem]"
                  >
                    <Image
                      src={subItem.image}
                      alt={subItem.title}
                      width={1521}
                      height={1080}
                      className="w-full h-[22rem] md:h-[18rem] object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                    />
                    <div className="absolute bottom-[0.9rem] left-[0.9rem] md:bottom-[1.5rem] md:left-[1.5rem] z-20 rounded-[2rem] ">
                      {/* Category Badge */}
                      {subItem.categories.length > 0 && (
                        <div className="max-w-[7rem] md:max-w-[10rem] text-center -mb-3.5 z-30 relative ml-[1rem] lg:ml-[2rem]">
                          <p className="text-white bg-[#8C357B] px-[1rem] py-[0.6rem] rounded-[0.5rem]">
                            {subItem.categories.join(", ")}
                          </p>
                        </div>
                      )}
                      <div className="bg-white pt-[1.5rem] md:pt-[2.5rem] pb-2.5 px-[1rem] md:px-[2.5rem] rounded-[1rem] ">
                        <div>
                          <h2 className="max-w-[14rem] xl:max-w-[20rem] text-[0.8rem] !leading-[1.3] xl:text-[1.2rem]">
                            {subItem.title}
                          </h2>
                          <p className="flex justify-end pt-2.5 text-[0.8rem] md:text-[1rem]">
                            {subItem.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}





// ✅ Simulate flat API response

// const blogs = [
//   {
//     id: 1,
//     title: "The Art of Digital Illustration, Trends and Techniques",
//     date: "Sep 08, 2025",
//     categories: "Handle",
//     image: blogCard1,
//   },
//   {
//     id: 2,
//     title: "Exploring Modern Web Development Trends",
//     date: "Sep 09, 2025",
//     categories: "Main Doors",
//     image: blogCard1,
//   },
//   {
//     id: 3,
//     title: "Mastering UX/UI Design for Digital Products",
//     date: "Sep 10, 2025",
//     categories: "Mirrors",
//     image: blogCard1,
//   },
//   {
//     id: 4,
//     title: "AI Revolution in Creative Industries",
//     date: "Sep 11, 2025",
//     categories: "Murals",
//     image: blogCard1,
//   },
//   {
//     id: 5,
//     title: "Tech for the Future",
//     date: "Sep 12, 2025",
//     categories: "Name Plate",
//     image: blogCard1,
//   },
//   {
//     id: 6,
//     title: "Building Better Design Systems",
//     date: "Sep 13, 2025",
//     categories: "Handle",
//     image: blogCard1,
//   },
// ];