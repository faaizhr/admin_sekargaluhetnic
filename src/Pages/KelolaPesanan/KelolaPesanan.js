import React from 'react'
import { useEffect, useState } from 'react';
import { useProSidebar } from 'react-pro-sidebar';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import { FaBars } from "react-icons/fa"

function KelolaPesanan() {
  
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
        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
          <div>Kelola Pesanan</div>

        </div>
      </main>
    </div>
  )
}

export default KelolaPesanan