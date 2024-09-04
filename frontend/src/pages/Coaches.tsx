import ETIBCoaches from "../components/ETIBCoaches";
import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";

const coaches = [
    {
        name: "John Doer",
        email: "johndoe@gmail.com",
        phone: "1234567890",
        number_of_customers: "12",
        avatar: "kbo.png",
        meetings: [],
    },
    {
        name: "Jane Doet",
        email: "janedoe@gmail.com",
        phone: "1234567890",
        number_of_customers: "6",
        avatar: "kbo.png",
        meetings: [],
    },
]

function Account () {

    const [props, setProps] = useState({ page: "coaches" });

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
            <ETIBCoaches coaches={coaches}/>
        </div>
    )
}

export default Account;