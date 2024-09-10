import React, { useState } from 'react';

import { Avatar, Button, Table } from "flowbite-react";

import { LuDownloadCloud } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";

import { PaymentsMethod } from './Customers/ProfileStats';
import CustomerDetails from './Customers/CustomerDetails';


const ETIBCustomers: React.FC<{ customers: any }> = ({ customers }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [sortMode, setSortMode] = useState("asc");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const exportToCSV = () => {
    const csvRows = [];
    csvRows.push('"Customer","Email","Phone","Payment Methods"');
    customers.forEach((customer: any) => {
      const customerName = `"${customer.name} ${customer.surname}"`;
      const email = `"${customer.email}"`;
      const phone = `"${customer.phone_number}"`;
      const paymentMethod = `"${customer.payment_method}"`;
      csvRows.push([customerName, email, phone, paymentMethod].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'customers.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  function handleSortMode() {
    if (sortMode === "asc") {
      setSortMode("desc");
    } else {
      setSortMode("asc");
    }
  }

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
              <Button className="bg-transparent text-gray-700 border-gray-700 focus:ring-2 focus:ring-gray-300 enabled:hover:bg-gray-100" onClick={exportToCSV}>
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
                <div className="pt-4 px-4 flex flex-row">
                  <div className="relative">
                    <input
                      id="table-search"
                      type="text"
                      className="w-48 text-sm text-gray-500 border-gray-300 focus:ring-gray-300 focus:ring-1 pl-10"
                      placeholder="Search..."
                      value={inputSearch}
                      onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <CiSearch className="absolute w-4 h-4 top-3 left-3 text-gray-500" />
                  </div>
                  <Button color="gray" className="ml-4 w-10 h-[2.4rem] text-gray-300 focus:ring-gray-300 focus:ring-1" onClick={handleSortMode}>
                    <IoFilterOutline className="h-4 w-5 text-gray-500" />
                  </Button>
                </div>
              </div>
              <Table hoverable className="bg-transparent">
                <Table.Head className="border bg-transparent">
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
                </Table.Head>
                <Table.Body className="border">
                  {customers.sort((a: any, b: any) => {
                    if (sortMode === "asc") {
                      return a.name.localeCompare(b.name)
                    }
                    if (sortMode === "desc") {
                      return b.name.localeCompare(a.name)
                    }
                    return 0;
                  }).map((customer: any) => (
                    ((customer.name + " " + customer.surname).toLowerCase().includes(inputSearch.toLowerCase()) || inputSearch === "") &&
                    <Table.Row className="border">
                      <Table.Cell onClick={() => { setCurrentCustomer(customer) }} className="text-blueT font-semibold flex flex-row">
                        <Avatar img={process.env.REACT_APP_PICTURES_URL + "/customers/" + customer.id + ".png"} className="mr-2" /> {/*/ IL FAUT FAIRE UN ROUTE /*/}
                        <span className="my-auto">
                          {customer.name + " " + customer.surname}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        {customer.email}
                      </Table.Cell>
                      <Table.Cell>
                        {customer.phone_number}
                      </Table.Cell>
                      <Table.Cell>
                        <PaymentsMethod method={customer.payment_method} />
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