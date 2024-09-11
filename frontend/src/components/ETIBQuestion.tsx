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
            console.log({"c": currentQuestion});
            console.log({"L":QuizItem.questions.length});
            setCurrentQuestion(-1);
            setFinish(false);
        }
    }, [currentQuestion]);
    return (
        <div className="m-0 p-0 box-border">
            <div className="flex justify-center items-center flex-col ">

                <h1 className="text-black my-5 mx-0">{QuizItem.title}</h1>

                <div className="max-w-[600px] w-full py-0 px-4" id="questionArea" hidden={!not_finish}>
                    {
                        QuizItem.questions[currentQuestion] &&
                        <>
                            <div className="text-black text-lg my-5 mx-0" id="question">{QuizItem.questions[currentQuestion].question}</div>
                            <div id="options" className="min-w-96">
                                {
                                    QuizItem.questions[currentQuestion].answers.map((option: any, index: number) => {
                                        return (
                                            <div key={index} className="flex items-center justify-center bg-black bg-opacity-10 rounded-md p-3 my-2 cursor-pointer hover:bg-opacity-20 h-12 w-full" onClick={() => {
                                                if (option.correct) {
                                                    setScore(score + 1);
                                                }
                                                setCurrentQuestion(currentQuestion + 1);
                                            }}>
                                                <span className="text-black text-lg">{option.answer}</span>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </>
                    }
                </div>

                <div className={"bg-black p-5 rounded-md m-3 text-center" + (not_finish ? "" : " flex flex-col justify-center items-center") } id="scoreArea" hidden={not_finish}>
                    <img src="https://img.icons8.com/color/96/26e07f/checked--v4.png" className="w-auto h-24 mb-3" />
                    <p className="text-white">Finish!</p>
                    <hr />
                    <div className="text-white text-3xl font-bold mb-3">{Math.floor(score / QuizItem.questions.length * 100) }% Correct</div>
                    {/* <div className="text-base text-white mb-3">va baiser mtn</div> */}
                </div>
            </div>
        </div>
    );
}

export default ETIBQuestion;
