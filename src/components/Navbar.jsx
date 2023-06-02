import React, { useState } from "react";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";


import Title from "./Title";

export default function Navbar() {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    // Tabs
    const tabs = ["Leaderboard", "Hall of Fame", "Playerlist"];

    return (
        <div className="fixed bg-black w-full h-[70px] flex justify-between items-center text-white z-10">
            <div className="flex my-2 mx-4">
                <Title />
            </div>

            {/* Menu */}
            <div className="mx-6">
                <ul className="hidden md:flex">
                    <li className="my-1 mx-2 font-semibold hover:border-b-2 border-green-400">
                        <a href="#leaderboard">Leaderboard</a>
                    </li>
                    <li className="my-1 mx-2 font-semibold hover:border-b-2 border-green-400">
                        <a href="#halloffame">Hall of Fame</a>
                    </li>
                    <li className="my-1 mx-2 font-semibold hover:border-b-2 border-green-400">
                        <a href="#playerlist">Playerlist</a>
                    </li>
                </ul>
            </div>


            {/* Hamburger */}
            <div
                onClick={handleClick}
                className="md:hidden z-10 flex items-center mr-6"
            >
                {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
            </div>

            {/* Mobile Menu */}
            <div
                className={
                    !nav
                        ? "fixed left-[-100%] "
                        : "fixed top-0 left-0 w-[55%] h-full uppercase border-r border-r-gray-600 bg-black ease-in-out duration-500"
                }
            >
                <div className="flex flex-col justify-center pl-4 h-[70px] bg-black">
                    <Title />
                </div>
                <ul>
                    <li className="mx-4 p-2 border-b-2 border-gray-600">
                        <a href="#leaderboard">Leaderboard</a>
                    </li>
                    <li className="mx-4 p-2 border-b-2 border-gray-600">
                        <a href="#halloffame">Hall of Fame</a>
                    </li>
                    <li className="mx-4 p-2 border-b-2 border-gray-600">
                        <a href="#playerlist">Playerlist</a>
                    </li>
                </ul>
            </div>

            {/* Dark Mode Icon */}
            <div
                className={
                    "bg-green-400 fixed flex flex-col top-[25%] right-[0%] w-[75px] h-[55px] justify-center rounded-l-3xl mr-[-20px] duration-300 hover:mr-[0px]"
                }
            >
                <button className="mx-4">
                    <BsFillMoonStarsFill size={25} />
                </button>
            </div>
        </div>
    );
}
