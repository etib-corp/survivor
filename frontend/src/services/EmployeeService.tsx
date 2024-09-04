import http from "../http-common";
import Employee from "../types/Employee";

const getAll = () => {
    return http.get<Array<Employee>>("/employees");
};

const get = (id: number) => {
    return http.get<Employee>(`/employees/${id}`);
};

const EmployeeService = {
    getAll,
    get,
};

export default EmployeeService;