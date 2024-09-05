import { useEffect, useState } from "react";

import { HiArrowDown, HiArrowUp } from "react-icons/hi";

import { Button, ButtonGroup } from "flowbite-react";
import { LineChart } from "@mui/x-charts";
import EncounterService from "../../services/EncounterService";

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

const CustomersOverview: React.FC<{ customers: any }> = ({ customers }) => {
    const [selected, setSelected] = useState(30);
    const [doingMeetings, setDoingMeetings] = useState(0);
    const [average, setAverage] = useState(0);
    const [meetings, setMeetings] = useState<any>([]);
    const [calendar, setCalendar] = useState(getCalendar(selected));
    const today = new Date();

    useEffect(() => {
        setMeetings([]);
        setCalendar([]);
        EncounterService.getAll().then((response: any) => {
            const encounters = response.data["hydra:member"];
            let count = 0;
            let encountersNumbers = new Array(selected);
            let minDate = new Date();

            encountersNumbers.fill(0);

            minDate.setDate(today.getDate() - selected);

            encounters.map((encounter: any) => {
                let tmpDate = new Date(encounter.date);
                count += tmpDate > minDate ? 1 : 0;
                if (tmpDate > minDate) {
                    const diffTime = Math.abs(minDate.getTime() - tmpDate.getTime());
                    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                    encountersNumbers[diffDays] += 1;
                }
            })
            setDoingMeetings(count);
            setCalendar(getCalendar(selected));
            setMeetings(encountersNumbers);
            if (customers.length > 0)
                setAverage(count / customers.length);
            else
                setAverage(0);
        })
    }, [selected]);
    return (
        <div className="flex flex-col bg-white border mx-[5%] md:mx-4 w-[90%] md:w-[55%] rounded-md">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between mx-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Customers Overview
                    </h1>
                    <p>
                        When customers have joined in the time.
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
            <div className="grid grid-cols-1 space-y-8 md:space-y-0 md:flex md:flex-row ml-4 mr-4 justify-between w-[90%] md:w-[55%]">
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
                        Customers
                    </p>
                    <p className="text-3xl mb-1">
                        {customers.length}
                    </p>
                    {/* <p className="flex text-green-300">
                        <HiArrowUp className="mt-auto mb-auto" />
                        0%
                    </p> */}
                </div>
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
                        Doing meetings
                    </p>
                    <p className="text-3xl mb-1">
                        {doingMeetings}
                    </p>
                    {/* <p className="flex text-red-500">
                        <HiArrowDown className="mt-auto mb-auto" />
                        12.37%
                    </p> */}
                </div>
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
                        Meetings/Customers (Avg)
                    </p>
                    <p className="text-3xl mb-1">
                        {average}
                    </p>
                </div>
            </div>
            <LineChart
                xAxis={[{ data: calendar, scaleType: "band" }]}
                series={[
                    { data: meetings, showMark: false, curve: "linear", area: true, label: "Meetings per day" },
                ]}
                margin={{ top: 100, bottom: 100, left: 100, right:100 }}
                height={300}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                    }
                }}
            />
        </div>
    )
}

export default CustomersOverview;
