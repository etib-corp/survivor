import http from "../http-common";
import Quiz from "../types/Quiz";

const getAll = () => {
    return http.get<Quiz[]>('/quizzes');
}

const get = (id: number) => {
    return http.get<Quiz>(`/quiz/${id}`);
}

const QuizService = {
    getAll,
    get,
};

export default QuizService;