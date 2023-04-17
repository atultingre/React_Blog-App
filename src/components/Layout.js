import React from 'react'
import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'

const Layout = ({search, setSearch, width}) => {
  
  return (
    <div className='App'>
        <Header title="Atul Tingre Blog" width={width}/>
        <Navbar search={search} setSeaarch={setSearch} />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout