import FooterApi from "@/Components/FooterApi/FooterApi";
import Navbar from "@/Components/Navbar";
import Celebrating from "@/Layout/Home/Celebrating/Celebrating";
import Customization from "@/Layout/Home/Customization/Customization";
import Interiors from "@/Layout/Home/Interiors";
import Intro from "@/Layout/Home/Intro";
import MobileInteriors from "@/Layout/Home/MobileInteriors/MobileInteriors";
import OurBrandMob from "@/Layout/Home/OurBrands/OurBrandMob";
import OurProduct from "@/Layout/Home/OurProduct/OurProduct";
import OurRecentWorkMob from "@/Layout/Home/OurRecentWork/OurRecentWorkMob";
import RecentProject from "@/Layout/Home/RecentProject/RecentProject";
import { HomeApiFn } from "@/Services/Api";
import ErrorControl from "@/Services/CatchError";
import { Fragment } from "react";

export default async function Home() {
  try {
    const Homedatas = await HomeApiFn();
    return (
      <Fragment>
        <Navbar />
        {Homedatas && Homedatas.map((data, index) => {
          return (
            <Fragment key={index}>
              <Intro {...data?.acf} />
              <MobileInteriors {...data?.acf} />
              <Interiors {...data?.acf} />
              <OurBrandMob {...data?.acf} />
              <OurProduct {...data?.acf} />
              <Celebrating {...data?.acf} />
              <OurRecentWorkMob {...data?.acf} />
              <Customization {...data?.acf} />
              <RecentProject {...data?.acf} />
            </Fragment>
          )
        })}
        <FooterApi />
      </Fragment>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return <ErrorControl />
  }

}