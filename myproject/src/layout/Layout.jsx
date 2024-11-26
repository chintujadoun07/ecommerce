import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
<>

<div className='px-14 space-y-11'>
<Navbar/>
<main>
  {children}
</main>
<Footer/>
</div>
</>
  )
}

export default Layout