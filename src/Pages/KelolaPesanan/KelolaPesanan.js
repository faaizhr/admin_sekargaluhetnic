import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import {useNavigate} from "react-router-dom"

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import LoadingSvg from '../../Components/Loading/LoadingSvg';
import { FaBars } from "react-icons/fa"

import { GetPesananPakaian } from '../../Graphql/query';

function KelolaPesanan() {

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

  const {data, loading, error} = useQuery(GetPesananPakaian)
  console.log(data) 

  const handleDetail = (pesanan) => {
    navigate(`/kelola-pesanan-pakaian/${pesanan.id}`, {
      state: {
          id: pesanan.id,
          created_at: pesanan.created_at,
          ongkir: pesanan.ongkir,
          pesanan_session: pesanan.pesanan_session,
          pesanans: pesanan.pesanans,
          status: pesanan.status,
          total_harga: pesanan.total_harga,
          user: pesanan.user,
          user_id: pesanan.user_id,
          chats: pesanan.chats,
          opsi_pengiriman: pesanan.opsi_pengiriman,
          kode_pemesanan: pesanan.kode_pemesanan,
      }
    })
  }



  return (
    <div className='flex h-full'>
      <Navigation />
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>
        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Kelola Pesanan</h2>
            <div className='mt-10'>
              {/* <div className='flex justify-end'>
                <button onClick={openModalInsert} className='bg-secondary px-10 py-3 rounded-md text-white font-medium border border-secondary hover:bg-white hover:text-secondary duration-200'>Tambah Kain</button>
              </div> */}

              {loading ? <LoadingSvg/> :
              <table className='table-fixed w-full mt-10 '>
                <thead>
                  <tr className='table-fixed'>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>No. </th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Pemesanan</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kuantitas</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Status</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Total Harga</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.sekargaluhetnic_pesanan_pakaian?.map((pesanan) => 
                  <tr className='py-2 border-b'>
                    <th className='py-2'>{pesanan.id}</th>
                    <td className='px-5 py-1 text-center'>{pesanan.kode_pemesanan}</td>
                    <td className='px-5 py-1 text-center'>{pesanan.pesanans.length}</td>
                    <td className='px-5 py-1 text-center'>{pesanan.status}</td>
                    <th className='px-5 py-1 font-normal'>Rp{pesanan.total_harga?.toLocaleString()}</th>
                    <th className='px-5 py-1'>
                      <button onClick={() => handleDetail(pesanan)} className='bg-secondary text-white px-2 py-1 rounded-md text-sm border border-secondary font-light mr-2' >Detail
                      </button>
                    </th>
                  </tr>
                  )}
                </tbody>
              </table>
              }
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default KelolaPesanan