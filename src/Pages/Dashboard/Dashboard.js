import React from 'react'
import { useEffect, useState } from 'react';

import { useProSidebar } from 'react-pro-sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import Navbar from '../../Components/Navbar/Navbar'
import Navigation from '../../Components/Sidebar/Sidebar';
import LoadingSvg from '../../Components/Loading/LoadingSvg';

import { CountPesananJahit, 
  CountPesananPakaian, 
  CountMonthPesananPakaian, 
  CountMonthPesananJahit,
  SumPesananPakaian,
  SumPesananJahit,
  PaginatePesananPakaian,
  PaginateCountPesananPakaian,
  PaginatePesananJahit,
  PaginateCountPesananJahit 
} from '../../Graphql/query';

import { HiBookOpen, HiOutlineLogout, HiOutlineBars3CenterLeft } from "react-icons/hi"
import { FaBars, FaMoneyBillWave } from "react-icons/fa"
import { MdOutlineSell } from "react-icons/md"
import { useQuery } from '@apollo/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Transaksi Penjualan',
//     },
//   },
// };

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Pesanan Pakaian',
//       // data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
//       data: fakeData1,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Pesanan Jahit',
//       // data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
//       data: fakeData2,
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };




function Dashboard() {

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

  const date = Date()
  const year = "%"+date.substring(11, 15)+"%"
  const month = "%"+date.substring(4, 7)+"%"
  // console.log("cek tahun", year)
  // console.log("cek bulan", month)
  
  

  const {data: dataPakaian, loading: loadingPakaian, error: errorPakaian} = useQuery(CountPesananPakaian)
  const {data: dataJahit, loading: loadingJahit, error: errorJahit} = useQuery(CountPesananJahit)

  const {data: dataCountPakaian, loading: loadingCountPakaian, error: errorCountPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : year,
    _ilike : month
  }})

  const {data: dataCountJahit, loading: loadingCountJahit, error: errorCountJahit} = useQuery(CountMonthPesananJahit, { variables : {
    _like : year,
    _ilike : month
  }})

  const {data: dataSumPakaian, loading: loadingSumPakaian, error: errorSumPakaian} = useQuery(SumPesananPakaian)
  const {data: dataSumJahit, loading: loadingSumJahit, error: errorSumJahit} = useQuery(SumPesananJahit)
  
  console.log("cek sum", dataSumPakaian)

  const totalPenjualan = dataPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count + dataJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count

  const penjualanBulanan = dataCountPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count + dataCountJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count

  const totalPendapatan = dataSumPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.sum.total_harga + dataSumJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.sum.total_biaya
  
  console.log("total penjualan", totalPenjualan)
  console.log("penjualan bulanan", penjualanBulanan)
  console.log("total pendapatan", totalPendapatan)

  // GRAFIK ===============================================================

  const {data: dataMonthlyJanPakaian, loading: loadingMonthlyJanPakaian, error: errorMonthlyJanPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : "%2023%",
    _ilike : "%Jan%"
  }})
  const {data: dataMonthlyFebPakaian, loading: loadingMonthlyFebPakaian, error: errorMonthlyFebPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : "%2023%",
    _ilike : "%Feb%"
  }})
  const {data: dataMonthlyMarPakaian, loading: loadingMonthlyMarPakaian, error: errorMonthlyMarPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : "%2023%",
    _ilike : "%Mar%"
  }})
  const {data: dataMonthlyAprPakaian, loading: loadingMonthlyAprPakaian, error: errorMonthlyAprPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : "%2023%",
    _ilike : "%Apr%"
  }})
  const {data: dataMonthlyMayPakaian, loading: loadingMonthlyMayPakaian, error: errorMonthlyMayPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : "%2023%",
    _ilike : "%May%"
  }})
  const {data: dataMonthlyJunPakaian, loading: loadingMonthlyJunPakaian, error: errorMonthlyJunPakaian} = useQuery(CountMonthPesananPakaian, { variables: { 
    _like : "%2023%",
    _ilike : "%Jun%"
  }})



  const {data: dataMonthlyJanJahit, loading: loadingMonthlyJanJahit, error: errorMonthlyJanJahit} = useQuery(CountMonthPesananJahit, { variables: { 
    _like : "%2023%",
    _ilike : "%Jan%"
  }})
  const {data: dataMonthlyFebJahit, loading: loadingMonthlyFebJahit, error: errorMonthlyFebJahit} = useQuery(CountMonthPesananJahit, { variables: { 
    _like : "%2023%",
    _ilike : "%Feb%"
  }})
  const {data: dataMonthlyMarJahit, loading: loadingMonthlyMarJahit, error: errorMonthlyMarJahit} = useQuery(CountMonthPesananJahit, { variables: { 
    _like : "%2023%",
    _ilike : "%Mar%"
  }})
  const {data: dataMonthlyAprJahit, loading: loadingMonthlyAprJahit, error: errorMonthlyAprJahit} = useQuery(CountMonthPesananJahit, { variables: { 
    _like : "%2023%",
    _ilike : "%Apr%"
  }})
  const {data: dataMonthlyMayJahit, loading: loadingMonthlyMayJahit, error: errorMonthlyMayJahit} = useQuery(CountMonthPesananJahit, { variables: { 
    _like : "%2023%",
    _ilike : "%May%"
  }})
  const {data: dataMonthlyJunJahit, loading: loadingMonthlyJunJahit, error: errorMonthlyJunJahit} = useQuery(CountMonthPesananJahit, { variables: { 
    _like : "%2023%",
    _ilike : "%Jun%"
  }})



// PAGINATION ==================================================================

const [page, setPage] = useState(1)
const [offset, setOffset] = useState((page-1)*5)
const [filter, setFilter] = useState({
  day: "%%",
  month: "%%",
  year: "%%",
})

const {data: countPakaianPaginate, loading: loadingCountPakaianPaginate} = useQuery(PaginateCountPesananPakaian)
const {data: dataPakaianPaginate, loading: loadingPakaianPaginate} = useQuery(PaginatePesananPakaian, {
  variables: { 
    offset: offset,
    day: "%" + filter.day + " 2%",
    month: "%" + filter.month + "%",
    year: "%" + filter.year + "%",
  }
})
const [lastPage, setLastPage] = useState()
useEffect(() => {
  setLastPage(countPakaianPaginate?.sekargaluhetnic_pesanan_pakaian.length)
}, [countPakaianPaginate])


const handleInputFilter = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setFilter({
    ...filter,
    [name]: value,
  });
}

useEffect(() => {
  setOffset((page-1)*5)
}, [page])


console.log("cek paginate",dataPakaianPaginate)
console.log("cek offset", offset)
console.log("cek page", page)

//                          ==============================                        

const [pageJahit, setPageJahit] = useState(1)
const [offsetJahit, setOffsetJahit] = useState((pageJahit-1)*5)
const [filterJahit, setFilterJahit] = useState({
  day: "%%",
  month: "%%",
  year: "%%",
})

const {data: countJahitPaginate, loading: loadingCountJahitPaginate} = useQuery(PaginateCountPesananJahit)
const {data: dataJahitPaginate, loading: loadingJahitPaginate} = useQuery(PaginatePesananJahit, {
  variables: { 
    offset: offsetJahit,
    day: "%" + filterJahit.day + " 2%",
    month: "%" + filterJahit.month + "%",
    year: "%" + filterJahit.year + "%",
  }
})

const [lastPageJahit, setLastPageJahit] = useState()
useEffect(() => {
  setLastPageJahit(countJahitPaginate?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count)
}, [countJahitPaginate])

const handleInputFilterJahit = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setFilterJahit({
    ...filter,
    [name]: value,
  });
}

useEffect(() => {
  setOffsetJahit((pageJahit-1)*5)
}, [pageJahit])

// ===============================================================================

  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaksi Penjualan 2023',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const dataGrafikPakaian = [
    dataMonthlyJanPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count, 
    dataMonthlyFebPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count, 
    dataMonthlyMarPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count, 
    dataMonthlyAprPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count, 
    dataMonthlyMayPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count, 
    dataMonthlyJunPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count
  ]
  const dataGrafikJahit = [
    dataMonthlyJanJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count, 
    dataMonthlyFebJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count, 
    dataMonthlyMarJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count, 
    dataMonthlyAprJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count, 
    dataMonthlyMayJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count, 
    dataMonthlyJunJahit?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count
  ]

  const data = {
    labels,
    datasets: [
    {
      label: 'Pesanan Pakaian',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      data: dataGrafikPakaian,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Pesanan Jahit',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      data: dataGrafikJahit,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],

  }

  // ======================================================================

  // ======================================================================

  // const rows = [i];
  // for (let i = 0; i < dataPakaian?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count; i++) {
  //   return i
  // }
  // ======================================================================

  // const handleInputTanggal = (e) => {
  //   console.log("cek tanggal", e.target.value)
  // }

  return (
    <div className='flex h-full'>
      <Navigation />
      <main className='w-full'>
        <div className='bg-secondary3 p-5 block md:hidden'>
          <FaBars onClick={() => toggleSidebar()} className='block md:hidden' />
        </div>
        <div className='overflow-auto remove-scrollbar h-screen px-5 py-5'>
          <div>
            <div className='flex justify-between items-center border-b pb-5'>
              <h2 className='text-4xl lg:text-6xl font-bold text-primary uppercase'>Dashboard</h2>
              <img className='w-20 h-20' src='https://media.discordapp.net/attachments/915505289174847510/1107676044670009464/Group_133.png?width=547&height=547'></img>
            </div>
            <div className='mt-10 grid grid-cols-3 gap-12'>
              <div className='bg-[#6E7374] text-white w-full h-36 px-5 py-3 rounded-2xl'>
                <h6 className='font-light text-xl uppercase'>Total Penjualan</h6>
                <div className='flex justify-start gap-2 items-center'>
                  <MdOutlineSell className='my-2 w-5 h-5 fill-white'/>
                  <p className='text-lg tracking-wider font-light'>{totalPenjualan} Transaksi</p> 
                </div>
              </div>
              <div className='bg-[#9F958C] text-white w-full h-36 px-5 py-3 rounded-2xl'>
                <h6 className='font-light text-xl uppercase'>Penjualan Bulan Ini</h6>
                <div className='flex justify-start gap-2 items-center'>
                  <MdOutlineSell className='my-2 w-5 h-5 fill-white'/>
                  <p className='text-lg tracking-wider font-light'>{penjualanBulanan} Transaksi</p> 
                </div>
              </div>
              <div className='bg-[#6E7374] text-white w-full h-36 px-5 py-3 rounded-2xl'>
                <h6 className='font-light text-xl uppercase'>Total Pendapatan</h6>
                <div className='flex justify-start gap-2 items-center'>
                  <FaMoneyBillWave className='my-2 w-5 h-5 fill-white'/>
                  <p className='text-lg tracking-wider font-light'>Rp{totalPendapatan.toLocaleString()}</p> 
                </div>
              </div>
             
            </div>
          </div>


          <div className='mt-10'>
            <h2 className='mb-2 text-xl font-semibold text-secondary uppercase'>Grafik Penjualan</h2>
            <div className='w-full border p-2 rounded-xl'>
              <Line options={options} data={data}/>
            </div>
          </div>


          <div className='mt-10'>
            <h2 className='mb-2 text-xl font-semibold text-secondary uppercase'>Tabel Laporan Penjualan</h2>
            <div className='border p-2 rounded-md'>
              <h3 className='font-bold text-secondary mb-5'>Penjualan Pakaian</h3>
              <div>
                <p>Filter</p>
                <div className='flex justify-start gap-5'>
                  <select name='day' onChange={handleInputFilter} className='text-sm px-1 py-1 border-b'>
                    <option selected="selected" value="%%">Tanggal</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <select name='month' onChange={handleInputFilter} className='text-sm px-1 py-1 border-b'>
                    <option selected="selected" value="%%">Bulan</option>
                    <option value="jan">Januari</option>
                    <option value="feb">Februari</option>
                    <option value="mar">Maret</option>
                    <option value="apr">April</option>
                    <option value="may">May</option>
                    <option value="jun">Juni</option>
                    <option value="jul">July</option>
                    <option value="aug">Agustus</option>
                    <option value="sep">September</option>
                    <option value="okt">Oktober</option>
                    <option value="nov">November</option>
                    <option value="dec">Desember</option>
                  </select>
                  <select name='year' onChange={handleInputFilter} className='text-sm px-1 py-1 border-b'>
                    <option selected="selected" value="%%">Tahun</option>
                    <option value="2022">2023</option>
                    <option value="2023">2022</option>
                    <option value="2023">2021</option>
                    <option value="2023">2020</option>
                  </select>
                </div>
              </div>
              <div className='mt-5'>
                <table className="table-auto w-full">
                  <thead>
                    <tr className='border-b-2 border-[#6E7374]'>
                      <th className='p-1 font-medium text-gray-800'>No</th>
                      <th className='p-1 font-medium text-gray-800'>Kode Pemesanan</th>
                      <th className='p-1 font-medium text-gray-800'>Produk</th>
                      <th className='p-1 font-medium text-gray-800'>Total Harga</th>
                      <th className='p-1 font-medium text-gray-800'>Status</th>
                    </tr>
                  </thead>
                  { loadingPakaianPaginate ? 
                    <tr className=''>
                      <td colSpan={5}>
                        <LoadingSvg/> 
                      </td>
                    </tr> 
                    :
                    <tbody>
                          { dataPakaianPaginate?.sekargaluhetnic_pesanan_pakaian.map((el, i) => 
                          <tr className='border-b'>
                            <td className='p-2 text-sm'>{(offset+i+1)}</td>
                            <td className='p-2 text-sm'>{el.kode_pemesanan}</td>
                            <td className='p-2 text-sm'>{el.pesanans[0].katalog.nama}</td>
                            <td className='p-2 text-sm'>Rp{el.total_harga.toLocaleString()}</td>
                            <td className='p-2 text-sm'>{el.status}</td>
                          </tr>
                          )}
                    </tbody>
                  }
                </table>
              </div>
              <div className='mt-5 mb-1 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600'>Halaman ke {page} dari {Math.floor(lastPage / 5) + 1}</p>
                </div>
                <div className='flex justify-end'>
                  { page == 1 ? 
                    ""
                    :
                    <a onClick={() => setPage(page-1)} class="relative inline-flex items-center rounded-l-md px-5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 -mr-[1px] duration-200">
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  }
                  {/* <div className='border-t border-b text-gray-400 px-3 pb-[4px] pt-[5px] border-gray-300'>
                    {page}
                  </div> */}
                  { (dataPakaianPaginate?.sekargaluhetnic_pesanan_pakaian.length < 5) ?
                    ""
                    :
                    <a onClick={() => setPage(page+1)} class="relative inline-flex items-center rounded-r-md px-5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 duration-200">
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  }
                </div>
                
              </div>
            </div>


            <div className='border p-2 rounded-md mt-5'>
              <h3 className='font-bold text-secondary mb-5'>Pesanan Jahit</h3>
              <div>
                <p>Filter</p>
                <div className='flex justify-start gap-5'>
                  <select name='day' onChange={handleInputFilterJahit} className='text-sm px-1 py-1 border-b'>
                    <option selected="selected" value="%%">Tanggal</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <select name='month' onChange={handleInputFilterJahit} className='text-sm px-1 py-1 border-b'>
                    <option selected="selected" value="%%">Bulan</option>
                    <option value="jan">Januari</option>
                    <option value="feb">Februari</option>
                    <option value="mar">Maret</option>
                    <option value="apr">April</option>
                    <option value="may">May</option>
                    <option value="jun">Juni</option>
                    <option value="jul">July</option>
                    <option value="aug">Agustus</option>
                    <option value="sep">September</option>
                    <option value="okt">Oktober</option>
                    <option value="nov">November</option>
                    <option value="dec">Desember</option>
                  </select>
                  <select name='year' onChange={handleInputFilterJahit} className='text-sm px-1 py-1 border-b'>
                    <option selected="selected" value="%%">Tahun</option>
                    <option value="2022">2023</option>
                    <option value="2023">2022</option>
                    <option value="2023">2021</option>
                    <option value="2023">2020</option>
                  </select>
                </div>
              </div>
              <div className='mt-5'>
                <table className="table-auto w-full">
                  <thead>
                    <tr className='border-b-2 border-[#6E7374]'>
                      <th className='p-1 font-medium text-gray-800'>No</th>
                      <th className='p-1 font-medium text-gray-800'>Kode Pemesanan</th>
                      <th className='p-1 font-medium text-gray-800'>Jenis Pakaian</th>
                      <th className='p-1 font-medium text-gray-800'>Total Biaya</th>
                      <th className='p-1 font-medium text-gray-800'>Status</th>
                    </tr>
                  </thead>
                  { loadingJahitPaginate ? 
                    <tr className=''>
                      <td colSpan={5}>
                        <LoadingSvg/> 
                      </td>
                    </tr> 
                    :
                    <tbody>
                          { dataJahitPaginate?.sekargaluhetnic_pesanan_jahit.map((el, i) => 
                          <tr className='border-b'>
                            <td className='p-2 text-sm'>{(offset+i+1)}</td>
                            <td className='p-2 text-sm'>{el.kode_pemesanan}</td>
                            <td className='p-2 text-sm'>{el.jenis_pakaian}</td>
                            <td className='p-2 text-sm'>Rp{el.total_biaya.toLocaleString()}</td>
                            <td className='p-2 text-sm'>{el.status}</td>
                          </tr>
                          )}
                    </tbody>
                  }
                </table>
              </div>
              <div className='mt-5 mb-1 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600'>Halaman ke {pageJahit} dari {Math.floor(lastPageJahit / 5) + 1}</p>
                </div>
                <div className='flex justify-end'>
                  { pageJahit == 1 ? 
                    ""
                    :
                    <a onClick={() => setPageJahit(pageJahit-1)} class="relative inline-flex items-center rounded-l-md px-5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 -mr-[1px] duration-200">
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  }
                  {/* <div className='border-t border-b text-gray-400 px-3 pb-[4px] pt-[5px] border-gray-300'>
                    {page}
                  </div> */}
                  { (dataJahitPaginate?.sekargaluhetnic_pesanan_jahit.length < 5) ?
                    ""
                    :
                    <a onClick={() => setPage(page+1)} class="relative inline-flex items-center rounded-r-md px-5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 duration-200">
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  }
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard