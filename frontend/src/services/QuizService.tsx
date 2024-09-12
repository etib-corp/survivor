import http from "../http-common";
import Quiz from "../types/Quiz";

const getAll = () => {
    let quizzes = http.get<Array<Quiz>>("/quizzes");
    return quizzes;
};

const get = (id: number) => {
    return http.get<Quiz>(`/quiz/${id}`);
};

const deleteID = (id: number) => {
    return http.delete<Quiz>(`/quizzes/${id}`);
};

const QuizService = {
    getAll,
    get,
    deleteID,
};

export default QuizService;
