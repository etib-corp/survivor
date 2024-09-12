import React from "react";
import { useState, useEffect } from "react";
import ETIBNavBar from "../components/ETIBNavBar";
import { useSearchParams } from "react-router-dom";
import { Button } from "flowbite-react";
import ETIBQuestion from "../components/ETIBQuestion";
import { useNavigate } from "react-router-dom";
import QuizService from "../services/QuizService";
import { buttonOutlineTheme } from "../themes";
import { HiArrowLeft } from "react-icons/hi";

function Quiz() {
    const [props, setProps] = useState({ page: "elearning" })
    const params = new URLSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [quizItem, setQuizItem] = useState<any>(null);
    const navigate = useNavigate();

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

    return (
        <div className="overflow-x-hidden h-screen">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            {
                quizItem === null ?
                    <div className="flex flex-col justify-center p-5 mx-[10vh]">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-bold py-3">
                                Quiz
                            </h1>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col space-y-8">
                        <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
                            <h1 className="text-4xl font-bold py-1">
                                {quizItem.title}
                            </h1>
                            <Button className="my-auto" theme={buttonOutlineTheme} color="default" onClick={() => {
                                params.delete('q');
                                window.location.href = '/Elearning';
                            }}>
                                <HiArrowLeft className="mr-2 h-5 w-5" />
                                Back
                            </Button>
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
