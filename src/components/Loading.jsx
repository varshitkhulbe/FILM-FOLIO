import React from 'react'
import Loader from "/loader.gif"
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black '>
        <img className='h-[50%]' src={Loader}></img>
    </div>
  )
}

export default Loading