import React from 'react'
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, useLazyQuery, useSubscription } from "@apollo/client"
import { useProSidebar } from 'react-pro-sidebar';
import ReactplosiveModal from "reactplosive-modal";
import Modal from 'react-modal';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import LoadingSvg from '../../Components/Loading/LoadingSvg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaBars } from "react-icons/fa"
import { AiFillCloseCircle } from "react-icons/ai"

import { GetKain } from '../../Graphql/query';
import { SubscriptionKain } from '../../Graphql/subscription';
import { GetLazyKain } from '../../Graphql/query';
import { InsertKain } from '../../Graphql/mutation';
import { DeleteKain } from '../../Graphql/mutation';
import { UpdateKain } from '../../Graphql/mutation';
import Cookies from 'js-cookie';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function KelolaKain() {

  const [width, setWidth] = useState(window.innerWidth);
  const {data, loading, error} = useSubscription(SubscriptionKain)
  const [getSelectKain, {data: dataSelect, loading: loadingSelect, error: errorSelect}] = useLazyQuery(GetLazyKain);

  // console.log("cek kain", data)

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


  const [kain, setKain] = useState({
    foto: "",
    nama: "",
    deskripsi: "",
    harga: "",
  });
  // console.log("state kain", kain)

  const [insertKain, {loading: loadingInsertKain}] = useMutation(InsertKain)
  const [deleteKain, {loading: loadingDeleteKain}] = useMutation(DeleteKain)
  const [updateKain, {loading: loadingUpdateKain}] = useMutation(UpdateKain)

  const [modalIsOpenInsert, setIsOpenInsert] = useState(false);
  function openModalInsert() {
    setIsOpenInsert(true);
  }
  function closeModalInsert() {
    setIsOpenInsert(false);
  }

  const handleInputInsertKain = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setKain({
      ...kain,
      [name]: value,
    });
  }

  const handleInsertKain = () => {
    insertKain({
      variables: {
        object: {
          nama: kain.nama,
          foto: kain.foto,
          harga: kain.harga,
          deskripsi: kain.deskripsi
        }
      }
    })
    toast.success("Data berhasil ditambahkan")
    setIsOpenInsert(false)

    // window.location.reload(false);
  }

  const handleDeleteKain = (value) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus katalog ini?") == true ) {
      deleteKain({
        variables: {
          _eq: value
        }
      })
      toast.success("Data berhasil dihapus")
      // window.location.reload(false);
    } else {
      // window.location.reload(false);
    }
  }

  const [updateStateKain, setUpdateStateKain] = useState({})

  const [modalIsOpenUpdate, setIsOpenUpdate] = useState(false);
  function openModalUpdate() {
    setIsOpenUpdate(true);
  }
  function closeModalUpdate() {
    setIsOpenUpdate(false);
  }

  const handleChangeUpdateKain = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateStateKain({
      ...updateStateKain,
      [name]: value,
    });
  }

  const handleSelectKain = (value) => {

    const found = data.sekargaluhetnic_kain?.find(el => el.id == value);
    console.log(found.id);
    setUpdateStateKain(found);
  }

  const handleUpdateKain = () => {
    updateKain({
      variables: {
          _eq: updateStateKain.id,
          _set: {
            foto: updateStateKain.foto,
            deskripsi: updateStateKain.deskripsi,
            harga: updateStateKain.harga,
            nama: updateStateKain.nama
        }
      }
    })
    toast.success("Data berhasil diubah")
    setIsOpenUpdate(false)
  }
  console.log(updateStateKain)
  

  return (
    <div className='flex h-full'>
      <ToastContainer/>
      <Navigation />
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>

        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Kelola Kain</h2>
            <div className='mt-10'>
              <div className='flex justify-end'>
                <button onClick={openModalInsert} className='bg-secondary px-10 py-3 rounded-md text-white font-medium border border-secondary hover:bg-white hover:text-secondary duration-200'>Tambah Kain</button>
              </div>

              {loading ? <LoadingSvg/> :
              <table className='table-fixed w-full mt-10 '>
                <thead>
                  <tr className='table-fixed'>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Foto</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Nama Kain</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Deskripsi Kain</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Harga</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.sekargaluhetnic_kain?.map((kain) => 
                  <tr className='py-2 border-b'>
                    <th className='py-2'><img className='w-32 h-32 object-cover' src={kain.foto}></img></th>
                    <td className='px-5 py-1'>{kain.nama}</td>
                    <td className='px-5 py-1'>{kain.deskripsi}</td>
                    <th className='px-5 py-1 font-normal'>Rp{kain.harga.toLocaleString()}</th>
                    <th className='px-5 py-1'>
                      <button className='bg-secondary2 text-white px-2 py-1 rounded-md text-sm border border-secondary2 font-light mr-2' onClick={() => {
                        openModalUpdate();
                        handleSelectKain(kain.id);}}>Ubah
                      </button>
                      <button className='bg-red-700 text-white px-2 py-1 rounded-md border border-red-700 text-sm font-light' onClick={() => handleDeleteKain(kain.id)}>Hapus</button>
                    </th>
                  </tr>
                  )}
                </tbody>
              </table>
              }
            </div>
          </div>
        </div>
        
        {/* INSERT MODAL */}
        <Modal
          isOpen={modalIsOpenInsert}
          onRequestClose={closeModalInsert}
          style={customStyles}
        >
          <div className='w-96'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalInsert}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-lg'>Tambah Kain</h6>
              <div className='mt-5'>
                <div className='mb-5'>
                  <p className='text-primary'>Gambar Kain</p>
                  {/* <input onChange={handleInputInsertKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='foto' placeholder='Gambar Kain'></input> */}
                  <input type='file' className='mt-2 text-sm'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Nama Kain</p>
                  <input onChange={handleInputInsertKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='nama' placeholder='Nama Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Deksripsi</p>
                  <input onChange={handleInputInsertKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='deskripsi' placeholder='Deskripsi'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Harga</p>
                  <input onChange={handleInputInsertKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='harga' placeholder='Harga'></input>
                </div>
                <div className='flex justify-center mt-10'>
                  <button className='bg-secondary px-10 py-2 rounded-md text-white border border-secondary hover:bg-white hover:text-secondary duration-200 mx-auto' onClick={handleInsertKain}>Submit</button>
                </div>
              </div>
            </div>

          </div>
        </Modal>

        {/* UPDATE MODAL */}
        <Modal
          isOpen={modalIsOpenUpdate}
          onRequestClose={closeModalUpdate}
          style={customStyles}
        >
          <div className='w-96'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalUpdate}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-lg'>Update Kain</h6>
              <div className='mt-5'>
                <div className='mb-5'>
                  <p className='text-primary'>Gambar Kain</p>
                  {/* <input onChange={handleChangeUpdateKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='foto' value={updateStateKain.foto} placeholder='Gambar Kain'></input> */}
                  <img src={updateStateKain.foto}></img>
                  <input type='file' className='mt-2 text-sm'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Nama Kain</p>
                  <input onChange={handleChangeUpdateKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='nama' value={updateStateKain.nama} placeholder='Nama Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Deksripsi</p>
                  <input onChange={handleChangeUpdateKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='deskripsi' value={updateStateKain.deskripsi} placeholder='Deskripsi'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Harga</p>
                  <input onChange={handleChangeUpdateKain} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='harga' value={updateStateKain.harga} placeholder='Harga'></input>
                </div>
                <div className='flex justify-center mt-10'>
                  <button className='bg-secondary px-10 py-2 rounded-md text-white border border-secondary hover:bg-white hover:text-secondary duration-200 mx-auto' onClick={handleUpdateKain}>Submit</button>
                </div>
              </div>
            </div>

          </div>
        </Modal>
      </main>
    </div>
  )
}

export default KelolaKain