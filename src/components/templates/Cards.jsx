import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
const Cards = ({ data,title }) => {
  // console.log(data)
  return (
    <div className="flex flex-wrap gap-x-24 gap-y-10 px-[5%] bg-[#1F1E24] w-full h-full ">
      {data.map((c, i) => (
        <Link to={`/${c.media_type|| title}/details/${c.id}`} key={i} className="relative w-[25vh] bg-[#1F1E24]">
          <img
            className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={c.poster_path || c.backdrop_path || c.profile_path?`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path 
            }`:noimage}
          ></img>
          <h1 className="text-md text-zinc-300 mt-3 font-semibold">
            {c.title || c.name || c.original_title || c.original_name}
          </h1>

          {c.vote_average && (
            <div className="absolute right-[-10%] bottom-[25%] rounded-full bg-yellow-600 text-xl font-semibold text-white w-[7vh] h-[7vh] flex items-center justify-center">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
