import React from 'react'

import Logo from '../images/logo.png'

export default function Navbar() {
  return (
    <div className=" fixed z-20 ">
    <nav className="flex w-screen justify-between px-8 md:px-36 py-6 bg-white drop-shadow-lg">
        <div className="flex-1">
            <a className="" href="#">
                <img src={Logo} alt="Logo" className=' w-1/4' />
            </a>
        </div>

        <div className="flex-1">
            <div className="flex float-right md:text-base">
                <span className="text-xs md:text-base"> 
                    
                </span>
            </div>
        </div>

    </nav>
</div>
  )
}
