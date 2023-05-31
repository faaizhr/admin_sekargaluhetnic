import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import {useNavigate} from "react-router-dom"

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import LoadingSvg from '../../Components/Loading/LoadingSvg';
import { FaBars, FaFilter } from "react-icons/fa"
import { RxCaretSort } from "react-icons/rx"

import { GetPesananJahit, GetPesananJahitFilter } from '../../Graphql/query';

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


  const {data: dataJahit, loading, error} = useQuery(GetPesananJahit)
  // console.log("cek data", data)

  const handleDetail = (pesanan) => {
    navigate(`/kelola-pesanan-jahit/${pesanan.id}`, {
      state: {
          id: pesanan.id,
          created_at: pesanan.created_at,
          updated_at: pesanan.updated_at,
          ongkir: pesanan.ongkir,
          opsi_pengiriman: pesanan.opsi_pengiriman,
          jahit_session: pesanan.jahit_session,
          foto_desains: pesanan.foto_desains,
          status: pesanan.status,
          jenis_pakaian: pesanan.jenis_pakaian,
          kain: pesanan.kain,
          deskripsi: pesanan.deskripsi,
          total_biaya: pesanan.total_biaya,
          user: pesanan.user,
          user_id: pesanan.user_id,
          kode_pemesanan: pesanan.kode_pemesanan,
          panjang_baju: pesanan.panjang_baju,
          panjang_lengan: pesanan.panjang_lengan,
          lebar_bahu: pesanan.lebar_bahu,
          lingkar_dada: pesanan.lingkar_dada,
          lingkar_kerung_lengan: pesanan.lingkar_kerung_lengan,
          lingkar_leher: pesanan.lingkar_leher,
          lingkar_pergelangan_tangan: pesanan.lingkar_pergelangan_tangan,
          lingkar_pinggang: pesanan.lingkar_pinggang,
          lingkar_pinggul: pesanan.lingkar_pinggul,
      }
    })
  }

   // FILTER DATA ======================================

   const [filterStatus, setFilterStatus] = useState("%%")
   const {data: dataFilter} = useQuery(GetPesananJahitFilter, { variables: {_ilike : filterStatus}})
 
   const handleChangeFilter = (e) => {
     setFilterStatus(e.target.value)
   }
 
   // console.log("cek data filter", dataFilter)
   // console.log("cek filter", filterStatus)
 
   // ==================================================

  // SORTING DATA =====================================

  const [data, setData] = useState()
  useEffect(() => {
    setData(dataFilter?.sekargaluhetnic_pesanan_jahit)
  
  }, [dataFilter])
  
  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a,b) => 
        a[col] > b[col] ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a,b) => 
        a[col] < b[col] ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  // console.log(data)

  // ==================================================

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

              <div>
                <div className='border w-fit px-4 py-2 rounded-md'>
                  <div className='flex justify-start items-center gap-2'>
                    <FaFilter className='w-3 h-3 fill-secondary'/>
                    <select name='filter_status' onChange={handleChangeFilter} className='focus:outline-none text-sm'>
                      <option value="filter" disabled selected="selected">Filter</option>
                      <option value="%%">Semua Status</option>
                      <option value="menunggu pembayaran">Menunggu Pembayaran</option>
                      <option value="pembayaran diproses">Pembayaran Diproses</option>
                      <option value="pembayaran diterima">Pembayaran Diterima</option>
                      <option value="pembayaran ditolak">Pembayaran Ditolak</option>
                      <option value="Pesanan Diproses">Pesanan Diproses</option>
                      <option value="Menunggu Kurir">Menunggu Kurir</option>
                      <option value="Pesanan Diantar">Pesanan Diantar</option>
                      <option value="Pesanan Selesai">Pesanan Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>
              </div>

              {loading ? <LoadingSvg/> : 
              <table className='table-fixed w-full mt-10 '>
                <thead>
                  <tr className='table-fixed'>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>
                      <div className='flex justify-center items-center gap-3'>
                        <p className='font-semibold uppercase text-secondary'>No</p>
                        <RxCaretSort onClick={() => sorting("id")} className='fill-secondary w-5 h-5 cursor-pointer'/>
                      </div>
                    </th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>
                      <div className='flex justify-center items-center gap-3'>
                        <p className='font-semibold uppercase text-secondary'>Kode Pemesanan</p>
                        <RxCaretSort onClick={() => sorting("kode_pemesanan")} className='fill-secondary w-5 h-5 cursor-pointer'/>
                      </div>
                    </th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Jenis Pakaian</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Status</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>
                      <div className='flex justify-center items-center gap-3'>
                        <p className='font-semibold uppercase text-secondary'>Total Harga</p>
                        <RxCaretSort onClick={() => sorting("total_harga")} className='fill-secondary w-5 h-5 cursor-pointer'/>
                      </div>
                    </th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((jahit) => 
                  <tr className='py-2 border-b'>
                    <th className='py-2'>{jahit.id}</th>
                    <td className='px-5 py-1 text-center'>{jahit.kode_pemesanan}</td>
                    <td className='px-5 py-1 text-center'>{jahit.jenis_pakaian}</td>
                    <td className='px-5 py-1 text-center'>{jahit.status}</td>
                    <th className='px-5 py-1 font-normal'>Rp{jahit.total_biaya.toLocaleString()}</th>
                    <th className='px-5 py-1'>
                      <button onClick={() => handleDetail(jahit)} className='bg-secondary text-white px-2 py-1 rounded-md text-sm border border-secondary font-light mr-2' >Detail
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
