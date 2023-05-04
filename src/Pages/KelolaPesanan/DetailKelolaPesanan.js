import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import { useLocation, useNavigate } from "react-router-dom"

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import { Chat } from "../../Components/Chat/Chat";
import { FaBars } from "react-icons/fa"

import { GetPesananPakaian } from '../../Graphql/query';
import { CancelPesanan } from '../../Graphql/mutation';

const SubscriptionChat = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_chat(where: {pesanan_pakaian_id: {_eq: $_eq}}) {
    id
    message
    pesanan_pakaian_id
    user_id
  }
}
`;

export default function DetailKelolaPesanan() {

  const location = useLocation()
  console.log("cek state", location.state)

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

  const [chatModal, setChatModal] = useState(false);

  const popUpModal = () => {
    if (chatModal == false) {
      setChatModal(true)
    } else if (chatModal == true) {
      setChatModal(false)
    }
  }

  const {data: dataChat, loading: loadingChat, error:errorChat} = useSubscription(SubscriptionChat, {variables: { _eq: location.state.id}})
  console.log("data chat", dataChat)

  const [cancelPesanan, {loading: loadingCancelPesanan}] = useMutation(CancelPesanan)
  const handleCancelPesanan = () => {
    cancelPesanan({
      variables: {
        _eq: location.state.id,
        status: "Dibatalkan"
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
          <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>DETAIL PESANAN</h2>
          <div className='grid lg:grid-cols-12 mt-14 gap-10'>
            <div className='col-span-8'>
              <div className='mb-10'>
                <h3 className='font-semibold text-lg text-primary'>Identitas Pemesan</h3>
                <div className='grid lg:grid-cols-2'>
                  <div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Nama</h6>
                      <p>{location.state.user.name}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Jenis Kelamin</h6>
                      <p>{location.state.user.jenis_kelamin}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Email</h6>
                      <p>{location.state.user.email}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>No. Telepon</h6>
                      <p>{location.state.user.telephone}</p>
                    </div>
                  </div>
                  <div className='mt-10 lg:mt-0'>
                    <h6 className='font-medium'>Alamat Pengiriman</h6>
                    <p>{location.state.user.alamats[0].alamat}, {location.state.user.alamats[0].kelurahan}, {location.state.user.alamats[0].kecamatan}, {location.state.user.alamats[0].kabupaten_kota}, {location.state.user.alamats[0].provinsi}, {location.state.user.alamats[0].negara}, {location.state.user.alamats[0].kodepos}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='font-semibold text-lg text-primary'>Produk yang Dipesan</h3>
                <div>
                  <h6 className='font-medium'>Jumlah Produk :  <span className='font-normal'>{location.state.pesanans.length}</span></h6>
                  <div className='grid gap-5'>
                    {location.state.pesanans?.map((produk) => 
                    <div className='py-2 border-b grid grid-cols-3'>
                      <img className='col-span-1 w-32 h-32 object-cover' src={produk.katalog.foto}></img>
                      <div className='col-span-2 flex flex-col justify-between'>
                        <div className=''>
                          <p>{produk.katalog.nama}</p>
                          <p className='text-sm'>{produk.katalog.gender}</p>
                          <p className='font-medium text-gray-500 text-sm'>Kode Produk</p>
                        </div>
                        <p className='font-semibold '>Rp{produk.katalog.harga.toLocaleString()}</p>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-8 lg:col-span-4 mt-10 lg:mt-0'>
              <h3 className='font-semibold text-lg text-primary'>Informasi Pesanan</h3>
              <div className='mt-3'>
                <div className='mt-2'>
                  <h6 className='font-medium'>Status Pemesanan</h6>
                  <p>{location.state.status}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Kode Pemesanan</h6>
                  <p>{location.state.pesanan_session}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Tanggal Pemesanan</h6>
                  <p>{location.state.created_at}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Biaya Ongkir</h6>
                  <p>{location.state.ongkir}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Total Biaya</h6>
                  <p>Rp{location.state.total_harga.toLocaleString()}</p>
                </div>
                <div className='mt-5'>
                  <h6 className='font-medium'>Chat dengan pelanggan</h6>
                  <div className='grid gap-2'>
                    <button onClick={popUpModal} className='bg-secondary text-white w-full py-2 rounded-md border border-secondary mt-2 hover:bg-white hover:text-primary duration-200'>Chat</button>
                    <button onClick={handleCancelPesanan} className='bg-red-600 w-full py-2 rounded-md text-white border border-red-600 hover:bg-white hover:text-red-600 duration-200'>Batalkan Pesanan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ chatModal ? 'block': 'hidden' }>
          <div className="w-[400px] fixed bottom-5 right-5 bg-white border shadow px-1 py-2 rounded-md">
            <Chat id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
          </div>
        </div>
      </main>

    </div>
  )
}
