import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios"
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Movies = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movies, setmovies] = useState([])
    const [page, setpage] = useState(1)
    const [hasmore, sethasmore] = useState(true)
    document.title = "MOVIES"
    
    const getMovies = async() =>{
        try{
        const {data}= await axios.get(`/movie/${category}?page=${page}`)
        // settrending(data.results)
        if (data.results.length > 0){
          setmovies((prevState)=>[...prevState,...data.results])
            setpage((prevPage)=>prevPage+1)
        }else{
       sethasmore(false)}}
      catch(error){
        console.log("error: ",error)
      }}
    
      const refreshHandler= async()=>{
        if (movies.length ===0){
          getMovies();
        }else{
          setpage(1)
          setmovies([]);
          getMovies();
        }
      }
      console.log(movies)
      useEffect(()=>{
        refreshHandler();
      },[category])
  return movies.length >0  ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Movies<small className="text-sm text-zinc-600 ml-2">({category})</small>
        </h1>
        <Topnav />
        <Dropdown title="Category" option={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)}/>
      </div>

         <InfiniteScroll
         dataLength={movies.length}
         next={getMovies}
         hasMore={hasmore}
         loader={<h1>Loading...</h1>}>
         <Cards data={movies} title="movie"/>
         </InfiniteScroll>

       
    </div>
  ):<Loading />
}

export default Movies