import ETIBCoaches from "../components/ETIBCoaches";
import ETIBNavBar from "../components/ETIBNavBar";
import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";

function Account () {
    const [employees, setEmployees] = useState([]);
    const [props, setProps] = useState({ page: "coaches" });

    useEffect(() => {
        let data: any = [];

        console.log("Fetching data from API ",process.env.REACT_APP_API_URL);
        EmployeeService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                data = response.data['hydra:member'];
            } else {
                console.log("Expected an array of tips but got:", response.data);
            }
            data = data.filter((employee: any) => employee.work.includes("Coach"));
            setEmployees(data);
        }).catch((e) => {
            console.log(e);
        });

    }, []);
    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            <ETIBCoaches coaches={employees}/>
        </div>
    )
}

export default Account;