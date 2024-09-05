import { useState } from "react";

import { Button } from "flowbite-react";

import Profiles from "./Profiles";
import ETIBNavBar from "../components/ETIBNavBar";
import Statistics from "./Statistics";
import CustomerDetails from "../components/Customers/CustomerDetails";
import { meetings } from "../data";

const customerDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "1234 Main St, City, State, Country",
    encounters: 23,
    positives: 20,
    inprogress: 3,
    id: "1234567890",
    lastActivity: "2021-10-01",
    coach: "Jane Doe",
    meetings: [
        {
            date: "2021-10-01",
            rating: 4,
            report: "Good",
            source: "Dating App"
        },
        {
            date: "2021-10-02",
            rating: 3,
            report: "Average",
            source: "Dating App"
        },
        {
            date: "2021-10-03",
            rating: 5,
            report: "Excellent",
            source: "Friends"
        },
        {
            date: "2021-10-04",
            rating: 4,
            report: "Good",
            source: "Social Network"
        },
        {
            date: "2021-10-05",
            rating: 3,
            report: "Average",
            source: "Dating App"
        },
        {
            date: "2021-10-06",
            rating: 5,
            report: "Excellent",
            source: "Dating App"
        },
        {
            date: "2021-10-07",
            rating: 4,
            report: "Good",
            source: "Dating App"
        },
    ],
    payments: [
        {
            date: "2021-10-01",
            method: "Visa",
            amount: 100.00,
            comment: "Monthly subscription"
        },
        {
            date: "2021-10-02",
            method: "MasterCard",
            amount: 100.10,
            comment: "Monthly subscription"
        },
        {
            date: "2021-10-03",
            method: "Paypal",
            amount: 100.00,
            comment: "Monthly subscription"
        },
        {
            date: "2021-10-04",
            method: "Visa",
            amount: 100.00,
            comment: "Monthly subscription"
        },
        {
            date: "2021-10-05",
            method: "MasterCard",
            amount: 100.00,
            comment: "Monthly subscription"
        },
        {
            date: "2021-10-06",
            method: "Paypal",
            amount: 100.00,
            comment: "Monthly subscription"
        },
        {
            date: "2021-10-07",
            method: "Visa",
            amount: 100.10,
            comment: "Monthly subscription"
        }
    ]
};

function Home () {
    const [props, setProps] = useState({ page: "dashboard" });

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            {/* <CustomerDetails properties={customerDetails}/> */}
            {/* <div className="p-64 shadow-md"></div> */}
        </div>
    );
}

export default Home;