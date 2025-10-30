import FooterApi from '@/Components/FooterApi/FooterApi'
import Navbar from '@/Components/Navbar'
import BannerForm from '@/Layout/Products/BannerForm/BannerForm'
import ProductIntro from '@/Layout/Products/ProductIntro/ProductIntro'
import Sculpture from '@/Layout/Products/Sculpture/Sculpture'
import { FooterApiFn, ProductsApiFn } from '@/Services/Api'
import ErrorControl from '@/Services/CatchError'
import React, { Fragment } from 'react'

export default async function page() {
  try {
    const Productsdatas = await ProductsApiFn();
      const Footerdatas = await FooterApiFn();
    return (
      <Fragment>
        <Navbar bgcolor={false} />
        {Productsdatas && Productsdatas.map((data, index) => {
          return (
            <Fragment key={index}>
              <ProductIntro data={data}/>
              <Sculpture data={data}/>
              <BannerForm Footerdatas={Footerdatas} pages={"products page"}/>
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
