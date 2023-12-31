import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mahesh from "../assets/hero/mahesh.mp4";
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMathRoute(route) {
    if (route == location.pathname) {
      return true;
    }
  }

  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className=" h-[25rem] sm:h-[25rem] flex ">
      <div className=" absolute w-full z-20 ">
        <div className=" bg-black/40 absolute z-10 w-full h-[25rem]"></div>
        <video
          src={mahesh}
          autoPlay
          loop
          muted
          className=" object-cover w-full sm:h-[25rem] h-[25rem]"
        />
      </div>
      <div className=" relative z-30 flex flex-col items-center w-full pt-14">
        <p
          className="text-white text-[25px] lg:text-[60px] sm:text-[40px] font-bold whitespace-nowrap
        "
        >
          {" "}
          Find your ideal home away from home!
        </p>
        <p className=" text-white pt-2 sm:pt-0 sm:text-[22px] font-extralight">
          only available for Nanded!
        </p>

        {/* links */}
        <div className="mt-5  ">
          <ul className=" flex space-x-4 sm:space-x-8 text-white ">
            <button
              className={` relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] ${
                pathMathRoute("/main") && "text-blue-400 border-b-[#dc4a11]"
              } whitespace-nowrap font-medium`}
              onClick={() => navigate("/main")}
            >
              Rooms
            </button>
            <button
              className={` relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] ${
                pathMathRoute("/main") && "text-blue-400 border-b-[#dc4a11]"
              } whitespace-nowrap font-medium`}
              onClick={() => navigate("/main")}
            >
              Hostels
            </button>
            <button
              className={` relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] ${
                pathMathRoute("/main") && "text-blue-400 border-b-[#dc4a11]"
              } whitespace-nowrap font-medium`}
              onClick={() => navigate("/main")}
            >
              Flats
            </button>
            <button
              className={` relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] ${
                pathMathRoute("/main") && "text-blue-400 border-b-[#dc4a11]"
              } whitespace-nowrap font-medium`}
              onClick={() => navigate("/main")}
            >
              Hotels
            </button>
            <button
              className={` relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] ${
                pathMathRoute("/main") && "text-blue-400 border-b-[#dc4a11]"
              } whitespace-nowrap font-medium`}
              onClick={() => navigate("/main")}
            >
              Restaurants
            </button>
          </ul>
        </div>

        <div className=" relative mt-6">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" bg-white py-3 sm:w-[38rem] lg:w-[30rem] rounded-full pl-5 shadow-md
           placeholder:text-gray-500 placeholder:sm:text-[18px] outline-0"
              placeholder="Area, Adress, City, House Name or FlatNo..."
            />
            <button className=" absolute w-[2.7rem] h-[2.7rem] rounded-full bg-[#dc4a11] top-[0.2rem] right-1 flex items-center justify-center cursor-pointer">
              <BiSearchAlt className=" text-white sm:text-[22px] cursor-pointer" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
