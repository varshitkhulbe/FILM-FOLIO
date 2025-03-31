import React, { useEffect, useState } from "react";
import axios from "../../utils/Axios";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg"
const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data);
      setSearches(data.results);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center ml-[15%]">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[50%] p-5 mx-10 text-xl text-zinc-200 outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      ></input>
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-3xl cursor-pointer ri-close-fill"
        ></i>
      )}

      <div className="max-h-[50vh] w-[50%] bg-zinc-200 z-[100] absolute left-[8%] top-[100%] overflow-auto rounded">
        {searches.map((s, i) => {
          return (
            <Link to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black text-zinc-600 hover:bg-zinc-300 font-semibold inline-block p-10 w-full flex items-center justify-start border-b-2 border-zinc-100 duration-300"
            >
              <img className="h-[10vh] w-[10vh] object-cover rounded mr-5 shadow-lg" src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`:noimage} alt=""></img>
              <span>
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topnav;
