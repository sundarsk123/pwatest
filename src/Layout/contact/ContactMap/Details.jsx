import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const MapDetailCard = ({ city, address, image , rating , totalStars , view , directions  }) => {
  return (
    <Link href={directions} target="_blank" className="block">
      <div className="bg-white sm:w-[22rem] rounded-[1rem] overflow-hidden 
                      transform transition-all duration-500 ease-in-out
                      hover:shadow-2xl hover:-translate-y-2">
        <div className="relative overflow-hidden px-2 py-2">
          <Image
            src={image}
            width={370}
            height={200}
            alt={city || 'location'}
            className="w-full h-[12.5rem] md:h-[12.5rem] object-cover rounded-[1rem] 
                       transform transition-transform duration-500 ease-in-out hover:scale-101 "
          />
        </div>

        <div className="px-[0.625rem] py-[0.625rem]">
          <p className='py-[1rem] text-[1rem] md:text-[1.2rem] text-[#1F1F1F] max-w-[18.75rem] md:max-w-[20rem]'>
            {address}
          </p>
          <div className='flex justify-between items-center pb-[0.625rem]'>
            <p className="text-[0.9rem] md:text-[1rem] text-[#717171] flex items-center gap-[0.375rem] md:gap-[0.375rem]">
              <span>{rating}</span>
              <span className="flex items-center">
                {[...Array(totalStars)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-[0.8125rem] h-[0.8125rem] md:w-[1.3rem] md:h-[1.3rem]"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z"
                      fill={i < Math.round(rating) ? "#FBBD05" : "#E5E7EB"} 
                    />
                  </svg>
                ))}
              </span>
              <span>({view})</span>
            </p>
            <span className='text-[#9C458B] underline text-[0.9rem] md:text-[1rem]'>
              GET DIRECTION
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MapDetailCard
