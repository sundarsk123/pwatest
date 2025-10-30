import FooterApi from '@/Components/FooterApi/FooterApi'
import Navbar from '@/Components/Navbar'
import ContactMap from '@/Layout/contact/ContactMap/ContactMap'
import Form from '@/Layout/contact/Form'
import Intro from '@/Layout/contact/Intro'
import { ContactApiFn } from '@/Services/Api'
import ErrorControl from '@/Services/CatchError'
import React, { Fragment } from 'react'

export default async function page() {
  try {
    const conatactdatas = await ContactApiFn();
    return (
      <Fragment>
        <Navbar />
        {conatactdatas && conatactdatas.map((data, index) => {
          return (
            <Fragment key={index}>
              <Intro {...data?.acf}/>
              <Form />
              <ContactMap {...data?.acf}/>
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
