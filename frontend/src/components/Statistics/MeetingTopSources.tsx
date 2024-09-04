import { HiChevronDown } from "react-icons/hi";

import { Button, Dropdown} from "flowbite-react";
import { PieChart } from "@mui/x-charts";

export default function MeetingTopSources () {
    return (
        <div className="flex flex-col bg-white border w-[45%] rounded-md">
            <div className="flex flex-row justify-between mx-4">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Meeting top sources
                    </h1>
                </div>
                <div className="mt-auto mb-auto">
                    <div className="flex flex-row space-x-4">
                    <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() =>
                        <Button className="bg-transparent text-gray-700 border-gray-700 rounded-md mt-4">
                            30 Days
                            <HiChevronDown className="ml-2 h-5 w-5"/>
                        </Button>
                    }>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-[40%] mx-auto">
                <PieChart
                    margin={{ bottom: 50, right: 75, left: 75 }}
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                            innerRadius: 50
                        },
                    ]}
                    height={400}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 20,
                        }
                    }}
                />
            </div>
        </div>
    )
}
