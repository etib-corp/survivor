import { useEffect, useState } from "react";

import { HiChevronDown } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Button, Dropdown } from "flowbite-react";

import CustomersOverview from "../components/Statistics/CustomerOverview";
import Events from "../components/Statistics/Events";
import CustomersByCountry from "../components/Statistics/CustomersByCountry";
import MeetingTopSources from "../components/Statistics/MeetingTopSources";

import CustomerService from "../services/CustomerService";
import Customer from "../types/Customer";
import { buttonTheme } from "../themes";

export default function Statistics () {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        CustomerService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setCustomers(response.data['hydra:member']);
            } else {
                console.log("Expected an array of customers but got:", response.data);
            }
        }).catch((e) => {
            document.location.reload();
        });
    }, []);
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 px-4 mb-8">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold py-3">
                        Dashboard
                    </h1>
                    <p>
                        Welcome!
                    </p>
                </div>
                <div className="mt-3 md:mt-auto mb-auto">
                    <div className="flex flex-row space-x-4 justify-center md:justify-normal">
                        <Button theme={buttonTheme} color="default">
                            <MdOutlineAnalytics className="mr-2 h-5 w-5"/>
                            Reports
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden md:block ">
                <div className="flex flex-row justify-between mb-4">
                    <CustomersOverview customers={customers} />
                    <Events />
                </div>
                <div className="flex flex-row justify-between">
                    <CustomersByCountry />
                    <MeetingTopSources />
                </div>
            </div>
            <div className="block md:hidden">
                <div className="grid grid-cols-1 space-y-4">
                    <CustomersOverview customers={customers} />
                    <Events />
                    <CustomersByCountry />
                    <MeetingTopSources />
                </div>
            </div>
        </div>
    );
}
