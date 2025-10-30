import FooterApi from '@/Components/FooterApi/FooterApi';
import Navbar from '@/Components/Navbar';
import BlogInnerIntro from '@/Layout/BlogInner/BlogInnerIntro/BlogInnerIntro';
import { BlogApiFn, BlogSingleFunction } from '@/Services/Api';
import ErrorControl from '@/Services/CatchError';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateStaticParams() {
  try {
    const pages = await BlogApiFn();

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}


const page = async ({ params }) => {

  try {

    const { slug } = await params;
    const post = await BlogSingleFunction(slug);
     if (!post) {
      return notFound()
    }
    const Blogdata = await BlogApiFn();
    return (
      <div>

        <Navbar/>
        <BlogInnerIntro post={post} Blogdata={Blogdata} />
        <FooterApi />
      </div>
    )

  } catch (error) {
    console.error("Error fetching blog data:", error);
     return <ErrorControl />
  }

}

export default page