import React from 'react'
import { useState, useEffect } from 'react';
import ETIBNavBar from '../../components/ETIBNavBar';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Radio } from 'flowbite-react';
import axios from 'axios';

function QuizAdd() {
    const [props, setProps] = useState({ page: "quiz" });
    const [nbrAnswers, setNbrAnswers] = useState([1, 2]);
    const [nbrQuestions, setNbrQuestions] = useState([1]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: { errors },
    } = useForm<any>()

    const onSubmit: SubmitHandler<any> = (data) => {
        axios.post(`${process.env.REACT_APP_API_URL}/questions/new`, data);
        reset();
        navigate('/Quiz');
    }

    function deleteAnswer(value: number, index: number, indexQ: number) {
        if (nbrAnswers.length === 2) return;
        const data = getValues();
        data.questions[indexQ].answers.splice(index, 1);
        setNbrAnswers(nbrAnswers.filter((i) => i !== value));
        console.log(data);
    }

    function addAnswer() {
        if (nbrAnswers.length === 4) return;
        setNbrAnswers([...nbrAnswers, nbrAnswers[nbrAnswers.length - 1] + 1]);
    }

    function deleteQuestion(index: number) {
        if (nbrQuestions.length === 1) return;
        const data = getValues();
        data.questions.splice(index, 1);
        setNbrQuestions(nbrQuestions.filter((i) => i !== index));
        console.log(data);
    }

    return (
        <div className="overflow-x-hidden h-screen bg-pink-500">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flex flex-col">
                <div className="flex items-center justify-between p-5">
                    <h1 className="text-4xl font-bold">Add Quiz</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => navigate('/Quiz')}>
                        Back to Quiz
                    </button>
                </div>
                <form className="flex flex-col p-5 mx-[10vh]" onSubmit={handleSubmit(onSubmit)}>
                    <input key={"QuizInput"} type="text" placeholder="Quiz Title" {...register("title", { required: true })} />
                    {nbrQuestions.map((j, indexJ) => (
                        <div>
                            <input key={indexJ} type="text" placeholder="Question" {...register(`questions[${indexJ}].question`, { required: true })} />
                            <div>
                                {nbrAnswers.map((i, index) => (
                                    <>
                                        <input key={i} type="text" placeholder={`Type your answer `} {...register(`questions[${indexJ}].answers[${index}].answer`, { required: true })} />
                                        {errors.answers && <span>This field is required</span>}
                                        <Radio {...register(`questions[${indexJ}].answers[${index}].correct`)} name={`answer${j}`} value={"true"} onChange={(e: any) => {
                                            getValues().questions[indexJ].answers.forEach((answer: any) => {
                                                answer.correct = false;
                                            });
                                            getValues().questions[indexJ].answers[index].correct = e.target.checked;
                                        }} />
                                        <Button disabled={nbrAnswers.length == 2} onClick={() => deleteAnswer(i, index, indexJ)}>Remove Answer</Button>
                                        <Button disabled={nbrAnswers.length == 4} onClick={() => addAnswer()}>Add Answer</Button>
                                    </>
                                ))}
                            </div>
                            <Button disabled={nbrQuestions.length == 1} onClick={() => deleteQuestion(indexJ)}> Remove Question</Button>
                        </div>
                    ))}
                    <Button disabled={nbrQuestions.length == 20} onClick={() => {
                        setNbrQuestions([...nbrQuestions, nbrQuestions[nbrQuestions.length - 1] + 1]);
                        console.log(nbrQuestions);
                    }}>Add Question</Button>
                    <Button className="float-end" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default QuizAdd;

