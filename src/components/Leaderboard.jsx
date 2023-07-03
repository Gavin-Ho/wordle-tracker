import React, { useEffect, useState } from "react";
import dates from "./dates";
import { MdKeyboardArrowDown } from 'react-icons/md'
import axios from 'axios';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';

export default function Leaderboard() {
    const [data, setData] = useState({});
    const [updateDate, setUpdateDate] = useState("");
    const [dataArray, setDataArray] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://wordle-api.herokuapp.com/api/scores/currentMonth')
            .then(response => {
                setData(response.data.scores);
                setUpdateDate(response.data.lastUpdate);
                setIsLoading(false); // Set loading state to false
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false); // Set loading state to false even on error
            });
    }, []);

    const [firstPlace, setFirstPlace] = useState('');
    const [firstPlaceScore, setFirstPlaceScore] = useState('');

    useEffect(() => {
        const updatedArray = Object.entries(data).map(([participant, score]) => ({ participant, score }));
        updatedArray.sort((a, b) => a.score - b.score);
        setDataArray(updatedArray);

        if (updatedArray.length > 0) {
            setFirstPlace(updatedArray[0].participant);
            setFirstPlaceScore(updatedArray[0].score);
        }
    }, [data]);

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
            className=""
        >
            <div className="lg:h-screen justify-center items-center gap-4 flex flex-col-reverse lg:flex-row">
                <div>

                </div>
                <div className="w-[450px] lg:w-[700px] flex flex-col justify-center text-center mb-36 lg:my-10 border-1 border-green-400 rounded-lg">
                    <div className="mb-10">
                        <h1 className="font-bold my-4 text-3xl xl:text-5xl">
                            🏋️‍♂️ {dates} 2023 Standings
                        </h1>
                        {isLoading ? (
                            <h3>Loading scores...</h3> // Render a loading indicator while the API call is in progress
                        ) : (
                            <>
                                <h3>
                                    Last updated: 2023-07-
                                    <TypeAnimation
                                        sequence={[
                                            updateDate.toString(),
                                            1000,
                                            '',
                                            1000,
                                            updateDate.toString(),
                                            1000
                                        ]}
                                        wrapper="span"
                                        speed={200}
                                        style={{
                                            fontSize: '1rem',
                                        }}
                                        repeat={Infinity}
                                    />
                                </h3>
                            </>
                        )}
                    </div>
                    <div>
                        <div className="flex flex-col text-xl xl:text-2xl mx-12 lg:mx-24">
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
                                <div className="flex justify-between mx-36 xl:mx-72 mt-12">
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

                <div className="flex flex-col w-[400px] lg:w-[600px] text-left justify-center my-96 lg:my-0 mx-10">
                    <p className="text-green-400 font-bold my-2 text-3xl lg:text-4xl uppercase">
                        Rank #1
                    </p>
                    <div className="text-5xl lg:text-[4rem] font-bold flex py-0 lg:py-4">
                        {firstPlace && (
                            <TypeAnimation
                                sequence={[
                                    firstPlace.toString(),
                                    1000,
                                    '',
                                    1000,
                                    firstPlace.toString(),
                                    1000
                                ]}
                                wrapper="span"
                                speed={200}
                                repeat={Infinity}
                            />
                        )}
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
