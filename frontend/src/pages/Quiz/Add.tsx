import React from 'react'
import { useState, useEffect } from 'react';
import ETIBNavBar from '../../components/ETIBNavBar';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Card, Radio, TextInput } from 'flowbite-react';
import axios from 'axios';
import { Table, FileInput } from "flowbite-react";
import { buttonOutlineTheme, buttonTheme, fileInputTheme, tableTheme, textInputTheme } from '../../themes';

import CryptoJS from "crypto-js";

function QuizAdd() {
    const [props, setProps] = useState({ page: "elearning" });
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

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const bytes = CryptoJS.AES.decrypt(userInfo, process.env.REACT_APP_SECRET_KEY || "");
            const decryptedUserInfo = bytes.toString(CryptoJS.enc.Utf8);
            const parsedUserInfo = JSON.parse(decryptedUserInfo);

            console.log(parsedUserInfo);

            if (parsedUserInfo.roles[0] === "ROLE_CUSTOMER") {
                navigate("/Wardrobe");
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }
    }, []);

    const onSubmit: SubmitHandler<any> = (data) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let base64data: any = reader.result;
            base64data = base64data?.toString().split(',')[1];
            data.image = base64data;
            axios.post(`${process.env.REACT_APP_API_URL}/questions/new`, data);
            reset();
            navigate('/Elearning');
        }
        reader.readAsDataURL(data.image[0]);
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
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flex flex-col space-y-8 pb-40">
                <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
                    <h1 className="text-4xl font-bold">
                        Add Quiz
                    </h1>
                    <Button theme={buttonTheme} color="default" onClick={() => navigate('/Elearning')}>
                        Back to Elearning
                    </Button>
                </div>
                <form className="flex flex-col bg-pinkB p-4 mx-[10vh] space-y-4 border rounded-md" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput theme={textInputTheme} key={"QuizInput"} type="text" placeholder="Quiz Title" {...register("title", { required: true })} />
                    {/* use the component file input and only the format image can be upload */}
                    <FileInput theme={fileInputTheme} {...register("image", { required: true })} accept="image/*" />
                    {nbrQuestions.map((j, indexJ) => (
                        <Card>
                            <TextInput theme={textInputTheme} key={indexJ} type="text" placeholder="Question" {...register(`questions[${indexJ}].question`, { required: true })} />
                            <Table theme={tableTheme} striped>
                                <Table.Head>
                                    <Table.HeadCell>Answers</Table.HeadCell>
                                    <Table.HeadCell className=''>Select Correct Answer</Table.HeadCell>
                                    <Table.HeadCell className='text-right'>
                                        Remove
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {nbrAnswers.map((i, index) => (
                                        <Table.Row>
                                            <Table.Cell className=''>
                                                <TextInput theme={textInputTheme} key={i} type="text" placeholder={`Type your answer `} {...register(`questions[${indexJ}].answers[${index}].answer`, { required: true })} />
                                                {errors.answers && <span>This field is required</span>}
                                            </Table.Cell>
                                            <Table.Cell className=''>
                                                <Radio className='bg-pinkT' {...register(`questions[${indexJ}].answers[${index}].correct`)} name={`answer${j}`} value={"true"} onChange={(e: any) => {
                                                    getValues().questions[indexJ].answers.forEach((answer: any) => {
                                                        answer.correct = false;
                                                    });
                                                    getValues().questions[indexJ].answers[index].correct = e.target.checked;
                                                }} />
                                            </Table.Cell>
                                            <Table.Cell className='flex justify-end'>
                                                <Button theme={buttonTheme} color="default" disabled={nbrAnswers.length == 2} onClick={() => deleteAnswer(i, index, indexJ)}>
                                                    Remove Answer
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                    <Button theme={buttonOutlineTheme} color="default" disabled={nbrAnswers.length == 4} onClick={() => addAnswer()}>
                                        Add Answer
                                    </Button>
                                </Table.Body>
                            </Table>
                            <Button theme={buttonTheme} color="default" disabled={nbrQuestions.length == 1} onClick={() => deleteQuestion(indexJ)}>
                                Remove Question
                            </Button>
                        </Card>
                    ))}
                    <Button theme={buttonOutlineTheme} color="default" disabled={nbrQuestions.length == 20} onClick={() => {
                        setNbrQuestions([...nbrQuestions, nbrQuestions[nbrQuestions.length - 1] + 1]);
                        console.log(nbrQuestions);
                    }}>
                        Add Question
                    </Button>
                    <Button theme={buttonTheme} color="default" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default QuizAdd;

