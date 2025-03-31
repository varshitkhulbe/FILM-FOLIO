import React from "react";

const About = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635574984058-2bc2a8a36223?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-30"></div>
      <div className="absolute top-[100px] max-w-4xl bg-opacity-90 shadow-2xl rounded-2xl p-10 text-center flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-[#6556CD] mb-6 drop-shadow-lg">About FilmFolio</h1>
        <p className="text-gray-300 text-xl mb-6 leading-relaxed max-w-2xl">
          Welcome to <span className="text-[#6556CD] font-semibold">FilmFolio</span>, the ultimate hub for movie lovers. We bring you the latest updates, reviews, and insights into the world of cinema.
        </p>
        <p className="text-gray-400 text-lg mb-6 leading-relaxed max-w-2xl">
          From timeless classics to the newest blockbusters, FilmFolio is your gateway to discovering and celebrating the magic of films. Join us as we explore the art of storytelling through the silver screen.
        </p>
      </div>
    </div>
  );
};

export default About;