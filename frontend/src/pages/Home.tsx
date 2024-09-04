import { useState } from "react";

import { Button } from "flowbite-react";

import Profiles from "./Profiles";
import ETIBNavBar from "../components/ETIBNavBar";
import Statistics from "./Statistics";

function Home () {
    const [props, setProps] = useState({ page: "dashboard" });

    return (
        <div className="bg-background">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            <Statistics></Statistics>
            <div className="p-64 shadow-md"></div>
        </div>
    );
}

export default Home;