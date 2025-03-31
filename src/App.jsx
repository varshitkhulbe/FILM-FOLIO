import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Moviedetail from "./components/Moviedetail";
import Tvdetail from "./components/Tvdetail";
import Peopledetail from "./components/Peopledetail";
import Trailer from "./components/templates/Trailer";
import Notfound from "./components/Notfound";
import About from './components/About';
const App = () => {
  return (
    <div className="bg-[#1F1E24] h-screen w-screen flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<Moviedetail />}>
        <Route
         path="/movie/details/:id/trailer" 
         element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<Tvdetail />}>
        <Route
         path="/tv/details/:id/trailer" 
         element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<Peopledetail />} />
        <Route path="/About" element={<About/>} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </div>
  );
};

export default App;
