import React, { useState } from 'react'


import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import ShoppingCard from '../page/ShoppingCard';

const Navbar = () => {
const[open,setOpen]=useState(false)
  

  return (
   <>
 <header className="text-gray-600 body-font font-semibold text-2xl">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center  text-3xl">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Tailblocks</span>
    </a>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-2xl text-basjustify-center">
      <Link  to='/' className="mr-5 hover:text-gray-900">Home</Link>
      
      <a className="mr-5 hover:text-gray-900">Second Link</a>
      <Link  to="/login" className="mr-5 hover:text-gray-900">LogIN</Link>
      <Link  to="/register" className="mr-5 hover:text-gray-900">Register</Link>
      
      
    </nav>
    <button onClick={()=>setOpen(true)}
    
    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    <ShoppingCard open={open} setOpen={setOpen} ></ShoppingCard>


  </div>
</header>
   </>
  )
}

export default Navbar