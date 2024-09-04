import React from 'react';
import { Avatar, Button, Checkbox, Table } from "flowbite-react";
import { HiOutlineCalendar, HiChevronRight } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuDownloadCloud } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { VscEllipsis } from "react-icons/vsc";
import { Mastercard, Visa, Paypal } from 'react-payment-logos/dist/flat';
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { Tab } from '@mui/material';
import { PaymentsMethod } from './Customers/ProfileStats';
import CustomerDetails from './Customers/CustomerDetails';


const ETIBCustomers: React.FC<{ customers: any }> = ({ customers }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      {currentCustomer === null &&
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold py-1">
              Customers List
            </h1>
            <p>
              You have total {customers.length} customers.
            </p>
          </div>
          <div className="mt-3 md:mt-auto mb-auto">
            <div className="flex flex-row space-x-4 justify-center md:justify-normal">
              <Button className="bg-transparent text-gray-700 border-gray-700 focus:ring-2 focus:ring-gray-300 enabled:hover:bg-gray-100">
                <LuDownloadCloud className="mr-2 h-5 w-5" />
                Export
              </Button>
              <Button className="bg-blueT focus:ring-2 focus:ring-gray-300 enabled:hover:bg-blue-500">
                <GoPlus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-[100%] px-4 pt-5">
          <div className="relative border shadow-md sm:rounded-md">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 my-2">
              <div className="mt-3 ml-4 flex flex-row">
                <button
                  id="dropdownActionButton"
                  onClick={toggleDropdown}
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Bulk Action
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l4 4 4-4"
                    />
                  </svg>
                </button>
                <Button color="gray" className="ml-4 w-24 text-gray-300 focus:ring-gray-300 focus:ring-1 enabled:hover:text-gray-500 focus:text-gray-300">
                  Apply
                </Button>
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    id="dropdownAction"
                    className="absolute mt-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700"
                      aria-labelledby="dropdownActionButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Reward
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Promote
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Activate account
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete User
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-4 px-4 flex flex-row">
                <div className="relative">
                  <input
                    id="table-search"
                    type="text"
                    className="w-48 text-sm text-gray-500 border-gray-300 focus:ring-gray-300 focus:ring-1 rounded-md pl-10"
                    placeholder="Search..."
                  />
                  <CiSearch className="absolute w-4 h-4 top-3 left-3 text-gray-500" />
                </div>
                <Button color="gray" className="ml-4 w-10 h-[2.4rem] text-gray-300 focus:ring-gray-300 focus:ring-1">
                  <IoFilterOutline className="h-4 w-5 text-gray-500" />
                </Button>
                <Button color="gray" className="ml-4 w-10 h-[2.4rem] text-gray-300 focus:ring-gray-300 focus:ring-1">
                  <IoSettingsOutline className="h-4 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
            <Table hoverable className="border rounded-md bg-transparent">
              <Table.Head className="border bg-transparent">
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Customer
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Phone
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Payment Methods
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent text-right" style={{ textTransform: 'none' }}>
                  Actions
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="border">
                {customers.map((customer: any) => (
                  <Table.Row className="border">
                    <Table.Cell>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell onClick={() => { setCurrentCustomer(customer) }} className="text-blueT font-semibold flex flex-row">
                      <Avatar img={customer.avatar} className="mr-2" />
                      <span className="my-auto">
                        {customer.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {customer.email}
                    </Table.Cell>
                    <Table.Cell>
                      {customer.phone}
                    </Table.Cell>
                    <Table.Cell>
                      <PaymentsMethod method={customer.paymentMethods} />
                    </Table.Cell>
                    <Table.Cell className="flex justify-end">
                      <Button className="bg-transparent text-gray-700">
                        <VscEllipsis className="h-5 w-5" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>}
      {currentCustomer !== null && <CustomerDetails properties={currentCustomer} />}
    </div>
  );
}

export default ETIBCustomers;