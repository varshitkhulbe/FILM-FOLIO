import React, { useEffect, useState } from 'react'
import Sidenav from "./templates/Sidenav"
import Topnav from "./templates/Topnav"
import axios from "../utils/Axios"
import Header from "./templates/Header"
import Horizontalcard from "./templates/Horizontalcards"
import Dropdown from "./templates/Dropdown"
import Loading from "./Loading"
const Home = () => {
  const [wallpaper,setWallaper]=useState(null)
const [Trending,setTrending]=useState(null)
const [category, setcategory] = useState("all")

  const getHeaderWallpaper = async() =>{
    try{
    const {data}= await axios.get("/trending/all/day")
    let randomData= data.results[(Math.random()* data.results.length).toFixed()];
    setWallaper(randomData)
    }
  catch(error){
    console.log("error: ",error)
  }}

  const getTrending = async() =>{
    try{
    const {data}= await axios.get(`/trending/${category}/day`)
    setTrending(data.results)
    }
  catch(error){
    console.log("error: ",error)
  }}


  useEffect(()=>{
    getTrending()
    !wallpaper && getHeaderWallpaper()
  },[category])
  document.title="HOMEPAGE";
  return wallpaper && Trending ?( <>
  <Sidenav />
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden '>
      <Topnav/>
      <Header data={wallpaper}/>
      <div className="p-5 flex justify-between">
              <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
              <Dropdown title="filter" option={["tv","movie","all"]} func={(e)=> setcategory(e.target.value )} />
              </div>
      <Horizontalcard data={Trending}/>
    </div>
  </>):<Loading />
}

export default Home