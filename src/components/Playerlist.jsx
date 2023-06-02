import React, { useEffect } from "react";

import StickyHeadTable from "./StickyHeadTable";

import Aos from 'aos';

export default function Playerlist() {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <div id="playerlist" data-aos="fade-up" className="w-full h-screen flex flex-col items-center pt-10">
            <h1 className="text-5xl font-bold my-10">Past Months</h1>
            <div className="">
                {/* <StickyHeadTable /> */}
            </div>
        </div>
    );
}
