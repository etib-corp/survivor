import React from "react";
import { useState, useEffect } from "react";
import ETIBNavBar from "../components/ETIBNavBar";
import { log } from "console";
import { useSearchParams } from "react-router-dom";
import { Button } from "flowbite-react";
import ETIBQuestion from "../components/ETIBQuestion";

function Quiz() {
    const [props, setProps] = useState({ page: "quiz" })
    const width = window.innerWidth;
    const params = new URLSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [quizItem, setQuizItem] = useState<any>(null);
    const quizzzz = [
        {
            'id': 1,
            'name': 'Quiz 1',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 2,
            'name': 'Quiz 2',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 3,
            'name': 'Quiz 3',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 4,
            'name': 'Quiz 4',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 5,
            'name': 'Quiz 5',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 6,
            'name': 'Quiz 6',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 7,
            'name': 'Quiz 7',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 8,
            'name': 'Quiz 8',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 9,
            'name': 'Quiz 9',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
        {
            'id': 10,
            'name': 'Quiz 10',
            'difficulty': 'easy',
            'img': 'https://via.placeholder.com/' + (width / 4)
        },
    ];

    const quixxxx = {
        'id': 9,
        'name': 'Quiz 9',
        'difficulty': 'easy',
        'img': 'https://via.placeholder.com/' + (width / 4),
        "questions": [
            {
                "id": 1,
                "question": "What is your name?",
                "answers": [
                    {
                        "id": 1,
                        "answer": "John",
                        "correct": false
                    },
                    {
                        "id": 2,
                        "answer": "Kbo",
                        "correct": true
                    },
                    {
                        "id": 3,
                        "answer": "Smith",
                        "correct": false
                    },
                    {
                        "id": 4,
                        "answer": "Doe",
                        "correct": false
                    }
                ]
            },
            {
                "id": 2,
                "question": "Are you a human?",
                "answers": [
                    {
                        "id": 1,
                        "answer": "Yes",
                        "correct": true
                    },
                    {
                        "id": 2,
                        "answer": "No",
                        "correct": false
                    },
                    {
                        "id": 3,
                        "answer": "Maybe",
                        "correct": false
                    },
                    {
                        "id": 4,
                        "answer": "I don't know",
                        "correct": false
                    }
                ]
            },
        ]
    }


    useEffect(() => {
        console.log("hello");
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('q');
        if (myParam !== null) {
            setQuizItem(quizzzz[parseInt(myParam)]);
        }
    }, [searchParams]);

    return (
        <div className="overflow-x-hidden h-screen bg-pink-500">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            {quizItem === null ?
                <div className="flex flex-col justify-center p-5 mx-[10vh]">
                    <h1 className="text-4xl font-bold py-3">
                        Quiz
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {
                            quizzzz.map((quiz, index) => {
                                return (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={() => {
                                        params.delete('q');
                                        params.append('q', index.toString());
                                        window.location.href = '/Quiz?' + params.toString();
                                    }}>
                                        <img src={quiz.img} alt="quiz" className="w-full object-cover object-center" />
                                        <div className="py-2">
                                            <h1 className="text-xl font-bold">{quiz.name}</h1>
                                            <p className="text-sm text-gray-500">{quiz.difficulty}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> :
                <div className="">
                    <div className="p-5 mx-[10vh]">
                        <h1 className="text-4xl font-bold">{quizItem.name} kbo</h1>
                        <Button className="float-end" onClick={() => {
                            params.delete('q');
                            window.location.href = '/Quiz';
                        }
                        }>Back</Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <ETIBQuestion QuizItem={quixxxx} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Quiz;