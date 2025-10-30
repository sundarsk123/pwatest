import FooterApi from '@/Components/FooterApi/FooterApi'
import Navbar from '@/Components/Navbar'
import Main from '@/Layout/OurWork/WorkFilter/Main'
import WorkIntro from '@/Layout/OurWork/WorkIntro/WorkIntro'
import BannerForm from '@/Layout/Products/BannerForm/BannerForm'
import { FooterApiFn, WorksApiFn } from '@/Services/Api'
import ErrorControl from '@/Services/CatchError'
import React, { Fragment } from 'react'

export default async function page() {
  try {
    const worksdatas = await WorksApiFn();
    const Footerdatas = await FooterApiFn();
    return (
      <Fragment>
        <Navbar />
        <WorkIntro />
        <Main worksdatas={worksdatas}/>
        <BannerForm Footerdatas={Footerdatas} pages={"ourworks page"}/>
        <FooterApi />
      </Fragment>
    )
  } catch (error) {
    console.error("Error in Works component:", error);
    return <ErrorControl />
  }
}
