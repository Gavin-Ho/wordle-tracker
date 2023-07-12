import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


import Title from "./Title";

export default function Navbar() {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    return (
        <div className="fixed bg-black w-full h-[10%] flex justify-between items-center text-white z-10">
            <div className="flex my-2 mx-4">
                <Title />
            </div>

            {/* Menu */}
            <div className="mx-6">
                <ul className="hidden lg:flex text-2xl">
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
                className="lg:hidden z-10 flex items-center mr-6"
            >
                {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
            </div>

            {/* Mobile Menu */}
            <div
                className={
                    !nav
                        ? "fixed top-[-100%] w-[100%] flex flex-col justify-center items-center h-full ease-in-out duration-500 bg-black"
                        : "fixed top-0 w-[100%] flex flex-col justify-center items-center h-full font-semibold bg-black ease-in-out duration-500"
                }
            >
                <div className="flex flex-col justify-center h-[70px] bg-black">
                    <Title />
                </div>
                <ul className="text-3xl">
                    <li className="mx-4 my-12">
                        <a onClick={handleClick} href="#leaderboard">Leaderboard</a>
                    </li>
                    <li className="mx-4 my-12">
                        <a onClick={handleClick} href="#halloffame">Hall of Fame</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
