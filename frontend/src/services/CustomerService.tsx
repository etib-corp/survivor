import http from "../http-common";
import Customer from "../types/Customer";

const getAll = () => {
    let customers = http.get<Array<Customer>>("/customers");
    return customers;
};

const get = (id: number) => {
    return http.get<Customer>(`/customers/${id}`);
};

const CustomerService = {
    getAll,
    get,
};

export default CustomerService;