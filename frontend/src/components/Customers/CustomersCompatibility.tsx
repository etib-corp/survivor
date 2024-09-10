import { useEffect, useState } from "react";
import axios from "axios";

import { Button, TextInput, Label, ListGroup, ListGroupItem, Spinner } from "flowbite-react";

import GaugeComponent from 'react-gauge-component';

import { HiChevronDown, HiPlus } from "react-icons/hi";
import { Icon } from "@mui/material";

const CustomersCompatibility: React.FC<{ properties: any }> = ({ properties }) => { 
    const [inputSearch1, setInputSearch1] = useState("");
    const [inputSearch2, setInputSearch2] = useState("");
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [customerId1, setCustomerId1] = useState(0);
    const [customerId2, setCustomerId2] = useState(0);
    const [compatibility, setCompatibility] = useState(0);

    const [field1, setField1] = useState(false);
    const [field2, setField2] = useState(false);

    const [buttonText, setButtonText] = useState(<div>
        <HiPlus/>
    </div>);

    function handleSearch1(e: any) {
        setInputSearch1(e.target.value)
    };

    function handleSearch2(e: any) {
        setInputSearch2(e.target.value)
    };

    function getCompatibility() {
        axios.get(process.env.REACT_APP_API_URL + '/compatibility/' + customerId1 + '/' + customerId2, {}).then((response) => {
            setCompatibility(response.data.compatibility);
            setButtonText(<div>
                <HiPlus/>
            </div>);
        }, (error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (inputValue1 && inputValue2) {
            setButtonText(<div>
                <Spinner size="lg" />
            </div>);
            setTimeout(getCompatibility, 2000);
        }
    }, [inputValue1, inputValue2]); 

    function getSign(sign: string) {
        switch (sign) {
            case "Aries":
                return " ♈";
            case "Taurus":
                return " ♉";
            case "Gemini":
                return " ♊";
            case "Cancer":
                return " ♋";
            case "Leo":
                return " ♌";
            case "Virgo":
                return " ♍";
            case "Libra":
                return " ♎";
            case "Scorpio":
                return " ♏";
            case "Sagittarius":
                return " ♐";
            case "Capricorn":
                return " ♑";
            case "Aquarius":
                return " ♒";
            case "Pisces":
                return " ♓";
            default:
                return "";
        }
    }

    return (
        <div className="flex flex-col items-center justify-center my-10 md:my-0 md:h-[100vh]">
            <div className="underline decoration-blueT underline-offset-8 sm:text-2xl text-sm pb-[11%]">
                Check Customers compatibility
            </div>
            <div className="grid gap-x-5 md:gap-x-0 grid-cols-1 md:grid-cols-7 pb-[10vh] gap-y-10">
                <div className="flex flex-col justify-center items-center md:col-start-3 md:col-end-4">
                    <Button color="light" onClick={() => { setField1(!field1) }}>
                        <Label>
                            {inputValue1 !== "" ? inputValue1 : "Select a customer"}
                        </Label>
                        <HiChevronDown className="h-5 w-5" />
                    </Button>
                    {field1 &&
                        <div className="absolute mt-60 sm:w-44 w-40">
                            <TextInput onChange={handleSearch1} value={inputSearch1} placeholder="Search..."/>
                            <ListGroup className="overflow-auto h-36 w-[100%]">
                                {properties.map((customer: any) => (
                                    ((customer.name + " " + customer.surname).includes(inputSearch1) || inputSearch1 === "") &&
                                    <ListGroupItem
                                        key={customer.id}
                                        className="text-sm"
                                        onClick={() => {
                                            setInputValue1(customer.name + " " + customer.surname + getSign(customer.astrologicalSign));
                                            setCustomerId1(customer.id);
                                            setInputSearch1(customer.name + " " + customer.surname);
                                            setField1(false);
                                        }}
                                    >
                                        {customer.name + " " + customer.surname + getSign(customer.astrologicalSign)}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    }
                </div>
                <div className="flex justify-center items-center md:col-start-4 md:col-end-5 text-xl">
                    {buttonText}
                </div>
                <div className="flex justify-center items-center md:col-start-5 md:cols-end-6">
                    <div className="flex flex-col justify-center items-center md:col-start-3 md:col-end-4">
                        <Button color="light" onClick={() => { setField2(!field2) }}>
                            <Label>
                                {inputValue2 !== "" ? inputValue2 : "Select a customer"}
                            </Label>
                            <HiChevronDown className="h-5 w-5" />
                        </Button>
                        {field2 &&
                            <div className="absolute mt-60 sm:w-44 w-40">
                                <TextInput onChange={handleSearch2} value={inputSearch2} placeholder="Search..." />
                                <ListGroup className="overflow-auto h-36 w-[100%]">
                                    {properties.map((customer: any) => (
                                        ((customer.name + " " + customer.surname).includes(inputSearch2) || inputSearch2 === "") &&
                                        <ListGroupItem
                                            key={customer.id}
                                            className="text-sm"
                                            onClick={() => {
                                                setInputValue2(customer.name + " " + customer.surname + getSign(customer.astrologicalSign));
                                                setCustomerId2(customer.id);
                                                setInputSearch2(customer.name + " " + customer.surname);
                                                setField2(false);
                                            }}
                                        >
                                            {customer.name + " " + customer.surname + getSign(customer.astrologicalSign)}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div>
                    <GaugeComponent
                        value={compatibility}
                        type="radial"
                        labels={{
                            valueLabel: {
                                matchColorWithArc: true,
                                style: {
                                    textShadow: "none",
                                    fontFamily: "Arial",
                                }
                            }
                        }}
                        arc={{
                            colorArray: ['#EA4228', '#5BE12C'],
                            subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
                            padding: 0.02,
                            width: 0.3,
                            gradient: true
                        }}
                        pointer={{
                            elastic: true,
                            animationDelay: 0,
                            color: '#6b7280',
                            length: 0.8,
                            width: 20
                        }}
                    />
                </div>
            </div>
        </div >
    )
}

export default CustomersCompatibility;