import React from 'react';

import { createBrowserRouter, Outlet } from "react-router-dom";
import Dashboard from './pages/Customers/Dashboard';
import Beranda from './pages/Customers/Beranda';
import Navbar from './components/Navbar';
import ProtectionAuth from './components/ProtectionAuth';
import ProtectionHasAuth from './components/ProtectionHasAuth';
import Checkout from "./pages/Customers/checkout/Checkout"

const Router=createBrowserRouter([
    
  {
    path: "/",
    element: (
      <>
        <Navbar /> 
        <Outlet /> 
      </>
    ),
        children:[
            {
                index:true,
                element:<Dashboard/>,
            },
            {

                path:"detail/:idPenerbangan",
                element:"Detail Penerbangan",
            },
            {
              path: "beranda",
              element: <Beranda />,
            },
                    // here should added element properly and not required login
           {
            path:"auth",
            element:<ProtectionHasAuth/>,
            children:[
                {
                    path:"login",
                    element:"login",
                },
               
                {
                    path:"Register",
                    element:"Register",
                },
                {
                    path:"forgotPassword",
                    element:"Forgot Password",
                }
            ]
           }
        ]   
    },
    {
        // required login
        path:"/user",
        element:<ProtectionAuth/>,
        children:[
            {
                path:"notification",
                element:"notification"
            },
           
            {
                path:"infoDetailUser",
                element:"infoDetailUser"
            },
            {
                path:"checkout",
                element:<Checkout/>,

            },
            {
                path:"confirmBooking",
                element:"confirmBooking",
            },
            {
                path:"history",
                element:"history",
                children:[
                    // detail more history  
                    {
                        path:":idDetailHisotry",
                        element:"detail history"
                    }
                ]
            },

        ]
    }
   


])



export default Router;
