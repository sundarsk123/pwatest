import React from 'react'
import OurBrands from './OurBrands'
import Image from 'next/image'
import frame from '@/Assets/Home/frame.png'

// Import images
import design1 from '@/Assets/Home/design-1.png'
import design2 from '@/Assets/Home/design-2.png'
import design3 from '@/Assets/Home/design-3.png'
import design4 from '@/Assets/Home/design-4.png'
import design5 from '@/Assets/Home/design-5.png'

// Import SVGs
import svg1 from '@/Assets/Home/design-svg-1.svg'
import svg2 from '@/Assets/Home/design-svg-2.svg'
import svg3 from '@/Assets/Home/design-svg-3.svg'
import svg4 from '@/Assets/Home/design-svg-4.svg'
import svg5 from '@/Assets/Home/design-svg-5.svg'

const OurBrandMob = ({
    our_brands_title,
    our_brands_sub_title,
    our_brands,
    our_brand_section_image
}) => {
    // Create a data array for all brands
    const brandsData = [
        {
            id: 1,
            designImage: design1,
            svgImage: svg1,
            altText: "Brand 1",
        },
        {
            id: 2,
            designImage: design2,
            svgImage: svg2,
            altText: "Brand 2",
        },
        {
            id: 3,
            designImage: design3,
            svgImage: svg3,
            altText: "Brand 3",
        },
        {
            id: 4,
            designImage: design4,
            svgImage: svg4,
            altText: "Brand 4",
        },
        {
            id: 5,
            designImage: design5,
            svgImage: svg5,
            altText: "Brand 5",
        },
    ];

    return (
        <div>
            <div className='hidden lg:block'>
                <OurBrands 
                our_brands_title={our_brands_title}
                our_brands_sub_title={our_brands_sub_title}
                our_brands={our_brands}
                our_brand_section_image={our_brand_section_image}
                />
            </div>
            <div className='lg:hidden px-[1.25rem] md:px-[3.75rem] pb-[3.125rem]'>
                <div>
                    <h2 className='text-[1.25rem] leading-[1.1] text-[#1F1F1F] pb-[0.375rem]'>{our_brands_title}</h2>
                    <p className='text-[1rem] leading-[1.2] text-[#1F1F1F]'>{our_brands_sub_title}</p>
                </div>
                <div className='grid grid-cols-2 gap-[0.9375rem] pt-[1.875rem]'>
                    {/* Map through brands data */}
                    {our_brands.map((brand , index) => (
                        <div key={index} className='p-[0.625rem] rounded-[1.25rem] bg-[#F5F5F5]'>
                            <div>
                                <Image
                                    src={brand?.our_brands_image?.url}
                                    width={400}
                                    height={400}
                                    alt={our_brands_title}
                                    className='w-full h-[11.25rem] sm:h-[21.875rem] object-cover rounded-[1.25rem]'
                                />
                            </div>
                            <div className='pt-[1.25rem] pb-[0.625rem] px-[1.25rem]'>
                                <Image
                                    src={brand?.our_brands_logo?.url}
                                    width={400}
                                    height={400}
                                    alt={our_brands_title}
                                    className='w-full h-auto sm:h-[2.5rem]'
                                />
                            </div>
                        </div>
                    ))}

                    {/* Frame image remains separate as it's different from brands */}
                    <div className='overflow-hidden'>
                        <div>
                            <Image
                                src={our_brand_section_image?.url}
                                width={400}
                                height={400}
                                alt="Decorative frame"
                                className='w-full h-full sm:h-[25rem] object-contain -rotate-20'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurBrandMob