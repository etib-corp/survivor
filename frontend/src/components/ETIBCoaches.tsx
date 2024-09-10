import React from 'react';
import { Avatar, Button, Checkbox, Table } from "flowbite-react";
import { LuDownloadCloud } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { VscEllipsis } from "react-icons/vsc";
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";


const ETIBCoaches: React.FC<{ coaches: any }> = ({ coaches }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [sortMode, setSortMode] = useState("asc");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  function handleSortMode () {
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
              Coaches List
            </h1>
            <p>
              You have total {coaches.length} coaches.
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
                  Coach
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Phone
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent" style={{ textTransform: 'none' }}>
                  Number of customers
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent text-right" style={{ textTransform: 'none' }}>
                  Actions
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="border">
                {coaches.sort((a: any, b: any) => {
                  if (sortMode === "asc") {
                    return a.name.localeCompare(b.name)
                  }
                  if (sortMode === "desc") {
                    return b.name.localeCompare(a.name)
                  }
                  return 0;
                }).map((coaches: any) => (
                  (coaches.name + " " + coaches.surname).toLowerCase().includes(inputSearch.toLowerCase()) &&
                  <Table.Row className="border">
                    <Table.Cell className="text-blueT font-semibold flex flex-row">
                      <Avatar img={process.env.REACT_APP_PICTURES_URL + "/employees/" + coaches.id + ".png"} className="mr-2" />
                      <span className="my-auto">
                        {coaches.name + " " + coaches.surname}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="cursor-pointer">
                      <a href={"mailto:" + coaches.email}>{coaches.email}</a>
                    </Table.Cell>
                    <Table.Cell>
                      {coaches.phone}
                    </Table.Cell>
                    <Table.Cell>
                      {coaches.number_of_customers}
                    </Table.Cell>
                    <Table.Cell className="flex justify-end">
                      <Button className="bg-transparent text-gray-700">
                        <VscEllipsis className="h-5 w-5" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default ETIBCoaches;