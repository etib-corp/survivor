import http from "../http-common";

import Event from "../types/Event";

const getAll = () => {
    return http.get<Array<Event>>("/events");
};

const get = (id: number) => {
    return http.get<Event>(`/events/${id}`);
};

const EventService = {
    getAll,
    get,
};

export default EventService;
