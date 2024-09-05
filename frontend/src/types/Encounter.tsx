export default interface Encounter {
    id?: number | null,
    customer: string,
    date: string,
    rating: number,
    comment: string,
    source: string
}