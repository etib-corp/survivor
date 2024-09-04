import { useState } from "react";

import { HiArrowDown, HiArrowUp } from "react-icons/hi";

import { Button, ButtonGroup} from "flowbite-react";
import { LineChart } from "@mui/x-charts";

export default function CustomersOverview () {
    const [selected, setSelected] = useState("1M");

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
            <div className="grid grid-cols-1 space-y-8 md:space-y-0 md:flex md:flex-row ml-4 mr-4 justify-between w-[90%] md:w-[55%]">
                <div className="flex flex-col">
                    <p className="mb-2 text-2xl md:text-base">
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
                    <p className="mb-2 text-2xl md:text-base">
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
                    <p className="mb-2 text-2xl md:text-base">
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
