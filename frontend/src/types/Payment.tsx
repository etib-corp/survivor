export default interface Payment {
    id?: number | null,
    date: string,
    method: string,
    description: string,
    customer: string,
    amount: number,
}