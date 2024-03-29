import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import { useLocation, useNavigate } from "react-router-dom"
import Modal from 'react-modal';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
// import { Chat } from "../../Components/Chat/Chat";
import ChatJahit from '../../Components/Chat/ChatJahit';
import { FaBars } from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GetPesananPakaian } from '../../Graphql/query';
import { KonfirmasiPembayaranPesananJahit } from '../../Graphql/mutation';
import { CancelPesananJahit } from '../../Graphql/mutation';
import { GetPesananJahitDetail } from '../../Graphql/query';
import { HandleInputNomorResiJahit } from '../../Graphql/mutation';
import { AiFillCloseCircle } from "react-icons/ai"

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

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',

    width: '600px',
    height: '600px',
    overflowX: 'scroll',
    margin: '50px auto 50px',
    
  },
};

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
  // console.log("data chat", dataChat)
  const {data: dataPesanan, loading: loadingPesanan, error: errorPesanan} = useQuery(GetPesananJahitDetail, {variables: { _eq: location.state.id}})
  console.log("cek data pesanan", dataPesanan)

  const [cancelPesanan, {loading: loadingCancelPesanan}] = useMutation(CancelPesananJahit)
  const handleCancelPesanan = () => {
    if(window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?") == true) {
      cancelPesanan({
        variables: {
          _eq: location.state.id,
          status: "Dibatalkan"
        }
      })
      toast.success("Pesanan berhasil dibatalkan")
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } else {

    }
  }


  const [nomorResi, setNomorResi] = useState("")
  const handleChangeNomorResi = (e) => {
    setNomorResi(e.target.value)
  }

  const [handleNomorResi, {loading: loadingInputResi}] = useMutation(HandleInputNomorResiJahit)
  const handleInputResi = () => {
    handleNomorResi({
      variables: {
        id: location.state.id,
        nomor_resi: nomorResi
      }
    })
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const [konfirmasiPembayaran, {loading: loadingKonfirmasiPembayaran}] = useMutation(KonfirmasiPembayaranPesananJahit)
  const [statusPesanan, setStatusPesanan] = useState("")

  const handleChangeStatusPesanan = (e) => {
    setStatusPesanan(e.target.value)
  }

  console.log("cek status", statusPesanan)

  const handleKonfirmasiPembayaran = () => {
    konfirmasiPembayaran({
      variables: {
        _eq: location.state.id,
        status: "Pembayaran Diterima"
      }
    })
    setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  }

  const handleMenolakPembayaran = () => {
    konfirmasiPembayaran({
      variables: {
        _eq: location.state.id,
        status: "Pembayaran Ditolak"
      }
    })
    setTimeout(() => {
        window.location.reload(false);
    }, 1500);
  }

  const handleStatusPesanan = () => {
    konfirmasiPembayaran({
      variables: {
        _eq: location.state.id,
        status: statusPesanan
      }
    })
    setTimeout(() => {
        window.location.reload(false);
    }, 1500);
  }

  return (
    <div className='flex h-full'>
      <ToastContainer/>
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
                      <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.name}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Jenis Kelamin</h6>
                      <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.jenis_kelamin}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Email</h6>
                      <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.email}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>No. Telepon</h6>
                      <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.telephone}</p>
                    </div>
                  </div>
                  <div className='mt-10 lg:mt-0'>
                    <h6 className='font-medium'>Alamat Pengiriman</h6>
                    <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].alamat}, {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].kelurahan}, {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].kecamatan}, {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].kabupaten_kota}, {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].provinsi}, {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].negara}, {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].user.alamats[0].kodepos}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='font-semibold text-lg text-primary'>Informasi Jahit</h3>
                <div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Jenis Pakaian</h6>
                    <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].jenis_pakaian}</p>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Kain</h6>
                    <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].kain}</p>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Ukuran Tubuh</h6>
                    <div className='border rounded-md p-3'>
                      <p>Lebar Bahu : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lebar_bahu} cm</p>
                      <p>Panjang Baju : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].panjang_baju} cm</p>
                      <p>Panjang Lengan : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].panjang_lengan} cm</p>
                      <p>Lingkar Dada : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_dada} cm</p>
                      <p>Lingkar Kerung Lengan : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_kerung_lengan} cm</p>
                      <p>Lingkar Leher : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_leher} cm</p>
                      <p>Lingkar Pergelangan Tangan : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_pergelangan_tangan} cm</p>
                      <p>Lingkar Pinggang : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_pinggang} cm</p>
                      <p>Lingkar Pinggul : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_pinggul} cm</p>
                    </div>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Unggahan Desain</h6>
                    <div className='border rounded-md p-3 grid gap-2'>
                      {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].foto_desains.map((el) => 
                      <div>
                        <a href={el.foto} target='_blank'>
                          <img className='w-40 h-40 object-cover' src={el.foto}></img>
                        </a>
                      </div>
                      )}
                    </div>
                  </div>
                  <div className='mt-5'>
                    <h6 className='font-medium'>Deskripsi Desain</h6>
                    <div className='border rounded-md p-3'>
                      <div dangerouslySetInnerHTML={{__html: dataPesanan?.sekargaluhetnic_pesanan_jahit[0].deskripsi}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-8 lg:col-span-4 mt-10 lg:mt-0'>
              <h3 className='font-semibold text-lg text-primary'>Informasi Pesanan</h3>
              <div className='mt-3'>
                <div className='mt-2'>
                  <h6 className='font-medium'>Status Pemesanan</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Kode Pemesanan</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].kode_pemesanan}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Tanggal Pemesanan</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].created_at}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Biaya Ongkir</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].ongkir}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Opsi Pengiriman</h6>
                  <p className='capitalize'>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].opsi_pengiriman}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Total Biaya</h6>
                  <p>Rp{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].total_biaya.toLocaleString()}</p>
                </div>
                <div className='mt-2'>
                  <h6 className='font-medium'>Nomor Resi</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].nomor_resi}</p>
                </div>

                { dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Pembayaran Diterima" ||      dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Pesanan Diproses" ||
                dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Menunggu Kurir" ||
                dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Pesanan Diantar" ?
                <div className='mt-5'>
                  <h3 className='font-semibold text-lg text-primary'>Perbarui Status Pesanan</h3>
                  <select onClick={handleChangeStatusPesanan} className='w-full border-b mt-3 focus:outline-none focus:border-secondary hover:border-secondary p-1'>
                    <option>-- Pilih Status Pemesanan --</option>
                    <option value="Pesanan Diproses">Pesanan Diproses</option>
                    <option value="Menunggu Kurir">Menunggu Kurir</option>
                    <option value="Pesanan Diantar">Pesanan Diantar</option>
                  </select>
                  <div className='flex justify-end'>
                    <button onClick={handleStatusPesanan} className='bg-secondary px-3 py-1 text-white rounded-md mt-3'>Simpan</button>
                  </div>
                </div> : ""
              }

              {
                dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Menunggu Kurir" ? 
                <div className='mt-5'>
                  <p>Masukkan Nomor Resi Pengiriman</p>
                  <input type='text' onChange={handleChangeNomorResi} className='border-b focus:border-secondary focus:outline-none w-full'></input>
                  <div className='mt-3 flex justify-end'>
                    <button className='border border-secondary rounded-md px-5 py-1 bg-secondary text-white' onClick={handleInputResi}>Update Nomor Resi</button>
                  </div>
                </div> : ""
              }

              { dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Dibatalkan" ?
                <p className='bg-red-500 text-center text-white py-3 rounded-md mt-10'>Pesanan Dibatalkan</p>
                : 
                <div className='mt-5'>
                  <div className='grid gap-2'>
                    <button onClick={openModal} className='bg-secondary2 text-white w-full py-2 rounded-md border border-secondary2 mt-2 hover:bg-white hover:text-primary duration-200'>Cek Pembayaran</button>
                    <button onClick={popUpModal} className='bg-secondary text-white w-full py-2 rounded-md border border-secondary hover:bg-white hover:text-primary duration-200'>Chat</button>
                    <button onClick={handleCancelPesanan} className='bg-red-600 w-full py-2 rounded-md text-white border border-red-600 hover:bg-white hover:text-red-600 duration-200'>Batalkan Pesanan</button>
                  </div>
                </div> 
              }


              </div>
            </div>
          </div>
        </div>

        <div className={ chatModal ? 'fixed w-full h-full bg-gray-400 opacity-50 top-0' : 'hidden'} onClick={popUpModal}></div>

        <div className={ chatModal ? 'block': 'hidden' }>
          <div className="w-full md:w-[400px] fixed bottom-5 right-0 md:right-5 bg-white border shadow px-1 py-2 rounded-md">
            <ChatJahit id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          // style={customStyles}
          className="bg-white shadow-md p-10 w-full md:w-[550px] mx-auto h-[550px] overflow-y-scroll absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md"
        >
          <div className='w-full md:w-96 mx-auto'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModal}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-lg'>Informasi Pembayaran</h6>
              <div className='mt-5'>
              { dataPesanan?.sekargaluhetnic_pesanan_jahit[0].metode_pembayaran ? 
                  <div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Nama Rekening Pemilik</h6>
                      <p className='capitalize'>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].nama_rekening_pemilik}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Metode Pembayaran</h6>
                      <p className='capitalize'>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].metode_pembayaran}</p>
                    </div>
                    <div className='mt-2'>
                      <h6 className='font-medium'>Bukti Pembayaran</h6>
                      <a className='' href={dataPesanan?.sekargaluhetnic_pesanan_jahit[0].bukti_pembayaran} target='_blank'>
                        <div className='border w-fit rounded-md p-2 mt-1'>
                          <img className='w-80' src={dataPesanan?.sekargaluhetnic_pesanan_jahit[0].bukti_pembayaran}></img>
                        </div>
                      </a>
                    </div>
                    { dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Pembayaran Diterima" ?
                      <div className='mt-10'>
                        <button className='w-full bg-secondary3 text-secondary py-2 cursor-default border border-secondary3 rounded-md'>Pembayaran sudah terkonfirmasi</button>
                      </div> :
                    <div className='mt-5 grid gap-3'>
                      <button onClick={handleKonfirmasiPembayaran} className='bg-secondary w-full text-white rounded-md py-2 border border-secondary hover:bg-white hover:text-secondary duration-200'>Konfirmasi Pembayaran</button>
                      <button onClick={handleMenolakPembayaran} className='bg-secondary2 w-full text-white rounded-md py-2 border border-secondary2 hover:bg-white hover:text-secondary duration-200'>Tolak Pembayaran</button>
                    </div>
                    }

                  </div> :
                  <p>Pelanggan belum melakukan pembayaran.</p>
                }
              </div>
            </div>

          </div>
        </Modal>
      </main>

    </div>
  )
}
