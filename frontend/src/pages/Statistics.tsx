import { BarChart } from "@mui/x-charts";

import ETIBSideBar from "../components/ETIBSideBar";

import { coaches } from "../data";

export default function Statistics () {
    return (
        <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
            <ETIBSideBar properties={coaches} />
            <BarChart
                series={[
                    { data: [35, 44, 24, 34] },
                    { data: [51, 6, 49, 30] },
                    { data: [15, 25, 30, 50] },
                    { data: [60, 50, 15, 25] },
                ]}
                height={290}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
        </main>
    );
}