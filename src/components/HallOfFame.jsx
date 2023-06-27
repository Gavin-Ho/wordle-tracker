import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

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

    return (
        <div id="halloffame" className=" w-full h-[500px] bg-[#f5f5f5] text-black flex justify-center items-center">
            <div className="border-2 border-green-600 rounded-lg">
                <div data-aos="fade-up">
                    <h1 className="text-5xl text-black font-semibold text-center m-12">Hall Of Fame 🏆</h1>
                    <div className="my-12">
                        <Splide options={{
                            type: 'loop',
                            perPage: 1,
                            arrows: false,
                            pagination: false,
                            width: 500,
                            autoplay: true,
                            gap: '1rem',
                        }}>
                            {isLoading ? null : (
                                data.map((value) => (
                                    Object.entries(value.Winners).map(([name, score]) => (
                                        <SplideSlide key={name}>
                                            <Profile month={value.Month} year={value.Year} name={name} score={score} />
                                        </SplideSlide>
                                    ))
                                ))
                            )}
                        </Splide>
                    </div>
                </div>
            </div>
        </div>
    );
}
