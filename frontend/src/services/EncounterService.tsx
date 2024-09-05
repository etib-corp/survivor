import http from "../http-common";

import Encounter from "../types/Encounter";

const getAll = () => {
    return http.get<Array<Encounter>>("/encounters");
};

const get = (id: number) => {
    return http.get<Encounter>(`/encounters/${id}`);
};

const EncounterService = {
    getAll,
    get,
};

export default EncounterService;