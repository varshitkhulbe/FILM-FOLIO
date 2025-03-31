import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios"
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie")
  const [popular, setpopular] = useState([])
  const [page, setpage] = useState(1)
  const [hasmore, sethasmore] = useState(true)
  document.title = "POPULAR | "+ category.toUpperCase()

  const getPopular = async() =>{
    try{
    const {data}= await axios.get(`${category}/popular?page=${page}`)
    // settrending(data.results)
    if (data.results.length > 0){
      setpopular((prevState)=>[...prevState,...data.results])
        setpage((prevPage)=>prevPage+1)
    }else{
   sethasmore(false)}}
  catch(error){
    console.log("error: ",error)
  }}

  const refreshHandler= async()=>{
    if (popular.length ===0){
      getPopular();
    }else{
      setpage(1)
      setpopular([]);
      getPopular();
    }
  }
  console.log(popular)
  useEffect(()=>{
    refreshHandler();
  },[category])

  return popular.length >0  ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Popular<small className="text-sm text-zinc-600 ml-2">({category})</small>
        </h1>
        <Topnav />
        <Dropdown title="Category" option={["movie","tv"]} func={(e)=>setcategory(e.target.value)}/>
      </div>

         <InfiniteScroll
         dataLength={popular.length}
         next={getPopular}
         hasMore={hasmore}
         loader={<h1>Loading...</h1>}>
         <Cards data={popular} title={category}/>
         </InfiniteScroll>

       
    </div>
  ):<Loading />
}
 
export default Popular