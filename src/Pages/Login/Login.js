import React from 'react'
import { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import Cookies from 'js-cookie'
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom"

const GetAdmin = gql `
query MyQuery($_eq: String!, $_eq1: String!) {
  sekargaluhetnic_admin(where: {email: {_eq: $_eq}, password: {_eq: $_eq1}}) {
    id
    nama
    password
    user_id
    email
    role
  }
}
`

export default function Login() {

  const navigate = useNavigate()

  const [getAdmin, {data, loading, error}] = useLazyQuery(GetAdmin);
  console.log("cek data", data)

  const [errorLogin, setErrorLogin] = useState("")
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
    // setTimeout(e, 1000);
  };

  console.log("values", values)

  useEffect(() => {
    if(data?.sekargaluhetnic_admin.length === 1) {
      alert("login berhasil")
      // console.log("data", data?.sekargaluhetnic_user[0]?.id);
      // setLoginSuccess("Login Berhasil, Harap Tunggu....")
      Cookies.set("token", v4());
      Cookies.set("okogaye", data?.sekargaluhetnic_admin[0]?.user_id);
      Cookies.set("role", data?.sekargaluhetnic_admin[0]?.role);
      return navigate ("/")
    } else {
      setErrorLogin("Email atau Password Salah")
    }
  }, [data]);


  const login = (e) => {
    getAdmin({
        variables: {
            _eq: values.email,
            _eq1: values.password,
        }
    })
    e.preventDefault();
  }
  

  return (
    <div className='w-full h-screen bg-secondary flex items-center'>
      <div className='w-[700px] h-[500px] bg-white rounded-md mx-auto p-5'>
        <h2 className='text-center uppercase lg:text-6xl font-bold text-primary text-4xl'>Login</h2>
        <div className='mt-10 '>
          <div className='w-fit mx-auto'>
            <p>Email</p>
            <input name="email" type='email' onChange={handleInput} className='border-b focus:outline-none focus:border-primary hover:border-primary w-96 p-1 mt-1 text-sm'></input>
          </div>
          <div className='w-fit mx-auto mt-10'>
            <p>Password</p>
            <input name="password" onChange={handleInput} type='password' className='border-b focus:outline-none focus:border-primary hover:border-primary lg:[600px] w-96 p-1 mt-1 text-sm'></input>
          </div>
          <div className='w-fit mx-auto'>
            {data && <h4 className="w-96 mt-1 text-red-700 text-sm">Email atau kata sandi salah!!</h4>}
          </div>
          <div className='flex justify-center'>
            <button onClick={login} className='bg-secondary px-10 py-2 rounded-md mx-auto text-white mt-10 border border-secondary hover:bg-white duration-200 hover:text-secondary'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
