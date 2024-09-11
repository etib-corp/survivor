import http from "../http-common";
import Video from "../types/Video";

const getAll = () => {
    return http.get("/videos");
};

const get = (id: number) => {
    return http.get(`/videos/${id}`);
}

const deleteID = (id: number) => {
    return http.delete(`/videos/${id}`);
}

const VideoService = {
    getAll,
    get,
    deleteID
};

export default VideoService;