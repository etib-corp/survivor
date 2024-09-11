import React from "react";
import { useState, useEffect } from "react";
import ETIBNavBar from "../../components/ETIBNavBar";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextInput } from "flowbite-react";
import axios from "axios";

function VideoAdd() {
    const [props, setProps] = useState({ page: "elearning" });
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: { errors },
    } = useForm<any>();

    const transformYouTubeUrl = (url: string): string => {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const onSubmit: SubmitHandler<any> = (data) => {
        data.url = transformYouTubeUrl(data.url);
        axios.post(`${process.env.REACT_APP_API_URL}/videos`, data);
        reset();
        navigate('/Elearning');
    }

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flex flex-col">
                <div className="flex items-center justify-between p-5">
                    <h1 className="text-4xl font-bold">Add Quiz</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => navigate('/Elearning')}>
                        Back to Elearning
                    </button>
                </div>
                <form className="flex flex-col p-5 mx-[10vh] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput key={"VideoTitle"} type="text" placeholder="Title..." {...register("title", { required: true })} />
                    <TextInput key={"VideoDescription"} type="text" placeholder="Description..." {...register("description", { required: true })} />
                    <TextInput key={"VideoURL"} type="text" placeholder="https://youtube.com/" {...register("url", { required: true })} />
                    <Button className="float-end" type="submit">Submit</Button>
                </form>
            </div>

        </div>
    )
}

export default VideoAdd;
