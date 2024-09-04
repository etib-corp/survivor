import { HiChevronDown } from "react-icons/hi";

import { Button, Dropdown } from "flowbite-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

export default function CustomersByCountry () {
    interface CountryData {
        country: string;
        customers: number;
        percentage: number;
    };

    const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
    const props: CountryData[] = [
        {
            country: "United States",
            customers: 301,
            percentage: 30.1
        },
        {
            country: "Germany",
            customers: 201,
            percentage: 20.1
        },
        {
            country: "United Kingdom",
            customers: 101,
            percentage: 10.1
        },
        {
            country: "France",
            customers: 51,
            percentage: 5.1
        },
        {
            country: "Canada",
            customers: 41,
            percentage: 4.1
        }
    ];

    const List: React.FC<{ properties: CountryData[]}> = ({ properties}) => {
        return (
            <div>
                {properties.map((property) => {
                    return (
                        <div className="flex flex-row justify-between px-4 mb-4">
                            <div className="flex flex-row w-[70%]">
                                <p className="text-lg">
                                    {property.country}
                                </p>
                            </div>
                            <div className="flex flex-row justify-between w-[30%]">
                                <p className="text-lg">
                                    {property.customers}
                                </p>
                                <p className="text-lg text-gray-400">
                                    {property.percentage}%
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-white border mr-8 w-[55%] rounded-md">
            <div className="flex flex-row justify-between px-4 mb-8">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Customers by Country
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
            <div className="w-[30%] mx-auto">
                <ComposableMap>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map((geo) => {
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={geo.properties.name !== "Antarctica" ? "gray" : "transparent"}
                                    stroke="transparent"
                                    strokeWidth={0.5}
                                    onClick={() => { console.log(geo)}}
                                    style={{
                                        default: {
                                            outline: "none",
                                        },
                                        pressed: {
                                            outline: "none",
                                        },
                                        hover: {
                                            outline: "none",
                                        }
                                    }}
                                />
                            )
                        })}
                    </Geographies>
                </ComposableMap>
            </div>
            <List properties={props}></List>
        </div>
    )
}
