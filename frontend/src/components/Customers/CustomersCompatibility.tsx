import { Dropdown } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import GaugeComponent from 'react-gauge-component';





const CustomersCompatibility: React.FC<{ properties: any }> = ({ properties }) => {

    const [inputSearch1, setInputSearch1] = useState("");
    const [inputSearch2, setInputSearch2] = useState("");
    const [customerId1, setCustomerId1] = useState(0);
    const [customerId2, setCustomerId2] = useState(0);
    const [isComparing, setIsComparing] = useState(false);
    const [compatibility, setCompatibility] = useState(0);

    function handleSearch1(e: any) {
        setInputSearch1(e.target.value)
    };

    function handleSearch2(e: any) {
        setInputSearch2(e.target.value)
    };

    function getCompatibility() {
        axios.get(process.env.REACT_APP_API_URL + '/compatibility/' + customerId1 + '/' + customerId2, {}).then((response) => {
            setCompatibility(response.data.compatibility);
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center my-10 md:my-0 md:h-[100vh]">
            <div className="underline decoration-blueT underline-offset-8 sm:text-2xl text-sm pb-[11%]">
                Check Customers compatibility
            </div>
            <div className="grid gap-x-5 md:gap-x-0 grid-cols-2 md:grid-cols-7 pb-[10vh] gap-y-10">
                <div className="flex justify-center items-center md:col-start-3 md:col-end-4">
                    <Dropdown color="light" className="overflow-auto h-[30%]" onChange={handleSearch1} label={inputSearch1 !== "" ? inputSearch1 : "Select a customer"}>
                        {properties.map((customer: any) => (
                            <Dropdown.Item className="text-sm" onClick={() => {
                                setInputSearch1(customer.name);
                                setCustomerId1(customer.id);
                            }}>
                                {customer.name + " " + customer.surname}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
                <div className="flex justify-center items-center md:col-start-4 md:cols-end-5">
                    <Dropdown color="light" className="overflow-auto h-[30%]" onChange={handleSearch2} label={inputSearch2 !== "" ? inputSearch2 : "Select a customer"}>
                        {properties.map((customer: any) => (
                            <Dropdown.Item className="text-sm" onClick={() => {
                                setInputSearch2(customer.name)
                                setCustomerId2(customer.id)
                            }}>
                                {customer.name + " " + customer.surname}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
                <div className="flex justify-center md:justify-start items-center md:col-center-5 md:col-end-6 ml-1 order-first md:order-last col-span-2 md:col-span-1">
                    <button className="bg-blueT hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={getCompatibility}>
                        Check compatibility
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="">
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
                            colorArray: ['#EA4228','#5BE12C'],
                            subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
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
        </div>
    )

    // return (
            // <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-col auto-rows-auto justify-items-start items-center overflow-y-hidden h-[80vh] md:h-fully md:place-content-center">
            //     <div className="col-start-1 w-[40vw] mx-[5vw] md:ml-[28vw]">
                    // <Dropdown className="overflow-auto h-[30%]" onChange={handleSearch1} label={inputSearch1 !== "" ? inputSearch1 : "Select a customer"}>
                    //     {properties.map((customer: any) => (
                    //         <Dropdown.Item className="text-sm" onClick={() => {
                    //             setInputSearch1(customer.name);
                    //             setCustomerId1(customer.id);
                    //         }}>
                    //             {customer.name + " " + customer.surname}
                    //         </Dropdown.Item>
                    //     ))}
                    // </Dropdown>
            //     </div>
            //     <div className="col-start-3 md:col-start-2 w-[40vw] mx-[5vw] md:ml-[]">
                    // <Dropdown className="overflow-auto h-[30%]" onChange={handleSearch2} label={inputSearch2 !== "" ? inputSearch2 : "Select a customer"}>
                    //     {properties.map((customer: any) => (
                    //         <Dropdown.Item className="text-sm" onClick={() => {
                    //             setInputSearch2(customer.name)
                    //             setCustomerId2(customer.id)
                    //         }}>
                    //             {customer.name + " " + customer.surname}
                    //         </Dropdown.Item>
                    //     ))}
                    // </Dropdown>
            //     </div>
            //     <div className="col-start-1 col-span-3 md:col-start-3 md:col-span-1 flex justify-center items-center">
                    // <button className="bg-blueT hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={getCompatibility}>
                    //     Check compatibility
                    // </button>
            //     </div>
            //     <div className="col-start-1 md:col-start-2">
            //     <GaugeComponent
            //         className={"m-0 w-[95vw] h-full md:w-auto md:h-auto ml-[2.5vw]2"}
            //         value={compatibility}
            //         type="radial"
            //         labels={{
            //             valueLabel: {
            //                 matchColorWithArc: true,
            //                 style: {
            //                     textShadow: "none",
            //                     fontFamily: "Arial",
            //                 }
            //             },
            //             tickLabels: {
            //             type: "outer",
            //             ticks: [
            //                 { value: 20 },
            //                 { value: 40 },
            //                 { value: 60 },
            //                 { value: 80 },
            //                 { value: 100 }
            //             ]
            //             }
            //         }}
            //         arc={{
            //             colorArray: ['#EA4228','#5BE12C'],
            //             subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
            //             padding: 0.02,
            //             width: 0.3,
            //             gradient: true
            //         }}
            //         pointer={{
            //             elastic: true,
            //             animationDelay: 0,
            //             color: '#6b7280',
            //             length: 0.8,
            //             width: 20
            //         }}
            //     />
            //     </div>
            // </div>
    // )
}

export default CustomersCompatibility;