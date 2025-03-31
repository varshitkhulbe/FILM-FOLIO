import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "../utils/Axios"
import Topnav from "./templates/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const People = () => {
    const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  document.title = "PEOPLE"

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setpeople((prevstate) => [...prevstate, ...data.results]);
        setpage((prevpage) => prevpage + 1);
      } else {
        sethasmore(false);
      }
    } catch (e) {
      console.log("error :",e);
    }
  };

  const refreshHandler = async () => {
    if (people.length == 0) {
      getPeople();
    } else {
      setpage(1);
      setpeople([]);
      getPeople();
    }
  };
  useEffect(()=>{
  refreshHandler();
  },[category])
  return people.length >0  ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Person
        </h1>
        <Topnav />
      </div>

         <InfiniteScroll
         dataLength={people.length}
         next={getPeople}
         hasMore={hasmore}
         loader={<h1>Loading...</h1>}>
         <Cards data={people} title="person"/>
         </InfiniteScroll>

       
    </div>
  ):<Loading />
}

export default People