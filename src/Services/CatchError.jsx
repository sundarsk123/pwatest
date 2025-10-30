"use client"
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { useEffect } from 'react'

export default function ErrorControl() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#9C458B] text-black">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className='flex h-[90vh] justify-center items-center'>
            <span class="loader"></span>
          </div>
        </div>
        <Footer />
      </div>

    </div>
  )
}