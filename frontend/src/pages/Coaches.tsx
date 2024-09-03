import ETIBCoaches from "../components/ETIBCoaches";
import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";

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
            <ETIBCoaches />
        </div>
    )
}

export default Account;