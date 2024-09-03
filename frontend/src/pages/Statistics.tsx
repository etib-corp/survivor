import { BarChart } from "@mui/x-charts";

import ETIBSideBar from "../components/ETIBSideBar";

import { coaches } from "../data";

const profiles = [coaches];

export default function Statistics () {
    const meetings = coaches.map((user) => user.meetings);

    let data = [];

    for (let i = 0; i < meetings.length; i++) {
        data.push({
            data: meetings[i],
        });
    }
    return (
        <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
            <ETIBSideBar properties={profiles} />
            <BarChart
                series={data}
                height={290}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
        </main>
    );
}