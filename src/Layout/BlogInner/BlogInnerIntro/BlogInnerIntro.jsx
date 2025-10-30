import Image from 'next/image'
import React from 'react'
import Content from '../Content/Content'



const BlogInnerIntro = ({ post , Blogdata }) => {
    return (
        <>
        <div className='relative'>
            <Image
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                alt={post.title.rendered}
                className='w-full h-[91.6vh] md:h-screen object-cover'
                width={1000}
                height={1000}
            />
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20'>

            </div>
            <div className='absolute bottom-5 left-0 max-w-[70rem]'>
                <h1 className='lg:text-[3rem] leading-[1.2] text-[2rem] px-[1rem] md:px-[3.5rem] text-white'>{post?.title?.rendered}</h1>
            </div>
        </div>
        <Content  Allblog={Blogdata} Projectdata={post}/>
        </>
    )
}

export default BlogInnerIntro