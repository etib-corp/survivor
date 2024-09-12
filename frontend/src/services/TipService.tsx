import http from "../http-common";
import Tip from "../types/Tip";

const getAll = () => {
    return http.get<Array<Tip>>("/tips");
};

const get = (id: number) => {
    return http.get<Tip>(`/tips/${id}`);
};

const deleteID = (id: number) => {
    return http.delete<Tip>(`/tips/${id}`);
}

const create = (data: Tip) => {
    return http.post<Tip>("/tips/new", data);
}

const update = (id: number, data: Tip) => {
    return http.patch<Tip>(`/tips/edit/${id}`, data);
}

const TipService = {
    getAll,
    get,
    deleteID,
    create,
    update,
};

export default TipService;