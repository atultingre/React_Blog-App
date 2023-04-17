import React from 'react'
import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  
  return (
    <div className='App'>
        <Header title="Atul Tingre Blog"/>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout