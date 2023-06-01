import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, useLazyQuery, useSubscription } from "@apollo/client"
import { useNavigate } from 'react-router-dom';
import { useProSidebar } from 'react-pro-sidebar';
import ReactplosiveModal from "reactplosive-modal";
import Modal from 'react-modal';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import LoadingSvg from '../../Components/Loading/LoadingSvg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaBars } from "react-icons/fa"
import { AiFillCloseCircle, AiOutlineRightCircle } from "react-icons/ai"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { SubscriptionReturBarangPakaian } from '../../Graphql/subscription';
import { SubscriptionReturBarangJahit } from '../../Graphql/subscription';
import { HandleChangeStatusRetur } from '../../Graphql/mutation';

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

export default function KelolaReturBarang() {

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

  const { collapseSidebar, toggleSidebar } = useProSidebar();

  const {data: dataPakaian, loading: loadingPakaian, error: errorPakaian} = useSubscription(SubscriptionReturBarangPakaian)
  const {data: dataJahit, loading: loadingJahit, error: errorJahit} = useSubscription(SubscriptionReturBarangJahit)
  // console.log("cek data", data)

  // HANDLE MODAL =================================================

  const [modalIsOpenPakaian, setIsOpenPakaian] = useState(false);
  function openModalPakaian() {
    setIsOpenPakaian(true);
  }
  function closeModalPakaian() {
    setIsOpenPakaian(false);
  }


  const [modalIsOpenJahit, setIsOpenJahit] = useState(false);
  function openModalJahit() {
    setIsOpenJahit(true);
  }
  function closeModalJahit() {
    setIsOpenJahit(false);
  }

  // =======================================================

  // HANDLE SELECT RETUR BARANG ============================

  const [selectData, setSelectData] = useState({})

  const handleSelectDataPakaian = (value) => {
    const found = dataPakaian.sekargaluhetnic_retur_produk?.find(el => el.id == value);
    // console.log(found.id);
    setSelectData(found);
  }

  const handleSelectDataJahit = (value) => {
    const found = dataJahit.sekargaluhetnic_retur_produk?.find(el => el.id == value);
    // console.log(found.id);
    setSelectData(found);
  }
  console.log(selectData)

  // =======================================================

  // HANDLE NAVIGATE TO DETAIL PESANAN =====================

  const navigate = useNavigate()

  const handleNavigateDetailPesanan = () => {
    navigate(`/kelola-pesanan-pakaian/${selectData.retur_produk_pesanan_pakaian.id}`, {
      state: {
        id: selectData.retur_produk_pesanan_pakaian.id
      }
    })
  }

  const handleNavigateDetailJahit = () => {
    navigate(`/kelola-pesanan-jahit/${selectData.retur_produk_pesanan_jahit.id}`, {
      state: {
        id: selectData.retur_produk_pesanan_jahit.id
      }
    })
  }

  // =======================================================

  // HANDLE UPDATE STATUS ==================================

  const [updateStatus, {loading: loadingUpdateStatus}] = useMutation(HandleChangeStatusRetur)
  const [status, setStatus] = useState()

  const handleChangeStatusTerima = () => {
    updateStatus({
      variables: {
        _eq: selectData.id,
        status: "Retur Barang Diterima"
      }
    })
    toast.success("Status Retur Barang Berhasil Diubah")
    setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  }

  const handleChangeStatusTolak = () => {
    updateStatus({
      variables: {
        _eq: selectData.id,
        status: "Retur Barang Ditolak"
      }
    })
    toast.success("Status Retur Barang Berhasil Diubah")
    setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleUpdateStatus = () => {
    updateStatus({
      variables: {
        _eq: selectData.id,
        status: status
      }
    })
    toast.success("Status Retur Barang Berhasil Diubah")
    setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  }

  // =======================================================

  return (
    <div className='flex h-full'>
      <ToastContainer/>
      <Navigation/>
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>

        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Kelola Retur Barang</h2>
            <div className='mt-10'>
              <div>

              </div>

              <Tabs>
                <TabList>
                  <Tab>Retur Produk Pakaian</Tab>
                  <Tab>Retur Produk Jahit</Tab>
                </TabList>

                <TabPanel>
                  <div>
                    { loadingPakaian ? <LoadingSvg/> :
                      <table className='table-fixed w-full mt-10 '>
                        <thead>
                          <tr className='table-fixed'>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Retur</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Pemesanan</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Alasan</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Status</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataPakaian?.sekargaluhetnic_retur_produk?.map((el) => 
                          <tr className='py-2 border-b'>
                            <td className='px-5 py-1'>{el.id}</td>
                            <td className='px-5 py-1'>{el.retur_produk_pesanan_pakaian.kode_pemesanan}</td>
                            <th className='px-5 py-1 font-normal'>{el.alasan}</th>
                            <th className='px-5 py-1 font-normal'>{el.status}</th>
                            <th className='px-5 py-1'>
                              <button className='bg-secondary2 text-white px-2 py-1 rounded-md text-sm border border-secondary2 font-light mr-2' onClick={() => {
                                openModalPakaian();
                                handleSelectDataPakaian(el.id)
                              }}>Detail
                              </button>
                              {/* <button className='bg-red-700 text-white px-2 py-1 rounded-md border border-red-700 text-sm font-light' >Hapus</button> */}
                            </th>
                          </tr>
                          )}
                        </tbody>
                      </table>
                    }
                  </div>
                </TabPanel>
                <TabPanel>
                  <div>
                    { loadingJahit ? <LoadingSvg/> :
                      <table className='table-fixed w-full mt-10 '>
                        <thead>
                          <tr className='table-fixed'>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Retur</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Pemesanan</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Alasan</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Status</th>
                            <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataJahit?.sekargaluhetnic_retur_produk?.map((el) => 
                          <tr className='py-2 border-b'>
                            <td className='px-5 py-1'>{el.id}</td>
                            <td className='px-5 py-1'>{el.retur_produk_pesanan_jahit.kode_pemesanan}</td>
                            <th className='px-5 py-1 font-normal'>{el.alasan}</th>
                            <th className='px-5 py-1 font-normal'>{el.status}</th>
                            <th className='px-5 py-1'>
                              <button className='bg-secondary2 text-white px-2 py-1 rounded-md text-sm border border-secondary2 font-light mr-2' onClick={() => {
                                openModalJahit();
                                handleSelectDataJahit(el.id)
                              }}>Detail
                              </button>
                              {/* <button className='bg-red-700 text-white px-2 py-1 rounded-md border border-red-700 text-sm font-light'>Hapus</button> */}
                            </th>
                          </tr>
                          )}
                        </tbody>
                      </table>
                    }
                  </div>
                </TabPanel>
              </Tabs>


              

            </div>
          </div>
        </div>

        {/* MODAL RETUR PAKAIAN*/}

        <Modal
          isOpen={modalIsOpenPakaian}
          onRequestClose={closeModalPakaian}
          style={customStyles}
        >
          <div className='w-full'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalPakaian}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-xl text-secondary'>Permintaan Retur Barang</h6>
              <div className='mt-5'>
                <h6 className='font-medium text-lg text-secondary'>Informasi Produk</h6>
                <div className='grid gap-2 mt-4'>
                  <div>
                    <p className='font-medium'>Kode Pemesanan</p>
                    <p className='text-sm'>{selectData?.retur_produk_pesanan_pakaian?.kode_pemesanan}</p>
                  </div>
                  <div>
                    <p className='font-medium'>Total Harga</p>
                    <p className='text-sm'>Rp{selectData?.retur_produk_pesanan_pakaian?.total_harga.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className='font-medium'>Jumlah Produk</p>
                    <p className='text-sm'>{selectData?.retur_produk_pesanan_pakaian?.pesanans.length} Produk</p>
                  </div>
                  <div className='flex justify-end'>
                    <div onClick={handleNavigateDetailPesanan} className='flex items-center gap-2 cursor-pointer'>
                      <h6 className='text-right text-sm underline font-medium'>Lihat Pesanan</h6>
                      <AiOutlineRightCircle/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <h6 className='font-medium text-lg text-secondary'>Informasi Pengembalian</h6>
                <div className='grid gap-2 mt-4'>
                  <div>
                    <p className='font-medium'>Alasan Pengembalian</p>
                    <p className='text-sm'>{selectData.alasan}</p>
                  </div>
                  <div>
                    <p className='font-medium'>Status</p>
                    <p className='text-sm'>{selectData.status}</p>
                  </div>
                </div>

                { selectData.status == "Menunggu Konfirmasi" ? 
                  <div className='flex justify-center gap-10 mt-10'>
                    <button className='bg-secondary px-5 py-2 border border-secondary rounded-md text-white hover:bg-white hover:text-secondary duration-200' onClick={handleChangeStatusTerima}>Terima Retur Barang</button>
                    <button className='bg-secondary2 px-5 py-2 border border-secondary2 rounded-md text-white hover:bg-white hover:text-secondary2 duration-200' onClick={handleChangeStatusTolak}>Tolak Retur Barang</button>
                  </div>
                  :
                  <div className='mt-10'>
                    <h6 className='text-secondary text-lg font-medium'>Retur Produk Sudah Dikonfirmasi</h6>
                      <p className='font-medium mt-3'>Ubah Status Retur Produk</p>
                      <select onChange={handleChangeStatus} className='border-b w-full p-1 mb-2 text-sm'>
                        <option value="Barang Diterima UMKM">Barang Diterima UMKM</option>
                        <option value="Barang Diproses">Barang Diproses</option>
                        <option value="Barang Sedang Dikirim ke Pelanggan">Barang Sedang Dikirim ke Pelanggan</option>
                      </select>
                      <div className='mt-2 flex justify-center'>
                        <button onClick={handleUpdateStatus} className='bg-secondary text-white px-5 py-1 rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200'>Submit</button>
                      </div>
                  </div>
                }
              </div>
            </div>

          </div>
        </Modal>

        {/* MODAL RETUR JAHIT */}
        <Modal
          isOpen={modalIsOpenJahit}
          onRequestClose={closeModalJahit}
          style={customStyles}
        >
          <div className='w-full'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalJahit}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-xl text-secondary'>Permintaan Retur Barang</h6>
              <div className='mt-5'>
                <h6 className='font-medium text-lg text-secondary'>Informasi Produk</h6>
                <div className='grid gap-2 mt-4'>
                  <div>
                    <p className='font-medium'>Kode Pemesanan</p>
                    <p className='text-sm'>{selectData?.retur_produk_pesanan_jahit?.kode_pemesanan}</p>
                  </div>
                  <div>
                    <p className='font-medium'>Total Harga</p>
                    <p className='text-sm'>Rp{selectData?.retur_produk_pesanan_jahit?.total_biaya.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className='font-medium'>Jumlah Produk</p>
                    <p className='text-sm'>1 Produk</p>
                  </div>
                  <div className='flex justify-end'>
                    <div onClick={handleNavigateDetailJahit} className='flex items-center gap-2 cursor-pointer'>
                      <h6 className='text-right text-sm underline font-medium'>Lihat Pesanan</h6>
                      <AiOutlineRightCircle/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <h6 className='font-medium text-lg text-secondary'>Informasi Pengembalian</h6>
                <div className='grid gap-2 mt-4'>
                    <div>
                      <div>
                        <p className='font-medium'>Alasan Pengembalian</p>
                        <p className='text-sm'>{selectData.alasan}</p>
                      </div>
                      <div>
                        <p className='font-medium'>Status</p>
                        <p className='text-sm'>{selectData.status}</p>
                      </div>
                    </div>
                </div>

                { selectData.status == "Menunggu Konfirmasi" ? 
                  <div className='flex justify-center gap-10 mt-10'>
                    <button className='bg-secondary px-5 py-2 border border-secondary rounded-md text-white hover:bg-white hover:text-secondary duration-200' onClick={handleChangeStatusTerima}>Terima Retur Barang</button>
                    <button className='bg-secondary2 px-5 py-2 border border-secondary2 rounded-md text-white hover:bg-white hover:text-secondary2 duration-200' onClick={handleChangeStatusTolak}>Tolak Retur Barang</button>
                  </div>
                  :
                  <div className='mt-10'>
                    <h6 className='text-secondary text-lg font-medium'>Retur Produk Sudah Dikonfirmasi</h6>
                      <p className='font-medium mt-3'>Ubah Status Retur Produk</p>
                      <select onChange={handleChangeStatus} className='border-b w-full p-1 mb-2 text-sm'>
                        <option value="Barang Diterima UMKM">Barang Diterima UMKM</option>
                        <option value="Barang Diproses">Barang Diproses</option>
                        <option value="Barang Sedang Dikirim ke Pelanggan">Barang Sedang Dikirim ke Pelanggan</option>
                      </select>
                      <div className='mt-2 flex justify-center'>
                        <button onClick={handleUpdateStatus} className='bg-secondary text-white px-5 py-1 rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200'>Submit</button>
                      </div>
                  </div>
                }

                <div className='flex justify-center gap-10 mt-10'>
                  
                </div>
              </div>
            </div>

          </div>
        </Modal>

      </main>

    </div>
  )
}
