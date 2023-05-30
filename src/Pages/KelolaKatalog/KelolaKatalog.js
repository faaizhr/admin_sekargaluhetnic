import React from 'react'
import { useEffect, useState } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { gql, useQuery, useMutation, useLazyQuery, useSubscription } from "@apollo/client"
import Modal from 'react-modal';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import Cookies from "js-cookie";

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import LoadingSvg from '../../Components/Loading/LoadingSvg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaBars } from "react-icons/fa"
import { AiFillCloseCircle } from "react-icons/ai"

import { GetKatalog } from '../../Graphql/query';
import { SubscriptionKatalog } from '../../Graphql/subscription';
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

  const {data, loading, error} = useSubscription(SubscriptionKatalog)

  const [katalog, setKatalog] = useState({
    foto: "",
    nama: "", 
    deskripsi: "",
    harga: 0,
    gender: "",
    ukuran: "",
    kode_produk: "",
    material: "",
    stok: 0
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

  // UPLOAD IMAGE ===================================

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, `Katalog/`);
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `Katalog/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [url]);
  //       });
  //     });
  //   });

  // }, [imageUrls]);

  
  // setTotalBiaya(hargaKain + hargaJenisPakaian)
  console.log("cek url", imageUrls )
  const zero = () => {
    setImageUrls([])
  }

  // ==================================================
  // IMAGE PREVIEW ====================================

  const getImagePreview = (event) => 
  {
    var image=URL.createObjectURL(event.target.files[0]);
    var imagediv= document.getElementById('preview');
    var newimg=document.createElement('img');
    imagediv.innerHTML='';
    newimg.src=image;
    // newimg.width="150";
    imagediv.appendChild(newimg);
  }

  // ==================================================

  // AUTOMASI KODE PRODUK =============================

  const {data: countData} =useQuery(GetKatalog)
  console.log("cek count data", countData?.sekargaluhetnic_katalog.length)

  const [kodeProduk, setKodeProduk] = useState("KTLG")

  useEffect(() => {
    if(katalog.gender == "Wanita") {
      setKodeProduk(`KTLG/PR/${countData.sekargaluhetnic_katalog.length + 1}`)
    } else if(katalog.gender == "Pria") {
      setKodeProduk(`KTLG/LK/${countData.sekargaluhetnic_katalog.length + 1}`)
    }
  }, [katalog.gender])
  
  console.log("cek kode produk", kodeProduk)
  console.log("cek katalog gender", katalog.gender)

  // ==================================================

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

    setTimeout(() => {
      insertKatalog({
        variables: {
          object: {
            nama: katalog.nama,
            foto: imageUrls[0],
            harga: katalog.harga,
            deskripsi: katalog.deskripsi,
            gender: katalog.gender,
            ukuran: katalog.ukuran,
            kode_produk: kodeProduk,
            material: katalog.material,
            stok: katalog.stok,
          }
        }
      })
      toast.success("Data berhasil ditambahkan")
      setIsOpenInsert(false)
    }, 1500);

    setImageUrls([])
    // window.location.reload(false);
  }

  const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
  function openModalDelete() {
    setIsOpenDelete(true);
  }
  function closeModalDelete() {
    setIsOpenDelete(false);
  }

  const handleDeleteKatalog = (value) => {

    if(window.confirm("Apakah Anda yakin ingin menghapus katalog ini?") == true ) {
      deleteKatalog({
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
            gender: updateStateKatalog.gender,
            ukuran: updateStateKatalog.ukuran,
            kode_produk: updateStateKatalog.kode_produk,
            material: updateStateKatalog.material,
            stok: updateStateKatalog.stok,
        }
      }
    })
    toast.success("Data berhasil diubah")
    setIsOpenUpdate(false)
  }
  console.log(updateStateKatalog)

  useEffect(() => {
    console.log("loading", loading)

  }, [loading])


  

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
            <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Kelola Katalog</h2>
            <div className='mt-10'>
              <div className='flex justify-end'>
                <button onClick={openModalInsert} className='bg-secondary px-10 py-3 rounded-md text-white font-medium border border-secondary hover:bg-white hover:text-secondary duration-200'>Tambah Katalog</button>
              </div>


              { loading ? <LoadingSvg/> :
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
                          {/* <div className='flex justify-center'>{loading ? <LoadingSvg/> : ""}</div> */}
                          <th className='py-2'><img className='w-32 h-32 object-cover' src={katalog.foto}></img></th>
                          <td className='px-5 py-1'>{katalog.kode_produk}</td>
                          <td className='px-5 py-1'>{katalog.nama}</td>
                          <td className='px-5 py-1'>{katalog.deskripsi.substring(0, 50)} . . .</td>
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
              }
            </div>
          </div>

          {/* INSERT MODAL */}
          <Modal
          isOpen={modalIsOpenInsert}
          onRequestClose={closeModalInsert}
          // style={customStyles}
          className="bg-white shadow-md p-10 w-[550px] mx-auto h-[550px] overflow-y-scroll mt-20 border rounded-md"
          >
          <div className='w-96 mx-auto'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalInsert}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-lg'>Tambah Kain</h6>
              <div className='mt-5'>
                <div className='mb-5'>
                  <p className='text-primary'>Gambar Katalog</p>
                  {/* <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='foto' placeholder='Gambar Kain'></input> */}
                  <input 
                    type='file' 
                    className='mt-2 text-sm'
                    id='upload_file'
                    onChange={(event) => {
                      getImagePreview(event);
                      setImageUpload(event.target.files[0]);
                    }}
                  >
                  </input>
                  <div id="preview" className="border rounded-md p-3 flex justify-start flex-wrap gap-5 mt-2"></div>
                  <div className='flex justify-end'>
                    <button onClick={uploadFile} className='bg-secondary2 border border-secondary2 text-white px-5 py-1 rounded-md hover:bg-white hover:text-secondary2 duration-200 text-sm mt-2'>Unggah Gambar</button>
                  </div>
                  <h6 className="font-semibold text-lg text-primary mt-10">Foto yang sudah terunggah</h6>
                  <div className="border rounded-md p-3 flex justify-start flex-wrap gap-5">
                    {imageUrls.map((url) => {
                      return <img className="w-40 h-40 object-cover" src={url} />;
                    })}
                  </div>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Nama</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='nama' placeholder='Nama'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Deksripsi</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='deskripsi' placeholder='Deskripsi'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Harga</p>
                  <input type='number' onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='harga' placeholder='Harga'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Gender</p>
                  <select name='gender' className='text-sm w-full p-1 border-b focus:outline-none focus:border-primary' onChange={handleInputInsertKatalog}>
                    <option value="Wanita">Wanita</option>
                    <option selected="selected" value="Pria">Pria</option>
                  </select>
                  {/* <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='gender' placeholder='Gender'></input> */}
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Ukuran</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='ukuran' placeholder='Ukuran'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Kode Produk</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='kode_produk' disabled value={kodeProduk}></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Material</p>
                  <input onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='material' placeholder='Material'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Stok</p>
                  <input type='number' onChange={handleInputInsertKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='stok' placeholder='Stok'></input>
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
          // style={customStyles}
          className="bg-white shadow-md p-10 w-[550px] mx-auto h-[550px] overflow-y-scroll mt-20 border rounded-md"
        >
          <div className='w-96 mx-auto'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalUpdate}></AiFillCloseCircle>
            <div>
              <h6 className='font-semibold text-lg'>Update Kain</h6>
              <div className='mt-5'>
                <div className='mb-5'>
                  <p className='text-primary'>Gambar</p>
                  {/* <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='foto' value={updateStateKatalog.foto} placeholder='Gambar Kain'></input> */}
                  <img className='w-32 h-50' src={updateStateKatalog.foto}></img>
                  <input type='file' className='mt-2 text-sm'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Nama</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='nama' value={updateStateKatalog.nama} placeholder='Nama Kain'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Deksripsi</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='deskripsi' value={updateStateKatalog.deskripsi} placeholder='Deskripsi'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Harga</p>
                  <input type='number' onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='harga' value={updateStateKatalog.harga} placeholder='Harga'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Gender</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='gender' value={updateStateKatalog.gender} placeholder='Gender'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Ukuran</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='ukuran' value={updateStateKatalog.ukuran} placeholder='Ukuran'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Kode Produk</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='kode_produk' value={updateStateKatalog.kode_produk} placeholder='Kode Produk'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Material</p>
                  <input onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='material' value={updateStateKatalog.material} placeholder='Material'></input>
                </div>
                <div className='mb-5'>
                  <p className='text-primary'>Stok</p>
                  <input type='number' onChange={handleChangeUpdateKatalog} className='border-b focus:outline-none focus:border-primary p-1 text-sm mt-1 w-full' name='stok' value={updateStateKatalog.stok} placeholder='Stok'></input>
                </div>
                <div className='flex justify-center mt-10'>
                  <button className='bg-secondary px-10 py-2 rounded-md text-white border border-secondary hover:bg-white hover:text-secondary duration-200 mx-auto' onClick={handleUpdateKatalog}>Submit</button>
                </div>
              </div>
            </div>

          </div>
        </Modal>

        {/* DELETE MODAL */}
        <Modal
          isOpen={modalIsOpenDelete}
          onRequestClose={closeModalDelete}
          // style={customStyles}
          className="bg-white shadow-md p-10 w-[550px] mx-auto h-[550px] overflow-y-scroll mt-20 border rounded-md"
        >
          <div className='w-96 mx-auto'>
            <AiFillCloseCircle className='w-7 h-7 fill-secondary hover:fill-red-700 duration-200 cursor-pointer float-right' onClick={closeModalDelete}></AiFillCloseCircle>
            <div>
              <button onClick={() => handleDeleteKatalog(katalog.id)}></button>

            </div>

          </div>
        </Modal>

        </div>
      </main>
    </div>
  )
}

export default KelolaKatalog