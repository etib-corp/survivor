import { BarChart } from "@mui/x-charts";
import { LineChart } from '@mui/x-charts/LineChart';

import { HiChartSquareBar, HiUsers } from "react-icons/hi";
import { MdOutlineSsidChart } from "react-icons/md";

import ETIBSideBar from "../components/ETIBSideBar";

import { coaches } from "../data";
import { Tabs } from "flowbite-react";
import { useState } from "react";


const profiles = [
    [{ icon: HiUsers, content: "Global view", id: 0}],
    coaches
];

export default function Statistics () {
    const meetings = coaches.map((user) => user.meetings);
    const [selectedView, setSelectedView] = useState(0);
    let data = [];

    for (let i = 0; i < meetings.length; i++) {
        data.push({
            data: meetings[i],
        });
    }
    return (
        <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
            <ETIBSideBar properties={profiles} OnChangeView={setSelectedView}/>
            <Tabs>
                <Tabs.Item active title="Bar view" icon={HiChartSquareBar}>
                    <BarChart
                        series={selectedView === 0 ? data : [data[selectedView - 1]]}
                        width={500}
                        height={300}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                </Tabs.Item>
                <Tabs.Item active title="Line view" icon={MdOutlineSsidChart}>
                    <LineChart
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        series={selectedView === 0 ? data : [data[selectedView - 1]]}
                        width={500}
                        height={300}
                    />
                </Tabs.Item>
            </Tabs>
        </main>
    );
}