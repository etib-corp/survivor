import axios from 'axios';

import { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { Tooltip } from 'react-tooltip';

import CustomerService from "../../services/CustomerService";

import Customer from "../../types/Customer";
import { Spinner } from 'flowbite-react';

export default function CustomersByCountry() {
    const geoUrl = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson";
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [depts, setDepts] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CustomerService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setCustomers(response.data['hydra:member']);
            } else {
                console.log("Expected an array of customers but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setLoading(false);
        let tmpDepts = new Array(96).fill(0);

        customers.map((customer) => {
            axios.get(process.env.REACT_APP_API_URL + "/customer/dept/" + customer.id).then((response) => {
                const dept = response.data.dept.slice(0, 2) as number;

                if (tmpDepts[dept - 1] === 0) {
                    tmpDepts[dept - 1] = 1;
                } else {
                    tmpDepts[dept - 1] += 1;
                }
            }).catch((error) => {
                console.log(error);
            });
        });
        setDepts(tmpDepts);
        setLoading(false);
    }, [customers]);

    return (
        <div className="flex flex-col bg-white border mx-[5%] md:mx-4 w-[90%] md:w-[55%] rounded-md">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between px-4 mb-8">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold py-3">
                        Customers in France
                    </h1>
                </div>
                <div className='p-4'>
                    {
                        loading === true &&
                        <Spinner className="w-8 h-8" />
                    }
                </div>
            </div>
            <div className="w-[90%] mx-auto">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        center: [2, 46.5],
                        rotate: [0, 0, 0],
                        scale: 2200
                    }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                return (
                                    <Geography
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={`${geo.properties.nom} - ${depts[parseInt(geo.properties.code) - 1]}`}
                                        key={geo.rsmKey}
                                        geography={geo}
                                        stroke="gray"
                                        strokeWidth={0.5}
                                        onClick={() => { console.log(geo) }}
                                        style={{
                                            default: {
                                                outline: "none",
                                                fill: (depts[parseInt(geo.properties.code) - 1] > 0 ? `rgba(254, 170, 176, ${depts[parseInt(geo.properties.code) - 1] / 6})` : "whitesmoke")
                                            },
                                            pressed: {
                                                outline: "none",
                                            },
                                            hover: {
                                                outline: "none",
                                                fill: "white"
                                            }
                                        }}
                                    />
                                )
                            })}
                    </Geographies>
                </ComposableMap>
            </div>
            <Tooltip id='my-tooltip' />
        </div>
    )
}
