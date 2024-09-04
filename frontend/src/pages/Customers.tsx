import ETIBCustomers from "../components/ETIBCustomers";
import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";

const customers = [
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "1234567890",
        paymentMethods: "Visa",
        avatar: "kbo.png",
        meetings: [],
        payments: [],
    },
    {
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        phone: "1234567890",
        paymentMethods: "MasterCard",
        avatar: "kbo.png",
        meetings: [],
        payments: [],
    },
]

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
            <ETIBCustomers customers={customers}/>
        </div>
    )
}

export default Customers;