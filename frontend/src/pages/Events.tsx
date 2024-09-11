import { useState, useEffect } from "react";
import ETIBNavBar from "../components/ETIBNavBar";
import { Button } from "flowbite-react";

import { FiPlus } from "react-icons/fi";
import ETIBCalendar from "../components/ETIBCalendar";
import EventService from "../services/EventService";
import { useNavigate } from "react-router-dom";
import { buttonTheme } from "../themes";

function Events() {
    const navigate = useNavigate();
    const [props, setProps] = useState({ page: "events" });
    const [events, setEvents] = useState<any>([]);

    useEffect(() => {
        EventService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setEvents(response.data['hydra:member']);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const parsedUserInfo = JSON.parse(userInfo);
            if (parsedUserInfo.roles[0] === "ROLE_CUSTOMER") {
                navigate("/Wardrobe");
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }
    }, []);

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flew flew-col p-5">
                <div className="flex flew-row justify-between">
                    <h1 className="text-4xl font-bold py-1 mt-3">
                        Events
                    </h1>
                    <Button theme={buttonTheme} color="default" className="mt-auto">
                        <FiPlus className="mr-5" size={20} />Add Event
                    </Button>
                </div>
            </div>
            <ETIBCalendar events={events} />
        </div>
    )
}

export default Events;
