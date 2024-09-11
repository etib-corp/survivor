import { useState, useEffect } from "react";

import { HiChevronDown } from "react-icons/hi";

import { Button, Dropdown } from "flowbite-react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

import EncounterService from "../../services/EncounterService";

export default function MeetingTopSources() {
    const [selected, setSelected] = useState(30);
    const [serie, setSerie] = useState<any>([]);
    const today = new Date();

    useEffect(() => {
        EncounterService.getAll().then((response: any) => {
            const encounters = response.data["hydra:member"];
            let minDate = new Date();
            let data = new Array();

            minDate.setDate(today.getDate() - selected);

            encounters.map((encounter: any) => {
                let tmpDate = new Date(encounter.date);

                if (tmpDate > minDate) {
                    data.push(encounter.source);
                }
            });

            const wordCount: { [key: string]: number } = {};
            let maxValue = 0;

            data.forEach(word => {
                maxValue = wordCount[word] > maxValue ? wordCount[word] : maxValue;
                if (wordCount[word]) {
                    wordCount[word]++;
                } else {
                    wordCount[word] = 1;
                }
            });

            const sources = Object.keys(wordCount).map((word, index) => ({
                id: index,
                value: wordCount[word],
                label: word,
                color: `rgba(254, 176, 174, ${wordCount[word] / (maxValue)})`
            }));
            setSerie(sources);
        });
    }, [selected]);
    return (
        <div className="flex flex-col bg-pinkB border mx-[5%] md:mx-4 w-[90%] md:w-[45%] rounded-md">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between mx-4">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Meeting top sources
                    </h1>
                </div>
                <div className="mt-auto mb-auto">
                    <div className="flex flex-row space-x-4 justify-center md:justify-normal">
                        <Dropdown
                            label=""
                            dismissOnClick={false}
                            renderTrigger={() =>
                                <Button className="bg-transparent text-gray-700 border-gray-700 rounded-md mt-4">
                                    Last {selected} Days
                                    <HiChevronDown className="ml-2 h-5 w-5" />
                                </Button>
                            }>
                            <Dropdown.Item onClick={() => (setSelected(7))}>
                                1 Week
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => (setSelected(30))}>
                                1 Month
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => (setSelected(90))}>
                                3 Months
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => (setSelected(365))}>
                                1 Year
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[90%] md:w-[40%] mx-auto">
                <PieChart className="text-xl text-white"
                    slotProps={{
                        legend: {
                            hidden: true,
                        }
                    }}
                    series={[
                        {
                            arcLabelMinAngle: 35,
                            arcLabelRadius: '60%',
                            data: serie,
                            innerRadius: 50,
                        },
                    ]}
                    height={400}
                    width={400}

                />
                <div>
                </div>
            </div>
        </div>
    )
}
