import React from 'react'
import Navbar from './Navbar'
import Footer from './Fotter'
const Layout = ({children}) => {
  return (
    <div className="px-14">
        <Navbar/>
        <main>
            {children}
        </main>
    <Footer/>
    </div>
  )
}

export default Layout