import { HiChevronDown } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Button, Dropdown } from "flowbite-react";

import CustomersOverview from "../components/Statistics/CustomerOverview";
import Events from "../components/Statistics/Events";
import CustomersByCountry from "../components/Statistics/CustomersByCountry";
import MeetingTopSources from "../components/Statistics/MeetingTopSources";

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
                        <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() =>
                            <Button className="bg-transparent text-gray-700 border-gray-700 rounded-md">
                                <FaRegCalendarAlt className="mr-2 h-5 w-5"/>
                                30 Days
                                <HiChevronDown className="ml-2 h-5 w-5"/>
                            </Button>
                        }>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Item>Sign out</Dropdown.Item>
                        </Dropdown>
                        <Button className="bg-blueT">
                            <MdOutlineAnalytics className="mr-2 h-5 w-5"/>
                            Reports
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mx-4 mb-4">
                <CustomersOverview />
                <Events />
            </div>
            <div className="flex flex-row justify-between mx-4">
                <CustomersByCountry />
                <MeetingTopSources />
            </div>
        </div>
    );
}
