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
    const [props, setProps] = useState({ page: "quiz" });
    const [nbrQuestions, setNbrQuestions] = useState(1);
    const [dataQuestion, setDataQuestion] = useState<any>({ questions: [{ answers: [{ correct: false }, { correct: false }] }] })
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        setValue,
        formState: { errors },
    } = useForm<any>({ defaultValues: { questions: [{ answers: [{ correct: false }, { correct: false }] }] } })

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

    function deleteAnswer(index: number, indexQ: number) {
        const data = getValues();
        data.questions[indexQ].answers.splice(index, 1);
        setDataQuestion(data);
        console.log(data);
    }

    function addAnswer(index: number) {
        let data = getValues();
        console.log(data);
        data.questions[index].answers.push({ correct: false });
        setDataQuestion(data);
    }

    function deleteQuestion(index: number) {
        if (nbrQuestions === 1) return;
        const data = getValues();
        data.questions.splice(index, 1);
        setNbrQuestions(nbrQuestions - 1);
        setDataQuestion(data)
    }

    function genereKey() {
        return Math.random() * 1000;
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
                    <FileInput {...register("image", { required: true })} accept="image/*" />
                    {Array.from({ length: nbrQuestions }).map((j: any, indexJ: number) => (
                        <Card key={genereKey()}>
                            <TextInput theme={textInputTheme} type="text" placeholder="Question" {...register(`questions[${indexJ}].question`, { required: true })} />
                            <Table theme={tableTheme} striped>
                                <Table.Head>
                                    <Table.HeadCell>Answers</Table.HeadCell>
                                    <Table.HeadCell className=''>Select Correct Answer</Table.HeadCell>
                                    <Table.HeadCell className='text-right'>
                                        Remove
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {dataQuestion.questions[indexJ].answers?.map((i: any, index: number) => (
                                        console.log(i),
                                        <Table.Row key={genereKey()}>
                                            <Table.Cell className=''>
                                                <TextInput theme={textInputTheme} key={i} type="text" placeholder={`Type your answer `} {...register(`questions[${indexJ}].answers[${index}].answer`, { required: true })} />
                                                {errors.answers && <span>This field is required</span>}
                                            </Table.Cell>
                                            <Table.Cell className=''>
                                                <Radio className='bg-pinkT' {...register(`questions[${indexJ}].answers[${index}].correct`)} name={`answer${indexJ}`} value={"true"} onChange={(e: any) => {
                                                    getValues().questions[indexJ].answers.forEach((answer: any) => {
                                                        answer.correct = false;
                                                    });
                                                    getValues().questions[indexJ].answers[index].correct = e.target.checked;
                                                }} />
                                            </Table.Cell>
                                            <Table.Cell className='flex justify-end'>
                                                <Button theme={buttonTheme} color="default" disabled={dataQuestion.questions[indexJ].answers.length === 2} onClick={() => deleteAnswer(index, indexJ)}>Remove Answer</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                    <Button theme={buttonOutlineTheme} color="default" disabled={dataQuestion.questions[indexJ].answers.length === 4} onClick={() => addAnswer(indexJ)}>Add Answer</Button>
                                </Table.Body>
                            </Table>
                            <Button theme={buttonTheme} color="default" disabled={nbrQuestions === 1} onClick={() => deleteQuestion(indexJ)}> Remove Question</Button>
                        </Card>
                    ))}
                    <Button theme={buttonOutlineTheme} color="default" disabled={nbrQuestions == 20} onClick={() => {
                        setNbrQuestions(nbrQuestions + 1);
                        dataQuestion.questions.push({ answers: [{ correct: false }, { correct: false }] });
                        console.log(dataQuestion);
                    }}>
                        Add Question
                    </Button>
                    <Button theme={buttonTheme} color="default" className="float-end" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default QuizAdd;
