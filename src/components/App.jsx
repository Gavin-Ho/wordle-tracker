import React from "react";


import Navbar from "./Navbar";
import Leaderboard from "./Leaderboard";
import HallOfFame from "./HallOfFame";
import Footer from "./Footer";

export default function App() {

    return (
        <div>
            <Navbar />
            <Leaderboard />
            <HallOfFame />
            <Footer />
        </div>
    );
}
