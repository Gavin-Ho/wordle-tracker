import React, { useEffect, useState } from "react";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Profile from "./Profile";

export default function HallOfFame() {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://wordle-api.herokuapp.com/api/hall-of-fame')
            .then(response => {
                setData(response.data);
                setIsLoading(false); // Set loading state to false
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false); // Set loading state to false even on error
            });
    }, []);

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div id="halloffame" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/flowers.png')" }} className="w-full bg-[#e6f1e8]">
            <div className="text-black flex justify-center items-center py-12" data-aos="fade-up">
                <div className="w-[100%] h-full">
                    <h1 className="lg:text-[3rem] text-[2rem] text-green-900 font-bold text-center my-4">🏆 Hall Of Fame 🏆</h1>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">

                        {isLoading ? <div className="mb-24 text-xl">Loading slides...</div> : (
                            data.map((value) => (
                                Object.entries(value.Winners).map(([name, score]) => (
                                    <Profile month={value.Month} year={value.Year} name={name} score={score} />
                                ))
                            ))
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
