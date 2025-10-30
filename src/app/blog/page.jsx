import FooterApi from '@/Components/FooterApi/FooterApi'
import Navbar from '@/Components/Navbar'
import Card from '@/Layout/Blog/Card'
import Intro from '@/Layout/Blog/Intro'
import { BlogApiFn } from '@/Services/Api'
import React, { Fragment } from 'react'

export default async function page() {
  try {
    const Blogdata = await BlogApiFn();
    return (
      <Fragment>
        <Navbar />
        <Intro />
        {Blogdata &&
          <Card data={Blogdata} />
        }
        <FooterApi />
      </Fragment>
    )
  } catch (error) {
    console.error("Error in Home component:", error);
    return <ErrorControl />
  }
}
