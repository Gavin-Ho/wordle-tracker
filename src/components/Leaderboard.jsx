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

    const [firstPlace, setFirstPlace] = useState('');
    const [firstPlaceScore, setFirstPlaceScore] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    // Pull currentMonth data from Wordle-API
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


    // Create an array of all participants, sort them based on scores, and assign
    useEffect(() => {
        const updatedArray = Object.entries(data).map(([participant, score]) => ({ participant, score }));

        // Sort participants by score in ascending order (lowest score first)
        updatedArray.sort((a, b) => a.score - b.score);

        let currentRank = 1;
        let prevScore = null;

        for (let i = 0; i < updatedArray.length; i++) {
            if (prevScore === null || updatedArray[i].score > prevScore) {
                currentRank = i + 1;
                prevScore = updatedArray[i].score;
            }
            updatedArray[i].rank = currentRank;
        }

        setDataArray(updatedArray);

        if (updatedArray.length > 0) {
            const firstPlaceParticipants = updatedArray.filter(entry => entry.rank === 1);
            const firstPlaceNames = firstPlaceParticipants.map(entry => entry.participant);
            const firstPlaceNamesFormatted = firstPlaceNames.join(', ');
            setFirstPlace(firstPlaceNamesFormatted);
            setFirstPlaceScore(firstPlaceParticipants[0].score);
        }
    }, [data]);


    // Render the leaderboard rows
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
                <td>{data.rank}</td>
                <td className="text-center">{data.participant}</td>
                <td>{data.score}</td>
            </tr>
        ));
    };

    return (
        <div
            id="leaderboard"
            className="h-full lg:h-screen"
        >
            <div className="h-full justify-end lg:justify-center items-center flex flex-col-reverse lg:flex-row">
                <div>
                </div>
                <div className="w-[90%] md:w-[70%] lg:w-[35%] flex flex-col justify-center text-center mb-10 lg:my-10 border-1 border-green-400 rounded-lg">
                    <div className="mb-4">
                        <h1 className="font-bold my-2 text-3xl xl:text-4xl">
                            🏋️‍♂️ {dates} 2023
                        </h1>
                        {isLoading ? (
                            <h3>Loading scores...</h3> // Render a loading indicator while the API call is in progress
                        ) : (
                            <>
                                <h3>
                                    Updated: {dates} &nbsp;
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
                        <div className="flex flex-col text-md md:text-lg lg:text-xl xl:text-2xl mx-12">
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
                                <div className="flex justify-center mt-6">
                                    <div className="pr-8">
                                        <button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <BsArrowLeftCircle size={25} />
                                        </button>
                                    </div>
                                    <div className="pl-8">
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

                <div className="flex flex-col justify-center items-center w-full lg:w-[600px] lg:mx-10 px-4 lg:mt-[0%] mt-[20%] mb-4">
                    <p className="text-green-300 font-bold my-2 text-2xl lg:text-4xl uppercase">
                        Rank #1
                    </p>
                    <div className="text-[2rem] lg:text-[4rem] font-bold flex py-0 lg:py-4">
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
                    <div className="text-lg md:text-xl mt-3">
                        1st Place Score: {firstPlaceScore}
                    </div>
                </div>

            </div>

            {/* Down Arrow */}
            <div className="lg:block hidden absolute bottom-7 left-1/2 animate-bounce">
                <MdKeyboardArrowDown size={35} />
            </div>

        </div>
    );
}
