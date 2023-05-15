import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import { useLocation, useNavigate } from "react-router-dom"

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
// import { Chat } from "../../Components/Chat/Chat";
import ChatJahit from '../../Components/Chat/ChatJahit';
import { FaBars } from "react-icons/fa"

import { GetPesananPakaian } from '../../Graphql/query';
import { CancelPesananJahit } from '../../Graphql/mutation';

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

export default function DetailKelolaPesananJahit() {

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

  const [cancelPesanan, {loading: loadingCancelPesanan}] = useMutation(CancelPesananJahit)
  const handleCancelPesanan = () => {
    cancelPesanan({
      variables: {
        _eq: location.state.id,
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
                <h3 className='font-semibold text-lg text-primary'>Informasi Jahit</h3>
                <div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Jenis Pakaian</h6>
                    <p>{location.state.jenis_pakaian}</p>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Kain</h6>
                    <p>{location.state.kain}</p>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Ukuran Tubuh</h6>
                    <p>Lebar Bahu : {location.state.lebar_bahu} cm</p>
                    <p>Panjang Baju : {location.state.panjang_baju} cm</p>
                    <p>Panjang Lengan : {location.state.panjang_lengan} cm</p>
                    <p>Lingkar Dada : {location.state.lingkar_dada} cm</p>
                    <p>Lingkar Kerung Lengan : {location.state.lingkar_kerung_lengan} cm</p>
                    <p>Lingkar Leher : {location.state.lingkar_leher} cm</p>
                    <p>Lingkar Pergelangan Tangan : {location.state.lingkar_pergelangan_tangan} cm</p>
                    <p>Lingkar Pinggang : {location.state.lingkar_pinggang} cm</p>
                    <p>Lingkar Pinggul : {location.state.lingkar_pinggul} cm</p>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Unggahan Desain</h6>
                    <div>
                      {location.state.foto_desains.map((el) => 
                      <div>
                        <img className='w-40 h-40 object-cover' src={el.foto}></img>
                      </div>
                      )}
                    </div>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Deskripsi Desain</h6>
                    <div dangerouslySetInnerHTML={{__html: location.state.deskripsi}}></div>
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
                  <p>{location.state.jahit_session}</p>
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
                  <h6 className='font-medium'>Opsi Pengiriman</h6>
                  <p className='capitalize'>{location.state.opsi_pengiriman}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Total Biaya</h6>
                  <p>Rp{location.state.total_biaya.toLocaleString()}</p>
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
            <ChatJahit id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
          </div>
        </div>
      </main>

    </div>
  )
}
