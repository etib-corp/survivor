import { HiArrowDown, HiArrowUp, HiChevronRight, HiOutlineQuestionMarkCircle, HiQuestionMarkCircle } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Button, ButtonGroup, Tooltip } from "flowbite-react";

import { useState } from "react";
import { LineChart, BarChart } from "@mui/x-charts";

function CustomersOverview () {
    const [selected, setSelected] = useState("1M");
    return (
        <div className="flex flex-col bg-white border mr-8 w-[55%] rounded-md">
            <div className="flex flex-row justify-between ml-4 mr-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Customers Overview
                    </h1>
                    <p>
                        When customers have joined the team
                    </p>
                </div>
                <div className="mt-auto mb-auto">
                    <ButtonGroup outline>
                        <Button className="bg-transparent text-gray-700 border-gray-700" disabled={selected === "7D"} onClick={() => setSelected("7D")}>
                            7D
                        </Button>
                        <Button className="bg-transparent text-gray-700 border-gray-700 disabled:text-black" disabled={selected === "1M"} onClick={() => setSelected("1M")}>
                            1M
                        </Button>
                        <Button className="bg-transparent text-gray-700 border-gray-700" disabled={selected === "3M"} onClick={() => setSelected("3M")}>
                            3M
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="flex flex-row ml-4 mr-4 justify-between w-[55%]">
                <div className="flex flex-col">
                    <p className="mb-2">
                        Customers
                    </p>
                    <p className="text-3xl mb-1">
                        932
                    </p>
                    <p className="flex text-green-300">
                        <HiArrowUp className="mt-auto mb-auto"/>
                        12.37%
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-2">
                        Doing meetings
                    </p>
                    <p className="text-3xl mb-1">
                        28.49%
                    </p>
                    <p className="flex text-red-500">
                        <HiArrowDown className="mt-auto mb-auto"/>
                        12.37%
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-2">
                        Customers by coach
                    </p>
                    <p className="text-3xl mb-1">
                        34
                    </p>
                </div>
            </div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                { data: [0, 5, 2, 6, 3, 9.3], showMark: false, curve: "linear", area: true },
                { data: [0, 3, 1, 3, 2, 7.3], showMark: false, curve: "linear" },
                ]}
                height={300}
            />
        </div>
    )
}

function Events () {
    return (
        <div className="flex flex-col bg-white border w-[45%] rounded-md">
            <div className="flex flex-row justify-between ml-4 mr-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Events
                    </h1>
                    <p>
                        Our events and their status.
                    </p>
                </div>
                <div className="mt-auto mb-auto mr-4">
                    <Tooltip content="Help here">
                        <HiOutlineQuestionMarkCircle className="text-2xl text-gray-400"/>
                    </Tooltip>
                </div>
            </div>
            <div className="flex flex-row ml-4 mr-4 justify-between w-[70%]">
                <div className="flex flex-col">
                    <p className="mb-2">
                        Monthly
                    </p>
                    <p className="text-3xl mb-1">
                        83
                    </p>
                    <p className="flex text-green-300">
                        <HiArrowUp className="mt-auto mb-auto"/>
                        4.63%
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-2">
                        Weekly
                    </p>
                    <p className="text-3xl mb-1">
                        20
                    </p>
                    <p className="flex text-red-500">
                        <HiArrowDown className="mt-auto mb-auto"/>
                        1.92%
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-2">
                        Daily (Avg)
                    </p>
                    <p className="text-3xl mb-1">
                        3
                    </p>
                    <p className="flex text-green-300">
                        <HiArrowUp className="mt-auto mb-auto"/>
                        3.45%
                    </p>
                </div>
            </div>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D', 'group E'] }]}
                series={[{ data: [2, 5, 6, 7, 5] }]}
                height={300}
            />
        </div>
    )
}


export default function Statistics () {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between mt-8 px-4 mb-8">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold py-3">
                        Dashboard
                    </h1>
                    <p>
                        Welcome!
                    </p>
                </div>
                <div className="mt-auto mb-auto">
                    <div className="flex flex-row space-x-4">
                        <Button className="bg-transparent text-gray-700 border-gray-700">
                            <FaRegCalendarAlt className="mr-2 h-5 w-5"/>
                            Last 30 days
                            <HiChevronRight className="ml-2 h-5 w-5"/>
                        </Button>
                        <Button className="bg-blueT">
                            <MdOutlineAnalytics className="mr-2 h-5 w-5"/>
                            Reports
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between ml-4 mr-4">
                <CustomersOverview />
                <Events />
            </div>
        </div>
    );
}