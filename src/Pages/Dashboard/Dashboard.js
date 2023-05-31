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

import { CountPesananJahit, 
  CountPesananPakaian, 
  CountMonthPesananPakaian, 
  CountMonthPesananJahit,
  SumPesananPakaian,
  SumPesananJahit 
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

  // console.log("cek data monthly jahit", dataMonthlyJanJahit.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count)

  

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
              <div className='bg-[#DAD7CE] text-white w-full h-36 px-5 py-3 rounded-2xl'>
                <h6 className='font-light text-xl uppercase'>Total Pendapatan</h6>
                <div className='flex justify-start gap-2 items-center'>
                  <FaMoneyBillWave className='my-2 w-5 h-5 fill-white'/>
                  <p className='text-lg tracking-wider font-light'>Rp{totalPendapatan.toLocaleString()}</p> 
                </div>
              </div>
             
            </div>
          </div>


          <div className='mt-10'>
            <h2 className='mb-2 text-xl font-semibold text-secondary'>Grafik Penjualan</h2>
            <div className='w-full border p-2 rounded-xl'>
              <Line options={options} data={data}/>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard