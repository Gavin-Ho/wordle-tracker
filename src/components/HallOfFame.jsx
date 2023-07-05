import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
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
        <div id="halloffame" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/flowers.png')" }} className="w-full h-screen bg-[#e6f1e8] text-black flex justify-center items-center">
            <div data-aos="fade-up">
                <div className="w-full h-full border-2 bg-[#e9f0e7] border-green-600 rounded-lg my-12">
                    <h1 className="text-4xl text-black font-semibold text-center md:my-12 my-8">Hall Of Fame 🏆</h1>
                    <div className="my-8 flex justify-center">
                        <Splide options={{
                            type: 'loop',
                            perPage: 1,
                            arrows: true,
                            pagination: false,
                            width: 400,
                            autoplay: true,
                            interval: 2000,
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
