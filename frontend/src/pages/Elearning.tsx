import { useEffect, useState } from "react";
import ETIBCard from "../components/ETIBCard";
import ETIBNavBar from "../components/ETIBNavBar";
import QuizService from "../services/QuizService";
import VideoService from "../services/VideoService";
import Quiz from "../types/Quiz";
import Video from "../types/Video";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";

function Elearning() {
    const [props, setProps] = useState({ page: "elearning" });
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [privileges, setPrivileges] = useState<Boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        QuizService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setQuizzes(response.data['hydra:member']);
            } else {
                console.log("Expected an array of quizzes but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
        const userInfo: any = localStorage.getItem("userData") || "";
        try {
            const parsedUserInfo = JSON.parse(userInfo);
            console.log(["ROLE_ADMIN", "ROLE_COACH", "ROLE_CUSTOMER"].includes(parsedUserInfo.roles[0]));
            if (!["ROLE_ADMIN", "ROLE_COACH", "ROLE_CUSTOMER"].includes(parsedUserInfo.roles[0])) {
                navigate("/Wardrobe");
            }
            if (["ROLE_ADMIN", "ROLE_COACH"].includes(parsedUserInfo.roles[0])) {
                setPrivileges(true);
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }
    }, []);

    useEffect(() => {
        VideoService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setVideos(response.data['hydra:member']);
            } else {
                console.log("Expected an array of videos but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    function deleteID(id: number, service: any) {
        service.deleteID(id).then(() => {
            window.location.reload();
        });
    }


    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flex">
                <h1 className="text-4xl font-bold mt-8 ml-4">
                    E-Learning Page
                </h1>
            </div>
            <div className="flex flex-col gap-10 m-10">
                <div className="">
                    <h1 className="text-3xl">Videos</h1>
                    {privileges &&
                        <Button className="float-end" onClick={() => {
                            navigate('/Video/Add');
                        }
                        }>Add a video</Button>
                    }
                </div>
                <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-4 md:mt-0 gap-10 h-[35rem]">
                    {
                        videos.map((video) => (
                            <ETIBCard key={video.id} title={video.title} subtitle={video.description} path={video.url} buttonTitle="Watch video" content={
                                <>
                                <div className="flex w-full justify-end mb-1">
                                    {
                                        privileges &&
                                        <Button className="" onClick={() => {deleteID(video.id, VideoService)}}>
                                            <FaRegTrashAlt />
                                        </Button>
                                    }
                                </div>
                                <iframe width={"100%"} height={"100%"} src={video.url} className="border-4 border-gray-300 rounded-md" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </>
                            } />
                        ))
                    }
                </div>
                <div className="">
                    <h1 className="text-3xl">Quizzes</h1>
                    {privileges &&
                        <Button className="float-end" onClick={() => {
                            navigate('/Quiz/Add');
                        }
                        }>Create a quiz</Button>
                    }
                </div>
                <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-4 md:mt-0 gap-10">
                    {
                        quizzes.map((quiz) => (
                            <ETIBCard key={quiz.id} title={quiz.title} path={"/Quiz?q=" + quiz.id} subtitle="Try this quiz to show your skills." buttonTitle="Cilck to test" content={
                                <>
                                <div className="flex w-full justify-end mb-1">
                                    {
                                        privileges &&
                                        <Button className="" onClick={() => {deleteID(quiz.id as number, QuizService)}}>
                                            <FaRegTrashAlt />
                                        </Button>
                                    }
                                </div>
                                <img src={process.env.REACT_APP_PICTURES_URL +"/" + quiz.image} alt={quiz.title} className="w-full rounded-lg" />
                                </>
                            } />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default Elearning;
