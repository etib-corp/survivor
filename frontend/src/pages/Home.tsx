import { useState } from "react";

import { Button } from "flowbite-react";

import Profiles from "./Profiles";
import ETIBNavBar from "../components/ETIBNavBar";
import Statistics from "./Statistics";
import CustomerDetails from "../components/Customers/CustomerDetails";
import { meetings } from "../data";

function Home () {
    const [props, setProps] = useState({ page: "dashboard" });

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            {/* <CustomerDetails properties={customerDetails}/>
            <div className="p-64 shadow-md"></div> */}
        </div>
    );
}

export default Home;