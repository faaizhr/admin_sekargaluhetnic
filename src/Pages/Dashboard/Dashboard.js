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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Transaksi Penjualan',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May',];
const fakeData1 = [6, 10, 16, 19, 3]
const fakeData2 = [9, 3, 5, 10, 5]

export const data = {
  labels,
  datasets: [
    {
      label: 'Pesanan Pakaian',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      data: fakeData1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Pesanan Jahit',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      data: fakeData2,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};




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