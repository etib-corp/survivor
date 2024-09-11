import http from "../http-common";
import Question from "../types/Question";

const get = (id: number) => {
    return http.get<Question>(`/questions/${id}`);
}

const QuestionService = {
    get,
};

export default QuestionService;