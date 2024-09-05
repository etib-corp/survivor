export default interface Employee {
    id?: number | null,
    email: string,
    name: string,
    surname: string,
    birth_date: string,
    gender: string,
    work: string,
    events: Array<string>
}
