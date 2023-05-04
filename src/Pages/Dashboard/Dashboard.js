import React from 'react'
import { useEffect, useState } from 'react';
import { useProSidebar } from 'react-pro-sidebar';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';

import { HiBookOpen, HiOutlineLogout, HiOutlineBars3CenterLeft } from "react-icons/hi"
import { FaBars } from "react-icons/fa"
import { MdOutlineSell } from "react-icons/md"



function Dashboard() {

  const { collapseSidebar, toggleSidebar } = useProSidebar();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    width < 1024 && collapseSidebar(true);
    width > 1024 && collapseSidebar(false);
  },[width]);

  

  return (
    <div className='flex h-full'>
      <Navigation />
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>
        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Dashboard</h2>
            <div className='mt-10 flex justify-start gap-10'>
              <div className='bg-secondary text-white w-60 p-2 rounded-md'>
                <h6 className='text-center uppercase font-medium text-lg'>Total Penjualan Pakaian</h6>
                <div className='flex justify-center gap-3 items-center'>
                  <MdOutlineSell className='my-2 w-7 h-7 fill-secondary3'/>
                  <p className='text-xl font-medium'>231</p> 
                </div>
              </div>
              <div className='bg-secondary text-white w-60 p-2 rounded-md'>
                <h6 className='text-center uppercase font-medium text-lg'>Total Penjualan Pakaian</h6>
                <div className='flex justify-center gap-3 items-center'>
                  <MdOutlineSell className='my-2 w-7 h-7 fill-secondary3'/>
                  <p className='text-xl font-medium'>231</p> 
                </div>
              </div>
              <div className='bg-secondary text-white w-60 p-2 rounded-md'>
                <h6 className='text-center uppercase font-medium text-lg'>Total Penjualan Pakaian</h6>
                <div className='flex justify-center gap-3 items-center'>
                  <MdOutlineSell className='my-2 w-7 h-7 fill-secondary3'/>
                  <p className='text-xl font-medium'>231</p> 
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard