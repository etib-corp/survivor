import http from "../http-common";
import Payment from "../types/Payment";

const getAll = () => {
    let payments = http.get<Array<Payment>>("/payments");
    return payments;
};

const get = (id: number) => {
    return http.get<Payment>(`/payments/${id}`);
};

const PaymentService = {
    getAll,
    get,
};

export default PaymentService;