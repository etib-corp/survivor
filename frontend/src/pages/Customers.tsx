import ETIBCustomers from "../components/ETIBCustomers";
import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";

function Customers () {

    const [props, setProps] = useState({ page: "customers" });

    fetch('http://localhost:3000/api/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error))

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            <ETIBCustomers />
        </div>
    )
}

export default Customers;