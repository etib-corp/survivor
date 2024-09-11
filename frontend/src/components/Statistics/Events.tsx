import { useEffect, useState } from "react";

import { ButtonGroup, Button } from "flowbite-react";

import { BarChart } from "@mui/x-charts";

import EventService from "../../services/EventService";

import Event from "../../types/Event";

function getDay(day: number) {
    let date = new Date();

    date.setDate(date.getDate() - day);
    const splitted = date.toString().split(' ');
    return splitted.slice(0, 3).join(' ');
}

function getCalendar(days: number) {
    let calendar = [];

    for (let i = 0; i < days; i++) {
        calendar.push(getDay(i));
    }
    return calendar.reverse();
}

function handleMonthly(data: Event[]) {
    let date = new Date();
    let count = 0;

    data.map((event: Event) => {
        let dateTmp = new Date(event.date);
        if (dateTmp > date) {
            count += 1;
        } else {
            date.setMonth(date.getMonth() - 1);
        }
    });
    return Math.round(count / 12);

}

function handleWeekly(data: Event[]) {
    let date = new Date();
    let count = 0;
    let test = 0;

    data.map((event: Event) => {
        let dateTmp = new Date(event.date);
        if (dateTmp > date) {
            count += 1;
        } else {
            test += 1;
            date.setDate(date.getDate() - 7);
        }
    });
    return Math.round(count / 52);
}

function handleDaily(data: Event[]) {
    let date = new Date();
    let count = 0;

    data.map((event: Event) => {
        let dateTmp = new Date(event.date);
        if (dateTmp > date) {
            count += 1;
        } else {
            date.setDate(date.getDate() - 1);
        }
    });
    return (count / 365).toFixed(2);
}

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selected, setSelected] = useState(30);
    const [nbrEventsMonthly, setNbrEventsMonthly] = useState(0);
    const [nbrEventsWeekly, setNbrEventsWeekly] = useState(0);
    const [nbrEventsDaily, setNbrEventsDaily] = useState("0");
    const [EventWeek, setEventWeek] = useState<any>([]);

    useEffect(() => {
        EventService.getAll().then((response : any) => {
            let data = [];
            let yAxis = new Array(selected).fill(0);

            if (Array.isArray(response.data['hydra:member'])) {
                data = response.data['hydra:member'];

                data.map((event: Event) => {
                    let date = new Date(event.date);
                    let diffTime = Math.abs(new Date().getTime() - date.getTime());
                    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays < selected) {
                        yAxis[diffDays] += 1;
                    }
                });
                setEventWeek(yAxis.reverse());
                setNbrEventsWeekly(handleWeekly(data));
                setNbrEventsMonthly(handleMonthly(data));
                setNbrEventsDaily(handleDaily(data));
                setEvents(data);
            }
        });
    }, [selected]);

    return (
        <div className="flex flex-col border mx-[5%] md:mx-4 w-[90%] md:w-[45%] rounded-md bg-pinkB">
            <div className="flex flex-row justify-between mx-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Events
                    </h1>
                    <p>
                        Our events and their status.
                    </p>
                </div>
                <div className="mt-4 md:mt-auto mb-auto flex justify-center md:justify-normal">
                    <ButtonGroup outline>
                        <Button className="bg-transparent text-gray-700 border-gray-700" disabled={selected === 7} onClick={() => setSelected(7)}>
                            7D
                        </Button>
                        <Button className="bg-transparent text-gray-700 border-gray-700 disabled:text-black" disabled={selected === 30} onClick={() => setSelected(30)}>
                            1M
                        </Button>
                        <Button className="bg-transparent text-gray-700 border-gray-700" disabled={selected === 90} onClick={() => setSelected(90)}>
                            3M
                        </Button>
                        <Button className="bg-transparent text-gray-700 border-gray-700" disabled={selected === 365} onClick={() => setSelected(365)}>
                            1Y
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 space-y-8 md:space-y-0 md:flex md:flex-row ml-4 mr-4 justify-between w-[70%]">
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
                        Monthly
                    </p>
                    <p className="text-3xl mb-1">
                        {nbrEventsMonthly}
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
                        Weekly
                    </p>
                    <p className="text-3xl mb-1">
                        {nbrEventsWeekly}
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
                        Daily (Avg)
                    </p>
                    <p className="text-3xl mb-1">
                        {nbrEventsDaily}
                    </p>
                </div>
            </div>
            <BarChart
                xAxis={[{ scaleType: 'band', data: getCalendar(selected) }]}
                series={[{ data: EventWeek, color: "#feaab0"}]}
                height={300}
            />
        </div>
    )
}
