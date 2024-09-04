import { HiArrowDown, HiArrowUp, HiOutlineQuestionMarkCircle } from "react-icons/hi";

import { Tooltip } from "flowbite-react";
import { BarChart } from "@mui/x-charts";

export default function Events () {
    return (
        <div className="flex flex-col bg-white border w-[45%] rounded-md">
            <div className="flex flex-row justify-between mx-4 mb-6">
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
