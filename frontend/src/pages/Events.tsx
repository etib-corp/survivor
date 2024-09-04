import { useState } from "react";
import ETIBNavBar from "../components/ETIBNavBar";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";

function Events() {
    const [props, setProps] = useState({ page: "events" });

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flew flew-col p-5">
                <div className="flex flew-row justify-between">
                    <h1 className="text-4xl font-bold py-1 mt-3">
                        Events
                    </h1>
                    <Button className="bg-blue-700 hover:bg-blue-900 text-white font-bold h-10 rounded-md mt-5">
                        <FiPlus className="mr-5" size={20} />Add Event
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Events;
