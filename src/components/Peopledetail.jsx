import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadpeople, removepeople } from "../store/actions/peopleAction";
import Loading from "../components/Loading";
import Horizontalcards from "./templates/Horizontalcards";
import Dropdown from "./templates/Dropdown"

const Peopledetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie")
  const dispatch = useDispatch();
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);
  return info ? (
    <div className="relative w-screen h-screen px-[10%] overflow-auto overflow-x-hidden">
      {/*part 1 navigation*/}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>
      {/*part 2 right side details*/}
      <div className="w-full flex mt-[4%]">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[45vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
        ></img>
        <div className="content ml-10">
          <h1 className=" text-white font-black text-5xl">
            {" "}
            {info.details.name}
          </h1>

          <h1 className="text-white text-2xl mt-2 font-semibold italic ">
            (Gender:
            {info.details.gender ? info.details.gender : ""})
          </h1>

          <div className="flex flex-col justify-start text-white text-xl gap-x-5 my-5">
            <div className="flex items-center gap-x-3 mb-3 ">
              <span className="rounded-full bg-yellow-600 text-xl font-semibold text-white w-[7vh] h-[7vh] flex items-center justify-center">
                {(info.details.popularity * 10).toFixed()}
                <sup>%</sup>
              </span>
              <h1 className="font-semibold">(Popularity Score)</h1>
            </div>
            <div>
              <h1 className="mb-3 font-semibold">
                Birthday: {info.details.birthday}
              </h1>
              <h1 className="mb-3 font-semibold">
                Death: {info.details.deathday?info.details.deathday:"N/A"}
              </h1>
              <h1 className="mb-3 font-semibold">
                Place of Birth: {info.details.place_of_birth}
              </h1>
              <h1 className="mb-3 font-semibold">
                Known for: {info.details.known_for_department}
              </h1>
              <h1 className="mb-3 font-semibold">
            Also known as: ${info.details.also_known_as?.join(", ") || "N/A"}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5 border-none h-[2px] bg-zinc-500"/>
      {/* part 3 external links */}
      <div className="text-2xl text-white flex gap-x-11 mt-2 mb-3">
      <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-fill"></i>
        </a>
      <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
      <i className="ri-facebook-circle-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
        >
          <i className="ri-instagram-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.twitter.com/${info.externalid.twitter_id}/`}
        >
          <i className="ri-twitter-x-line"></i>
        </a>
      </div>
      <span className="text-3xl font-bold mb-10 text-white">  Biography:<br/> </span>
      <div className="text-white text-md font-semibold mt-3">
       <p>{info.details.biography}</p>
      </div>
      <h1 className="mt-5 text-lg text-zinc-400 font-semibold">Known for:</h1>
      <Horizontalcards data={info.combinedCredits.cast}/>
      <div className="w-full flex justify-between">
        <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
        <Dropdown title={category} option={["tv","movie"]} func={(e)=>setcategory(e.target.value)}/>
      </div>
      <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
        {info[category + "Credits"]?.cast?.map((c,i)=>(
           <li key={i} className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer">
           <Link to={`/${category}/details/${c.id}`}>
           <span>Movie Name: {c.title ||
              c.name ||
              c.original_title ||
              c.original_name}</span>
           <span className="block ml-5 mt-2">{c.character && `Character name: ${c.character}`}</span>
           </Link>
         </li>
        ))}
        
      </div>
    </div>
    
  ) : (
    <Loading />
  );
};

export default Peopledetail;
