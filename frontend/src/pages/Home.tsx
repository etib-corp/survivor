import { useState } from "react";

import { Button } from "flowbite-react";

import Profiles from "./Profiles";
import ETIBNavBar from "../components/ETIBNavBar";

function Home () {
    const [props, setProps] = useState({ page: "dashboard" });

    return (
        <div className="bg-background">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            <div className="p-64 shadow-md"></div>
        </div>
    );
}

export default Home;