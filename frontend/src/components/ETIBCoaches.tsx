import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import { Avatar, Breadcrumb, Button, Datepicker, Dropdown, Label, Table, TextInput } from "flowbite-react";

import { LuDownloadCloud } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { VscEllipsis } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { HiAnnotation, HiPhone, HiTrash, HiUser } from 'react-icons/hi';
import { Slider } from '@mui/material';

import { buttonOutlineTheme, buttonTheme, dateTheme, tableTheme, textInputTheme } from '../themes';

const marks = [
  {
    value: 0,
    label: "Male",
  },
  {
    value: 50,
    label: 'Non-Binary',
  },
  {
    value: 100,
    label: 'Female',
  },
];

const CoachForm: React.FC<({ callback: () => void })> = ({ callback }) => {
  const [progress, setProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState(20);
  const [birth, setBirth] = useState<Date>(new Date());
  const [gender, setGender] = useState("male");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>();

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    if (newValue as number < 50) {
      setGender("male");
    } else if (newValue as number === 50) {
      setGender("non-binary");
    } else {
      setGender("female");
    }
  };

  const getSliderBackground = (value: number) => {
    const red = Math.round((255 * value) / 100);
    const blue = Math.round((255 * (100 - value)) / 100);
    return `rgb(${red}, 0, ${blue})`;
  };

  async function pushData(response: any) {
    const data: any = {
      "email": response.email,
      "password": response.password,
      "plainPassword": response.password,
      "roles": [
        "ROLE_COACH"
      ],
      "name": response.name,
      "surname": response.surname,
      "birth_date": birth.toISOString(),
      "gender": gender,
      "work": "Coach",
      "events": [],
      "birthDate": birth.toISOString(),
    };

    try {
      await axios.post(process.env.REACT_APP_API_URL + "/employees", data);
      callback();
      reset();
    } catch (error: any) {
      if (error.response.status === 422) {
        alert("This coach already exists.");
      } else {
        alert("An error occured.");
      }
    }
  }
  const onSubmit: SubmitHandler<any> = (data) => pushData(data);

  const handleDateChange = (e: any) => {
    setBirth(new Date(e));
  };

  return (
    <div className='flex flex-col mx-4 border rounded-md mt-4 space-y-4 bg-pinkB'>
      <div className='border p-4 rounded-md bg-pinkB'>
        <Breadcrumb>
          <Breadcrumb.Item icon={HiUser} onClick={() => setProgress(0)} href='#'>
            Personal
          </Breadcrumb.Item>
          {progress >= 1 && (
            <Breadcrumb.Item icon={HiPhone} onClick={() => setProgress(1)} href='#'>
              Contact
            </Breadcrumb.Item>
          )}
          {progress >= 2 && (
            <Breadcrumb.Item icon={HiAnnotation}>
              Password
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
        {
          progress === 0 &&
          <div className='flex flex-col space-y-8'>
            <div className='flex w-full space-x-8'>
              <div className='flex flex-col w-[50%]'>
                <Label htmlFor='name'>
                  Name
                </Label>
                <TextInput theme={textInputTheme} id='name' type='text' placeholder="Kevin" {...register("name", { required: true })} />
              </div>
              <div className='flex flex-col w-[50%]'>
                <Label htmlFor='surname'>
                  Surname
                </Label>
                <TextInput theme={textInputTheme} id='surname' type="text" placeholder="Cazal" {...register("surname", { required: true })} />
              </div>
            </div>
            <div className='flex w-full space-x-8'>
              <div className='flex flex-col w-[50%]'>
                <Label htmlFor='birth'>
                  Birth Date
                </Label>
                <Datepicker
                  id='birth'
                  theme={dateTheme}
                  onSelectedDateChanged={handleDateChange}
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <span className='w-[95%] mx-auto'>
                  <Label htmlFor='gender'>
                    Gender
                  </Label>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={10}
                    marks={marks}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={{
                      color: getSliderBackground(sliderValue),
                    }}
                  />
                </span>
              </div>
            </div>
            <div className='flex w-full space-x-8'>
              <span className='flex w-1/2 justify-end my-auto ml-auto'>
                <Button theme={buttonTheme} color={"default"} onClick={() => setProgress(1)}>
                  Next
                </Button>
              </span>
            </div>
          </div>
        }
        {
          progress === 1 &&
          <div className='flex flex-col space-y-8'>
            <div className='flex w-full space-x-8'>
              <div className='flex flex-col w-[50%]'>
                <Label>Email</Label>
                <TextInput theme={textInputTheme} type='email' placeholder="kevin.cazal@cazalkevin.re" {...register("email", { required: true })} />
              </div>
              <span className='flex w-1/2 justify-end my-auto ml-auto'>
                <Button theme={buttonTheme} color="default" onClick={() => setProgress(2)}>
                  Next
                </Button>
              </span>
            </div>
          </div>
        }
        {
          progress === 2 &&
          <div className='flex flex-col space-y-8'>
            <div className='flex w-full space-x-8'>
              <div className='flex flex-col w-[50%]'>
                <Label>Password</Label>
                <TextInput theme={textInputTheme} type='password' placeholder="H4ck3rZ" {...register("password", { required: true })} />
              </div>
              <span className='flex w-1/2 justify-end my-auto ml-auto'>
                <Button theme={buttonTheme} color="default" type='submit'>
                  Submit
                </Button>
              </span>
            </div>
          </div>
        }
      </form>
    </div>
  );
}

const ETIBCoaches: React.FC<{ coaches: any }> = ({ coaches }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [sortMode, setSortMode] = useState("asc");
  const [addCoach, setAddCoach] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const exportToCSV = () => {
    const csvRows = [];
    csvRows.push('"Coaches","Email"');
    coaches.forEach((coaches: any) => {
      const coachesName = `"${coaches.name} ${coaches.surname}"`;
      const email = `"${coaches.email}"`;
      csvRows.push([coachesName, email].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'coaches.csv');
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

  async function removeCoach(id: number) {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "/employees/" + id);
    } catch (error: any) {
      alert("An error occured.");
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
                <Button theme={buttonOutlineTheme} color="default" onClick={exportToCSV}>
                  <LuDownloadCloud className="mr-2 h-5 w-5" />
                  Export
                </Button>
                <Button theme={buttonTheme} color="default" onClick={() => (setAddCoach(!addCoach))}>
                  <GoPlus className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          {
            addCoach &&
            <CoachForm callback={() => (setAddCoach(false))} />
          }
          <div className="relative w-[100%] px-4 pt-5">
            <div className="relative border shadow-md sm:rounded-md">
              <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 my-2">
                <div className="pt-4 px-4 flex flex-row">
                  <div className="relative">
                    <input
                      id="table-search"
                      type="text"
                      className="w-48 text-sm text-gray-500 enabled:border-gray-300 enabled:focus:ring-pinkT focus:ring-1 pl-10"
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
              <Table hoverable className="bg-transparent" theme={tableTheme}>
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
                  }).map((coache: any) => (
                    (coache.name + " " + coache.surname).toLowerCase().includes(inputSearch.toLowerCase()) &&
                    <Table.Row className="border">
                      <Table.Cell className="text-blueT font-semibold flex flex-row">
                        <Avatar img={process.env.REACT_APP_PICTURES_URL + "/employees/" + coache.id + ".png"} className="mr-2" />
                        <span className="my-auto text-pinkT">
                          {coache.name + " " + coache.surname}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="cursor-pointer">
                        <a href={"mailto:" + coache.email}>{coache.email}</a>
                      </Table.Cell>
                      <Table.Cell>
                        {coache.phone}
                      </Table.Cell>
                      <Table.Cell>
                        {coache.number_of_customers}
                      </Table.Cell>
                      <Table.Cell className="flex justify-end">
                        <Dropdown label="action" renderTrigger={() =>
                          <Button className="bg-transparent text-gray-700 hover:text-pinkT enabled:hover:bg-transparent focus:ring-2 focus:ring-pinkB">
                            <VscEllipsis className="h-5 w-5" />
                          </Button>
                        }>
                          <Dropdown.Item icon={HiTrash} className='text-red-600' onClick={() => removeCoach(coache.id)}>
                            Remove
                          </Dropdown.Item>
                        </Dropdown>
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