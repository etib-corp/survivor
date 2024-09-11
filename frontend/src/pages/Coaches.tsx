import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ETIBCoaches from "../components/ETIBCoaches";
import ETIBNavBar from "../components/ETIBNavBar";

import EmployeeService from "../services/EmployeeService";

function Account() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [props, setProps] = useState({ page: "coaches" });

    useEffect(() => {
        let data: any = [];
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
    }, [employees]);

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const parsedUserInfo = JSON.parse(userInfo);

            if (parsedUserInfo.roles[0] === "ROLE_CUSTOMER") {
                navigate("/Wardrobe");
            } if (parsedUserInfo.roles[0] === "ROLE_COACH") {
                navigate("/Customers");
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }
    }, []);


    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <ETIBCoaches coaches={employees} />
        </div>
    )
}

export default Account;