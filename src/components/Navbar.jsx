import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


import Title from "./Title";

export default function Navbar() {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

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
                </ul>
            </div>
        </div>
    );
}
