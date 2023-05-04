import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import {useNavigate} from "react-router-dom"

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import { FaBars } from "react-icons/fa"

import { GetPesananJahit } from '../../Graphql/query';

export default function KelolaPesananJahit() {

  const navigate = useNavigate()
  
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


  const {data, loading, error} = useQuery(GetPesananJahit)
  console.log("cek data", data)

  return (
    <div className='flex h-full'>
      <Navigation />
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>
        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Kelola Pesanan Jahit</h2>
            <div className='mt-10'>
              {/* <div className='flex justify-end'>
                <button onClick={openModalInsert} className='bg-secondary px-10 py-3 rounded-md text-white font-medium border border-secondary hover:bg-white hover:text-secondary duration-200'>Tambah Kain</button>
              </div> */}

              <table className='table-fixed w-full mt-10 '>
                <thead>
                  <tr className='table-fixed'>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>No. </th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Pemesanan</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Jenis Pakaian</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Status</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Total Harga</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.sekargaluhetnic_pesanan_jahit?.map((jahit) => 
                  <tr className='py-2 border-b'>
                    <th className='py-2'>No</th>
                    <td className='px-5 py-1'>Kode Pemesanan</td>
                    <td className='px-5 py-1'>{jahit.jenis_pakaian}</td>
                    <td className='px-5 py-1'>jahit.status</td>
                    <th className='px-5 py-1 font-normal'>Harga</th>
                    <th className='px-5 py-1'>
                      {/* <button onClick={() => handleDetail(jahit)} className='bg-secondary text-white px-2 py-1 rounded-md text-sm border border-secondary font-light mr-2' >Detail
                      </button> */}
                    </th>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
