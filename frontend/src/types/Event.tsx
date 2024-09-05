export default interface Event {
    id?: number | null,
    name: string,
    date: string,
    max_participants: number,
    location_x: string,
    location_y: string,
    type: string,
    employee: string,
    location_name: string,
}
