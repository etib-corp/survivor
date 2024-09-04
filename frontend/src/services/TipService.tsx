import http from "../http-common";
import Tip from "../types/Tip";

const getAll = () => {
    return http.get<Array<Tip>>("/tips");
};

const get = (id: number) => {
    return http.get<Tip>(`/tips/${id}`);
};

const TipService = {
    getAll,
    get,
};

export default TipService;