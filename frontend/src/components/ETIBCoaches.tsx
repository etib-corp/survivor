import React from 'react';
import { Button } from "flowbite-react";
import { HiOutlineCalendar, HiChevronRight } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuDownloadCloud } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { IoFilterOutline } from "react-icons/io5";
import { VscEllipsis } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';


export default function ETIBCoaches () {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold py-3 md:py-1">
                        Coaches List
                    </h1>
                    <p>
                        You have total 78 coaches.
                    </p>
                </div>
                <div className="mt-3 md:mt-auto mb-auto">
                    <div className="flex flex-row space-x-4 justify-center md:justify-normal">
                        <Button className="bg-transparent text-gray-700 border-gray-700 focus:ring-2 focus:ring-gray-300 enabled:hover:bg-gray-100">
                            <LuDownloadCloud className="mr-2 h-5 w-5"/>
                            Export
                        </Button>
                        <Button className="bg-blueT focus:ring-2 focus:ring-gray-300 enabled:hover:bg-blue-500">
                            <GoPlus className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>
            </div>
        <div className="relative w-[100%] px-4 pt-5">
          <div className="relative border shadow-md sm:rounded-md">
            <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 my-2">
              <div className="mt-3 ml-4 flex flex-row">
                <button
                    id="dropdownActionButton"
                    onClick={toggleDropdown}
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-md text-sm px-3 py-1.5"
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
        {/* <label htmlFor="table-search" className="sr-only">
          Search
        </label> */}
        <div className="pt-4 px-4 flex flex-row">
          <div className="relative">
            <input
              id="table-search"
              type="text"
              className="w-48 text-sm text-gray-500 border-gray-300 focus:ring-gray-300 focus:ring-1 rounded-md pl-10"
              placeholder="Search..."
            />
            <CiSearch className="absolute w-4 h-4 top-3 left-3 text-gray-500"/>
          </div>
          <Button color="gray" className="ml-4 w-10 h-[2.4rem] text-gray-300 focus:ring-gray-300 focus:ring-1">
            <IoFilterOutline className="h-4 w-5 text-gray-500"/>
          </Button>
          <Button color="gray" className="ml-4 w-10 h-[2.4rem] text-gray-300 focus:ring-gray-300 focus:ring-1">
            <IoSettingsOutline className="h-4 w-5 text-gray-500"/>
          </Button>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded focus:ring-gray-300 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th className="px-6 py-3">
              Coaches
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Number of customers
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                alt="Jese image"
              />
              <div className="ps-3">
                <div className="text-base font-semibold">Neil Sims</div>
                {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
              </div>
            </th>
            <td className="px-6 py-4">neil.sims@flowbite.com</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                +0129180371
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                12
              </div>
            </td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium"
              >
                <VscEllipsis className="h-5 w-5 ml-7"/>
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-2"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox-table-search-2" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <div className="ps-3">
                <div className="text-base font-semibold">Bonnie Green</div>
                {/* <div className="font-normal text-gray-500">bonnie@flowbite.com</div> */}
              </div>
            </th>
            <td className="px-6 py-4">bonnie@flowbite.com</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
              +0129180371
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                6
              </div>
            </td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium"
              >
                <VscEllipsis className="h-5 w-5 ml-7"/>
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael image"
              />
              <div className="ps-3">
                <div className="text-base font-semibold">Michael Gough</div>
                {/* <div className="font-normal text-gray-500">michael@flowbite.com</div> */}
              </div>
            </th>
            <td className="px-6 py-4">michael@flowbite.com</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
              +0129180371
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                4
              </div>
            </td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium"
              >
                <VscEllipsis className="h-5 w-5 ml-7"/>
              </a>
            </td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-4"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox-table-search-4" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                alt="Lana image"
              />
              <div className="ps-3">
                <div className="text-base font-semibold">Lana Byrd</div>
                {/* <div className="font-normal text-gray-500">lana@flowbite.com</div> */}
              </div>
            </th>
            <td className="px-6 py-4">lana@flowbite.com</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
              +0129180371
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                22
              </div>
            </td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium"
              >
                <VscEllipsis className="h-5 w-5 ml-7"/>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}