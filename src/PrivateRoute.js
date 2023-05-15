import React from 'react';
import { useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

export const PrivateRoute = () => {

    if (Cookies.get('token')) {
        return <Outlet/>
      } else {
        return <Navigate to="/login"/>
      }


    // return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

