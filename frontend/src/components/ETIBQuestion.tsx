import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ETIBProgressBar from "./ETIBProgressBar";


const ETIBQuestion: React.FC<{ QuizItem: any }> = ({ QuizItem }) => {
    const [progress, setProgress] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [not_finish, setFinish] = useState(true);

    useEffect(() => {
        if (currentQuestion === QuizItem.questions.length) {
            console.log({ "c": currentQuestion });
            console.log({ "L": QuizItem.questions.length });
            setCurrentQuestion(-1);
            setFinish(false);
        }
    }, [currentQuestion]);

    return (
        <div className="flex border shadow-md rounded-md bg-pinkB w-4/5 mx-4">
            <div className="flex flex-col w-full">
                <h1 className="text-2xl text-left text-black border p-4 bg-pinkB">
                    {QuizItem.title}
                </h1>
                <div className="flex flex-col w-full px-4" id="questionArea" hidden={!not_finish}>
                    {
                        QuizItem.questions[currentQuestion] &&
                        <>
                            <div className="flex w-full text-black text-lg my-5" id="question">
                                {QuizItem.questions[currentQuestion].question}
                            </div>
                            <div id="options" className="flex flex-col w-full">
                                {
                                    QuizItem.questions[currentQuestion].answers.map((option: any, index: number) => {
                                        return (
                                            <div key={index} className="flex bg-black bg-opacity-10 rounded-md cursor-pointer hover:bg-opacity-20 h-12 w-4/5 my-4 mx-12" onClick={() => {
                                                if (option.correct) {
                                                    setScore(score + 1);
                                                }
                                                setCurrentQuestion(currentQuestion + 1);
                                            }}>
                                                <span className="flex text-black text-lg mx-4 my-auto">
                                                    {option.answer}
                                                </span>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
                <div className={"bg-pinkT p-5 rounded-md m-3 text-center" + (not_finish ? "" : " flex flex-col justify-center items-center")} id="scoreArea" hidden={not_finish}>
                    <img src="https://img.icons8.com/color/96/26e07f/checked--v4.png" className="w-auto h-24 mb-3" />
                    <p className="text-white">
                        Finish !
                    </p>
                    <hr />
                    <div className="text-white text-3xl font-bold mb-3">
                        {Math.floor(score / QuizItem.questions.length * 100)}% Correct
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ETIBQuestion;
