import React from 'react'
import { useState, useEffect } from 'react';
import ETIBNavBar from '../../components/ETIBNavBar';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Card, Radio, TextInput } from 'flowbite-react';
import axios from 'axios';
import { Table, FileInput } from "flowbite-react";

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

    const onSubmit: SubmitHandler<any> = (data) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let base64data: any = reader.result;
            base64data = base64data?.toString().split(',')[1];
            data.image = base64data;
            axios.post(`${process.env.REACT_APP_API_URL}/questions/new`, data);
            reset();
            navigate('/Quiz');
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
            <div className="flex flex-col">
                <div className="flex items-center justify-between p-5">
                    <h1 className="text-4xl font-bold">
                        Add Quiz
                    </h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => navigate('/Quiz')}>
                        Back to Quiz
                    </button>
                </div>
                <form className="flex flex-col p-5 mx-[10vh] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput key={"QuizInput"} type="text" placeholder="Quiz Title" {...register("title", { required: true })} />
                    <FileInput {...register("image", { required: true })} accept="image/*" />
                    {Array.from({ length: nbrQuestions }).map((j: any, indexJ: number) => (
                        <Card key={genereKey()}>
                            <TextInput type="text" placeholder="Question" {...register(`questions[${indexJ}].question`, { required: true })} />
                            <Table striped>
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
                                                <TextInput type="text" placeholder={`Type your answer `} {...register(`questions[${indexJ}].answers[${index}].answer`, { required: true })} />
                                                {errors.answers && <span>This field is required</span>}
                                            </Table.Cell>
                                            <Table.Cell className=''>
                                                <Radio className='bg-red-900' {...register(`questions[${indexJ}].answers[${index}].correct`)} name={`answer${indexJ}`} defaultChecked={i.correct} onChange={(e: any) => {
                                                    getValues().questions[indexJ].answers.forEach((answer: any) => {
                                                        answer.correct = false;
                                                    });
                                                    getValues().questions[indexJ].answers[index].correct = e.target.checked;
                                                }} />
                                            </Table.Cell>
                                            <Table.Cell className='flex justify-end'>
                                                <Button disabled={dataQuestion.questions[indexJ].answers.length === 2} onClick={() => deleteAnswer(index, indexJ)}>Remove Answer</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                    <Button disabled={dataQuestion.questions[indexJ].answers.length === 4} onClick={() => addAnswer(indexJ)}>Add Answer</Button>
                                </Table.Body>
                            </Table>
                            <Button disabled={nbrQuestions === 1} onClick={() => deleteQuestion(indexJ)}> Remove Question</Button>
                        </Card>
                    ))}
                    <Button disabled={nbrQuestions == 20} onClick={() => {
                        setNbrQuestions(nbrQuestions + 1);
                        dataQuestion.questions.push({ answers: [{ correct: false }, { correct: false }] });
                        console.log(dataQuestion);
                    }}>Add Question</Button>
                    <Button className="float-end" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default QuizAdd;
