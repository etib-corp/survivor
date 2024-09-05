import http from "../http-common";
import Clothe from "../types/Clothe";

const getAll = () => {
    let clothes = http.get<Array<Clothe>>("/clothes");
    return clothes;
};

const get = (id: number) => {
    return http.get<Clothe>(`/clothes/${id}`);
};

const ClotheService = {
    getAll,
    get,
};

export default ClotheService;
