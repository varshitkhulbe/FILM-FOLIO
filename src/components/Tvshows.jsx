import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "../utils/Axios"
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tvshows, settvshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  document.title = "Tvshows | " + category.toUpperCase();

  const getTvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settvshows((prevstate) => [...prevstate, ...data.results]);
        setpage((prevpage) => prevpage + 1);
      } else {
        sethasmore(false);
      }
    } catch (e) {
      console.log("error :",e);
    }
  };

  const refreshHandler = async () => {
    if (tvshows.length == 0) {
      getTvshows();
    } else {
      setpage(1);
      settvshows([]);
      getTvshows();
    }
  };
  useEffect(()=>{
  refreshHandler();
  },[category])
  return tvshows.length >0  ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Tvshows<small className="text-sm text-zinc-600 ml-2">({category})</small>
        </h1>
        <Topnav />
        <Dropdown title="Category" option={["on_the_air","top_rated","popular","airing_today"]} func={(e)=>setcategory(e.target.value)}/>
      </div>

         <InfiniteScroll
         dataLength={tvshows.length}
         next={getTvshows}
         hasMore={hasmore}
         loader={<h1>Loading...</h1>}>
         <Cards data={tvshows} title="tv"/>
         </InfiniteScroll>

       
    </div>
  ):<Loading />
};

export default Tvshows;
