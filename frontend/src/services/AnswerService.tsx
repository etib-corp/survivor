import http from "../http-common";
import Answer from "../types/Answer";

const get = (id: number) => {
    return http.get<Answer>(`/answers/${id}`);
}

const AnswerService = {
    get,
};

export default AnswerService;