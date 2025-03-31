import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import Cards from "./templates/Cards";
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';
const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all")
  const [trending, settrending] = useState([])
  const [duration, setduration] = useState("day")
  const [page, setpage] = useState(1)
  const [hasmore, sethasmore] = useState(true)
  document.title = "TRENDING | "+ category.toUpperCase()

  const getTrending = async() =>{
    try{
    const {data}= await axios.get(`/trending/${category}/${duration}?page=${page}`)
    // settrending(data.results)
    if (data.results.length > 0){
      settrending((prevState)=>[...prevState,...data.results])
        setpage((prevPage)=>prevPage+1)
    }else{
   sethasmore(false)}}
  catch(error){
    console.log("error: ",error)
  }}
  const refreshHandler= async()=>{
    if (trending.length ===0){
      getTrending();
    }else{
      setpage(1)
      settrending([]);
      getTrending();
    }
  }
  console.log(trending)
  useEffect(()=>{
    refreshHandler();
  },[category,duration])

 return trending.length >0  ? (
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending<small className="text-sm text-zinc-600 ml-2">({category})</small>
        </h1>
        <Topnav />
        <Dropdown title="Category" option={["movie","tv","all"]} func={(e)=>setcategory(e.target.value)}/>
        <div className="w-[5%]"></div>
        <Dropdown title="Duration" option={["day","week"]} func={(e)=>setduration(e.target.value)}/>
      </div>

         <InfiniteScroll
         dataLength={trending.length}
         next={getTrending}
         hasMore={hasmore}
         loader={<h1> Loading...</h1>}>
         <Cards data={trending} title={category}/>
         </InfiniteScroll>

       
    </div>
  ):<Loading />
};

export default Trending;
