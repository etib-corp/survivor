import Answer from "./Answer";

export default interface Question {
    id?: number | null,
    question: string,
    answers: Answer[]
}