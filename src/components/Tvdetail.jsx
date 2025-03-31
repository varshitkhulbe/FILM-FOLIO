import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadtv, removetv } from "../store/actions/tvAction";
import Loading from "../components/Loading";
import Horizontalcards from "./templates/Horizontalcards";
const Tvdetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(${`https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`})`,
        backgroundPosition: "top-[10%]",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-screen px-[10%] overflow-auto overflow-x-hidden"
    >
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

      {/*part 2 poster and details*/}
      <div className="w-full flex">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[45vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
        ></img>
        <div className="content ml-10">
          <h1 className=" text-white font-black text-5xl">
            {" "}
            {info.details.title ||
              info.details.name ||
              info.details.original_title ||
              info.details.original_name}
            <small className="text-2xl text-zinc-300 font-bold">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <h1 className="text-white text-2xl mt-2 font-semibold italic ">
            {info.details.tagline ? info.details.tagline : ""}
          </h1>

          <div className="flex flex-col justify-start text-white text-xl gap-x-5 my-5">
            <div className="flex items-center gap-x-3 mb-3 ">
              <span className="rounded-full bg-yellow-600 text-xl font-semibold text-white w-[7vh] h-[7vh] flex items-center justify-center">
                {(info.details.vote_average * 10).toFixed()}
                <sup>%</sup>
              </span>
              <h1 className="font-semibold">(User Score)</h1>
            </div>
            <div>
              <h1 className="mb-2 font-semibold">
                Release Date: {info.details.release_date}
              </h1>
              <h1 className="mb-2 font-semibold">
                Genre: {info.details.genres.map((g) => g.name).join(",")}
              </h1>
              <h1 className="mb-5 font-semibold">
                Runtime: {info.details.runtime}min
              </h1>
                <Link className=" p-3 bg-[#6556CD] rounded-md hover:text-black duration-300 font-semibold" to={`trailer`}>
                <i className="ri-play-fill"></i>
                Play Trailer</Link>
            </div>
          </div>
        </div>
      </div>
      {/*PART 3 PLATFORMS*/}
      <div className="W-[100px] flex flex-col gap-[10%]">
        <div className="mt-5">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-5 items-center text-zinc-100 mb-3">
              <h1 className="w-[100px]">Available:</h1>
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[5vh] w-[5vh] object-fit rounded-lg"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                ></img>
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-5 items-center text-zinc-100 mb-3">
              <h1 className="w-[100px]">Available on rent :</h1>
              {info.watchproviders.rent.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[5vh] w-[5vh] object-fit rounded-lg"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                ></img>
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-5 items-center text-zinc-100 mb-3">
              <h1 className="w-[100px]">Available to buy :</h1>
              {info.watchproviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[5vh] w-[5vh] object-fit rounded-lg"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                ></img>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-white text-2xl mt-2 font-semibold">Overview:</h1>
          <p className="text-white">{info.details.overview}</p>
        </div>
        <h1 className="text-xl text-white font-semibold mt-2">
          Translations available:
        </h1>
        <span className="text-white text-md font-light">
          {info.translations.join(", ")}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-white mt-5">Season:</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {info.details.seasons.length >0 ? info.details.seasons.map((s,i)=>(
          <div className="w-[15vw] mr-[5%]">
          <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[17vw] h-[50vh] object-cove"
          src={`https://image.tmdb.org/t/p/original/${
            s.poster_path
          }`}
        ></img>
        <h1 className="text-xl text-white mt-3 font-semibold ">
          {s.name}
        </h1>
        </div>
        )):<h1 className="text-3xl mt-5 text-white font-black text-center">Nothing to show</h1>}
      
      </div>
      <hr className="mt-5 border-none h-[2px] bg-zinc-500"/>
      {/* Part 4 recommendations */}
    <h1 className="text-3xl font-bold text-white mt-5">Recommendations & Similar:</h1>
    <Horizontalcards data={info.recommendations.length>0 ? info.recommendations: info.similar}/>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetail;
