import React from "react";
import { Link } from "react-router-dom";
const Header = ({ data }) => {
  // console.log(data);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(${`https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        }`})`,
        backgroundPosition: "top-[10%]",
        backgroundSize: "cover",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="w-[70%] font-black text-5xl text-white mb-3">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] text-white font-semibold mb-3 ">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-500">more</Link>
      </p>
      <p className="text-white">
        <i className="ri-megaphone-fill text-yellow-400"></i>
        {data.release_date || "Not Available"}
        <i className="ri-album-fill text-yellow-400 ml-3"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`${data.media_type}/details/${data.id}/trailer`} className="text-white bg-[#6556CD] p-3 mt-5 rounded ">Watch Trailer</Link>
    </div>
  );
};

export default Header;
