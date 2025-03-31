import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
const Horizontalcards = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {data.length>0 ? data.map((d, i) => (
        <Link to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="min-w-[18%] max-w-[15%] min-h-[35vh] bg-zinc-900 mr-5 mb-3 p-2 "
        >
          <img
            className="w-full h-[20vh] object-cover rounded-lg"
            src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path
            }`:noimage}
          />
          <div className="text-white p-2 ">
            <h1 className="font-semibold text-md">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="font-semibold text-xs mt-2 mb-2 text-wrap">
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-500">more</span>
            </p>
          </div>
        </Link>
      )):<h1 className="text-3xl text-white font-black text-center mt-5">Nothing to Recommend</h1>}
    </div>
  );
};

export default Horizontalcards;
