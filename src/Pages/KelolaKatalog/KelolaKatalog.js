import React from 'react'
import { useEffect, useState } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"
import Modal from 'react-modal';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';

import { FaBars } from "react-icons/fa"
import { AiFillCloseCircle } from "react-icons/ai"

import { GetKatalog } from '../../Graphql/query';
import { InsertKatalog } from '../../Graphql/mutation';
import { DeleteKatalog } from '../../Graphql/mutation';
import { UpdateKatalog } from '../../Graphql/mutation';

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

function KelolaKatalog() {
  
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

  const {data, loading, error} = useQuery(GetKatalog)

  const [katalog, setKatalog] = useState({
    foto: "",
    nama: "", 
    deskripsi: "",
    harga: "",
    gender: ""
  })

  const [insertKatalog, {loading: loadingInsertKatalog}] = useMutation(InsertKatalog)
  const [deleteKatalog, {loading: loadingDeleteKatalog}] = useMutation(DeleteKatalog)
  const [updateKatalog, {loading: loadingUpdateKatalog}] = useMutation(UpdateKatalog)

  const [modalIsOpenInsert, setIsOpenInsert] = useState(false);
  function openModalInsert() {
    setIsOpenInsert(true);
  }
  function closeModalInsert() {
    setIsOpenInsert(false);
  }
  const handleInputInsertKatalog = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setKatalog({
      ...katalog,
      [name]: value,
    });
  }
  console.log("cek katalog", katalog)

  const handleInsertKatalog = () => {
    insertKatalog({
      variables: {
        object: {
          nama: katalog.nama,
          foto: katalog.foto,
          harga: katalog.harga,
          deskripsi: katalog.deskripsi,
          gender: katalog.gender,
        }
      }
    })
    // window.location.reload(false);
  }

  const handleDeleteKatalog = (value) => {
    deleteKatalog({
      variables: {
        _eq: value
      }
    })
    alert("Kain Berhasil Dihapus")
    window.location.reload(false);
  }


  const [updateStateKatalog, setUpdateStateKatalog] = useState({})

  const [modalIsOpenUpdate, setIsOpenUpdate] = useState(false);
  function openModalUpdate() {
    setIsOpenUpdate(true);
  }
  function closeModalUpdate() {
    setIsOpenUpdate(false);
  }

  const handleChangeUpdateKatalog = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateStateKatalog({
      ...updateStateKatalog,
      [name]: value,
    });
  }

  const handleSelectKatalog = (value) => {

    const found = data.sekargaluhetnic_katalog?.find(el => el.id == value);
    console.log(found.id);
    setUpdateStateKatalog(found);
  }

  const handleUpdateKatalog = () => {
    updateKatalog({
      variables: {
          _eq: updateStateKatalog.id,
          _set: {
            foto: updateStateKatalog.foto,
            deskripsi: updateStateKatalog.deskripsi,
            harga: updateStateKatalog.harga,
            nama: updateStateKatalog.nama,
            gender: updateStateKatalog.gender
        }
      }
    })
  }
  console.log(updateStateKatalog)

  return (
    <div className='flex h-full'>
      <Navigation />
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>
        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Kelola Katalog</h2>
            <div className='mt-10'>
              <div className='flex justify-end'>
                <button onClick={openModalInsert} className='bg-secondary px-10 py-3 rounded-md text-white font-medium border border-secondary hover:bg-white hover:text-secondary duration-200'>Tambah Kain</button>
              </div>

              <table className='table-fixed w-full mt-10 '>
                <thead>
                  <tr className='table-fixed'>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Foto </th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Kode Produk</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Nama</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Deskripsi</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Harga</th>
                    <th className='font-semibold uppercase px-5 py-1 text-secondary'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.sekargaluhetnic_katalog?.map((katalog) => 
                  <tr className='py-2 border-b'>
                    <th className='py-2'><img className='w-32 h-32 object-cover' src={katalog.foto}></img></th>
                    <td className='px-5 py-1'>Kode Produk</td>
                    <td className='px-5 py-1'>{katalog.nama}</td>
                    <td className='px-5 py-1'>{katalog.deskripsi}</td>
                    <th className='px-5 py-1 font-normal'>Rp{katalog.harga.toLocaleString()}</th>
                    <th className='px-5 py-1'>
                      <button className='bg-secondary2 text-white px-2 py-1 rounded-md text-sm border border-secondary2 font-light mr-2' onClick={() => {
                        openModalUpdate();
                        handleSelectKatalog(katalog.id);}}>Ubah
                      </button>
                      <button className='bg-red-700 text-white px-2 py-1 rounded-md border border-red-700 text-sm font-light' onClick={() => handleDeleteKatalog(katalog.id)}>Hapus</button>
                    </th>
                  </tr>
                  )}
                </tbody>
              </table>
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
                  <p className='text-primary'>Gambar Katalog</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='foto' placeholder='Gambar Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Nama</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='nama' placeholder='Nama Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Deksripsi</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='deskripsi' placeholder='Deskripsi'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Harga</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='harga' placeholder='Harga'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Gender</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='gender' placeholder='Gender'></input>
                </div>
                <div className='flex justify-center mt-10'>
                  <button className='bg-secondary px-10 py-2 rounded-md text-white border border-secondary hover:bg-white hover:text-secondary duration-200 mx-auto' onClick={handleInsertKatalog}>Submit</button>
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
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='foto' value={updateStateKatalog.foto} placeholder='Gambar Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Nama Kain</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='nama' value={updateStateKatalog.nama} placeholder='Nama Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Deksripsi</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='deskripsi' value={updateStateKatalog.deskripsi} placeholder='Deskripsi'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Harga</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='harga' value={updateStateKatalog.harga} placeholder='Harga'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Gender</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='gender' value={updateStateKatalog.gender} placeholder='Gender'></input>
                </div>
                <div className='flex justify-center mt-10'>
                  <button className='bg-secondary px-10 py-2 rounded-md text-white border border-secondary hover:bg-white hover:text-secondary duration-200 mx-auto' onClick={handleUpdateKatalog}>Submit</button>
                </div>
              </div>
            </div>

          </div>
        </Modal>

        </div>
      </main>
    </div>
  )
}

export default KelolaKatalog