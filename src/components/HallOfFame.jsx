import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Profile from "./Profile";

export default function HallOfFame() {

    return (
        <div id="halloffame" className=" w-full h-[500px] bg-[#f5f5f5] flex flex-col justify-center items-center">
            <div data-aos="fade-up">
                <h1 className="text-5xl text-black font-bold text-center">Hall Of Fame</h1>
                <div className="m-10">
                    <Splide options={{
                        type: 'loop',
                        perPage: 1,
                        arrows: false,
                        pagination: false,
                        width: 500,
                        autoplay: true,
                        gap: '1rem',
                    }}>
                        <SplideSlide>
                            <Profile />
                        </SplideSlide>
                        <SplideSlide>
                            <Profile />
                        </SplideSlide>
                        <SplideSlide>
                            <Profile />
                        </SplideSlide>

                    </Splide>
                </div>
            </div>
        </div>
    );
}
