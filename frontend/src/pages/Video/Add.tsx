import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, TextInput } from "flowbite-react";

import ETIBNavBar from "../../components/ETIBNavBar";

import { buttonOutlineTheme, buttonTheme, textInputTheme } from "../../themes";

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
            <div className="flex flex-col space-y-8 pb-40">
                <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
                    <h1 className="text-4xl font-bold">
                        Add Video
                    </h1>
                    <Button theme={buttonTheme} color="default" onClick={() => navigate('/Elearning')}>
                        Back to Elearning
                    </Button>
                </div>
                <form className="flex flex-col p-5 mx-[10vh] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput theme={textInputTheme} key={"VideoTitle"} type="text" placeholder="Title..." {...register("title", { required: true })} />
                    <TextInput theme={textInputTheme} key={"VideoDescription"} type="text" placeholder="Description..." {...register("description", { required: true })} />
                    <TextInput theme={textInputTheme} key={"VideoURL"} type="text" placeholder="https://youtube.com/" {...register("url", { required: true })} />
                    <Button theme={buttonOutlineTheme} color="default" type="submit" className='hover:text-white enabled:hover:bg-pinkT'>
                        Submit
                    </Button>
                </form>
            </div>

        </div>
    )
}

export default VideoAdd;
