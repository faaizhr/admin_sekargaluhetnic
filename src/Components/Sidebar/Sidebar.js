import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { MdDashboard } from "react-icons/md"
import { GiRolledCloth } from "react-icons/gi"
import { RiTShirt2Fill } from "react-icons/ri"
import { GiSewingMachine } from "react-icons/gi"
import { HiBookOpen, HiOutlineLogout, HiBars3CenterLeft } from "react-icons/hi"
import { TbTruckReturn } from "react-icons/tb"

import Cookies from "js-cookie"


function Navigation() {

  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove("okogaye")
    Cookies.remove("token")
    navigate("/login")
  }

  return (
    <div>
      <Sidebar className='h-screen' breakPoint="md" backgroundColor='#DCD7C9' width='290px'>
        <div>
          <h1 className='staatliches tracking-wider uppercase text-center my-5 text-lg lg:text-2xl  text-[#3F4E4F] '>Sekar Galuh Etnic</h1>
        </div>
          <Menu>
            <MenuItem 
              component={<Link to="/" />} 
              icon={<MdDashboard color='#3F4E4F'/>}
              className="text-xl"
            >
              <p className='text-sm'>Dashboard</p>
            </MenuItem>
            <MenuItem 
              component={<Link to="/kelola-kain" />}
              icon={<GiRolledCloth color='#3F4E4F'/>} 
              className="text-xl"  
            >
              <p className='text-sm'>Kelola Kain</p>
            </MenuItem>
            <MenuItem 
              component={<Link to="/kelola-katalog" />}
              icon={<RiTShirt2Fill color='#3F4E4F'/>} 
              className="text-xl"
            >
              <p className='text-sm'>Kelola Katalog</p>
            </MenuItem>
            <MenuItem 
              component={<Link to="/kelola-pesanan-pakaian" />}
              icon={<HiBookOpen color='#3F4E4F'/>} 
              className="text-xl"
            >
              <p className='text-sm'>Kelola Pesanan Pakaian</p>
            </MenuItem>
            <MenuItem 
              component={<Link to="/kelola-pesanan-jahit" />}
              icon={<GiSewingMachine color='#3F4E4F'/>} 
              className="text-xl"
            >
              <p className='text-sm'>Kelola Pesanan Jahit</p>
            </MenuItem>
            <MenuItem 
              component={<Link to="/kelola-retur-barang" />}
              icon={<TbTruckReturn color='#3F4E4F'/>} 
              className="text-xl"
            >
              <p className='text-sm'>Kelola Kelola Retur Barang</p>
            </MenuItem>
          </Menu>
          <Menu className='bottom-5'>
            <MenuItem 
            onClick={handleLogout}
              icon={<HiOutlineLogout color='#3F4E4F' />} 
              className="text-xl"
            >
              <p className='text-sm'>Logout</p>
            </MenuItem>
          </Menu>
      </Sidebar>
    </div>
  )
}

export default Navigation