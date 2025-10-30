import FooterApi from '@/Components/FooterApi/FooterApi'
import Navbar from '@/Components/Navbar'
import AboutBanner from '@/Layout/About/AboutBanner/AboutBanner'
import AboutIntro from '@/Layout/About/AboutIntro/AboutIntro'
import OurApproach from '@/Layout/About/Approach/OurApproach'
import Celebrate from '@/Layout/About/Celebrate/Celebrate'
import HeartStory from '@/Layout/About/HeartStory/HeartStory'
import OurLeader from '@/Layout/About/OurLeader/OurLeader'
import PrimeLocation from '@/Layout/About/PrimeLocation/PrimeLocation'
import WhyChoose from '@/Layout/About/WhyChoose/WhyChoose'
import BannerForm from '@/Layout/Products/BannerForm/BannerForm'
import { AboutApiFn, FooterApiFn } from '@/Services/Api'
import ErrorControl from '@/Services/CatchError'
import React, { Fragment } from 'react'

export default async function page() {
    try {
        const aboutdatas = await AboutApiFn();
        const Footerdatas = await FooterApiFn();
        return (
            <Fragment>
                <Navbar />
                {aboutdatas && aboutdatas.map((data, index) => {
                    return (
                        <Fragment key={index}>
                            <AboutIntro {...data?.acf} />
                            <Celebrate {...data?.acf} />
                            <HeartStory {...data?.acf} />
                            <PrimeLocation {...data?.acf} />
                            <AboutBanner {...data?.acf} />
                            <OurApproach {...data?.acf} />
                            <WhyChoose {...data?.acf} />
                            <OurLeader {...data?.acf} />
                            <BannerForm Footerdatas={Footerdatas} pages={"About page"} />
                        </Fragment>
                    )
                })}
                <FooterApi />
            </Fragment>
        )
    } catch (error) {
        console.error("Error in Home component:", error);
        return <ErrorControl />
    }
}
