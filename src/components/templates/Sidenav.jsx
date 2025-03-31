import React from 'react'
import {Link} from "react-router-dom"

const Sidenav = () => {
  return (
      <div className='w-[20%] h-full border-r-2 border-zinc-300 p-10'>
        
        <h1 className='text-2xl font-bold text-white'>
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span> FILM-FOLIO </span>
          </h1>
        
        <nav className='flex flex-col gap-2 text-lg text-zinc-400'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-1'>
          New Feeds</h1>
          <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-fire-fill "></i> Trending</Link>
          <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-bard-fill mr-2"></i> Popular</Link>
          <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-movie-fill mr-2"></i> Movies</Link>
          <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-tv-2-fill mr-2"></i> TV Shows</Link>
          <Link to="/person" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-team-fill mr-2"></i> People</Link>
        </nav>
        
        <hr className='border-none bg-zinc-400 h-[1px] mt-2' />
        
        <nav className='flex flex-col gap-2 text-zinc-400'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-1'>
          Website Information</h1>
          <Link to="/About" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-information-fill mr-2"></i> About FILM_FOLIO</Link>
          <Link to="/Contact-us" className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-200'>
          <i className="ri-phone-fill mr-2"></i> Contact Us</Link>
        </nav>
      </div>
         )
}

export default Sidenav