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
    const [props, setProps] = useState({ page: "elearning" })
    const width = window.innerWidth;
    const params = new URLSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [quizItem, setQuizItem] = useState<any>(null);
    const navigate = useNavigate();
    const [privileges, setPrivileges] = useState<Boolean>(false);
    const [quizzes, setQuizzes] = useState<any>([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('q');
        if (myParam !== null) {
            QuizService.get(parseInt(myParam)).then((response: any) => {
                let data = response.data;
                setQuizItem(data);
            });
        } else {
            navigate('/Elearning');
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
                </div> :
                <div className="">
                    <div className="p-5 mx-[10vh]">
                        <h1 className="text-4xl font-bold">{quizItem.title}</h1>
                        <Button className="float-end" onClick={() => {
                            params.delete('q');
                            window.location.href = '/Elearning';
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
