import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/NavBar/rr.png";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-4  max-w-[85vw] sm:max-w-[90vw] lg:max-w-[95vw] mx-auto whitespace-nowrap">
        {/* logo */}
        <div className=" flex sm:max-w-[90vw] lg:max-[95vw]:  ">
          <img
            src={logo}
            className="w-40 shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <ul className="flex gap-4 lg:space-x-7 sm:space-x-3">
          <Link to="/">
            <li
              className={
                "relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] hidden sm:inline whitespace-nowrap font-bold py-3 "
              }
            >
              Home
            </li>
          </Link>
          <Link to="/search">
            <li
              className={
                "relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] hidden sm:inline whitespace-nowrap font-bold py-3 "
              }
            >
              Rented
            </li>
          </Link>
          <Link to="/about">
            <li
              className={
                "relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] hidden sm:inline whitespace-nowrap font-bold py-3"
              }
            >
              About
            </li>
          </Link>
          <Link to="/connect">
            <li
              className={
                "relative text-[15px] border-b-[3px] border-b-transparent hover:border-b-[#dc4a11] hidden sm:inline whitespace-nowrap font-bold py-3 "
              }
            >
              Connect
            </li>
          </Link>
        </ul>

        <div className=" items-center  pl-6 text-[15px] font-bold ">
          <div className=" ">
            <Link to="/profile">
              {currentUser ? (
                <img className=" rounded-full h-9 w-9 object-cover border-[2px] shadow-sm  border-black hover:border-[#f35313]" src={currentUser.avatar} alt="profile" />
              ):( <button className=" bg-[#dc4a11] p-2 mr-2 text-white rounded-full px-4 ml-4 font-bold hover:bg-[#f35313] transition duration-150 ease-in-out cursor-pointerp-[1px]">Sign In</button>
              ) }
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
