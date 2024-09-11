import Question from "./Question"

export default interface Quiz {
    id?: number | null,
    title: string,
    image: string,
    questions: Question[]
}
