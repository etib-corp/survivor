import React, { useEffect, useState } from 'react';

import { Dropdown } from "flowbite-react";
import CustomersCompatibility from '../components/Customers/CustomersCompatibility';
import Customer from '../types/Customer';
import CustomerService from '../services/CustomerService';
import ETIBNavBar from '../components/ETIBNavBar';

export default function Compatibility() {

    const [properties, setProperties] = useState({ page: "compatibility" });

    const [customers, setCustomers] = useState<Customer[]>([]);
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

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={properties} OnChangeView={setProperties}/>
            <CustomersCompatibility properties={customers} />
        </div>
    )
}