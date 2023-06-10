import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import dates from "./dates";
import { MdKeyboardArrowDown } from 'react-icons/md'
import axios from 'axios';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs'

export default function Leaderboard() {
    const [data, setData] = useState({});
    const [updateDate, setUpdateDate] = useState("");
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        axios.get('https://wordle-api.herokuapp.com/api/scores/currentMonth')
            .then(response => {
                setData(response.data.scores);
                setUpdateDate(response.data.lastUpdate);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        const updatedArray = Object.entries(data).map(([participant, score]) => ({ participant, score }));
        updatedArray.sort((a, b) => a.score - b.score);
        setDataArray(updatedArray);
    }, [data]);

    const firstPlace = dataArray.length > 0 ? dataArray[0].participant : '';
    const firstPlaceScore = dataArray.length > 0 ? dataArray[0].score : '';

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = dataArray.slice(indexOfFirstRow, indexOfLastRow);

    const renderRows = () => {
        if (dataArray.length === 0) {
            return null; // or you can render a loading indicator
        }

        return currentRows.map((data, index) => (
            <tr key={index}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td className="text-left pl-12">{data.participant}</td>
                <td>{data.score}</td>
            </tr>
        ));
    };

    return (
        <div
            id="leaderboard"
            className="w-full h-screen"
        >
            <div className="h-screen justify-center items-center gap-4 flex flex-col lg:flex-row">

                <div className="w-[700px] flex flex-col justify-center text-center py-10 border-1 border-green-400 rounded-lg">
                    <div className="mb-10">
                        <h1 className="font-bold my-2 text-5xl">
                            🏋️‍♂️ {dates} 2023 Standings
                        </h1>
                        <h3>Last updated: 2023-06-<Typed
                            strings={[`${updateDate}`]}
                            typeSpeed={40}
                            backSpeed={300}
                            loop
                        /></h3>
                    </div>
                    <div>
                        <div className="flex flex-col text-2xl mx-24">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="pb-3">Rank</th>
                                        <th className="pb-3">Participant</th>
                                        <th className="pb-3">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderRows()}
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            {dataArray.length > rowsPerPage && (
                                <div className="flex justify-between mt-12 mx-72">
                                    <div className="">
                                        <button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <BsArrowLeftCircle size={25} />
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={indexOfLastRow >= dataArray.length}
                                        >
                                            <BsArrowRightCircle size={25} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-[500px] justify-center p-10">
                    <p className="text-green-400 font-bold my-2 text-4xl uppercase">
                        Rank #1
                    </p>
                    <div className="text-xl flex">
                        <Typed
                            className="text-gray-300 text-6xl font-bold"
                            strings={[firstPlace]}
                            typeSpeed={40}
                            backSpeed={100}
                            loop
                        />
                    </div>
                    <div className="text-xl my-6">
                        1st Place Score: {firstPlaceScore}
                    </div>
                </div>

            </div>

            {/* Down Arrow */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <MdKeyboardArrowDown size={35} />
            </div>

        </div>
    );
}
