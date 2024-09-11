import React from "react";
import { useState, useEffect } from "react";
import ETIBNavBar from "../components/ETIBNavBar";
import { log } from "console";
import { useSearchParams } from "react-router-dom";
import { Button } from "flowbite-react";
import ETIBQuestion from "../components/ETIBQuestion";
import { useNavigate } from "react-router-dom";
import QuizService from "../services/QuizService";

function Quiz() {
    const [props, setProps] = useState({ page: "quiz" })
    const width = window.innerWidth;
    const params = new URLSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [quizItem, setQuizItem] = useState<any>(null);
    const navigate = useNavigate();
    const [privileges, setPrivileges] = useState<Boolean>(false);
    const [quizzes, setQuizzes] = useState<any>([]);

    useEffect(() => {
        const userInfo: any = localStorage.getItem("userData") || "";
        try {
            const parsedUserInfo = JSON.parse(userInfo);
            if (parsedUserInfo.roles[0] === "ROLE_CUSTOMER") {
                navigate("/Wardrobe");
            } else {
                setPrivileges(true);
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }

        QuizService.getAll().then((response: any) => {
            setQuizzes(response.data['hydra:member']);
        }).catch((error) => {
            console.log(error);
        });

    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('q');
        if (myParam !== null) {
            QuizService.get(parseInt(myParam)).then((response: any) => {
                let data = response.data;
                setQuizItem(data);
            });
        }
    }, [searchParams]);

    function deleteQuiz(id: number) {
        console.log(id);
        QuizService.deleteID(id).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    return (
        <div className="overflow-x-hidden h-screen bg-pink-500">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            {quizItem === null ?
                <div className="flex flex-col justify-center p-5 mx-[10vh]">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold py-3">
                            Quiz
                        </h1>
                        {privileges &&
                            <Button className="float-end" onClick={() => {
                                navigate('/Quiz/Add');
                            }
                            }>Add QUIZ</Button>
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {
                            quizzes.map((quiz: any, index: number) => {
                                return (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                        <img src={`https://via.placeholder.com/' + ${width / 4}`} alt="quiz" className="w-full object-cover object-center" />
                                        <div className="flex justify-between">
                                            <div className="py-2 cursor-pointer" onClick={() => {
                                                params.delete('q');
                                                params.append('q', quiz.id.toString());
                                                window.location.href = '/Quiz?' + params.toString();
                                            }}>
                                                <h1 className="text-xl font-bold">{quiz.title}</h1>
                                            </div>
                                            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold h-10 text-sm rounded-md mt-5 z-1" onClick={() => deleteQuiz(quiz.id)}>
                                                delete
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> :
                <div className="">
                    <div className="p-5 mx-[10vh]">
                        <h1 className="text-4xl font-bold">{quizItem.title}</h1>
                        <Button className="float-end" onClick={() => {
                            params.delete('q');
                            window.location.href = '/Quiz';
                        }
                        }>Back</Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <ETIBQuestion QuizItem={quizItem} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Quiz;
