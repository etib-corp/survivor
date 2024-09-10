import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomersCompatibility from '../components/Customers/CustomersCompatibility';
import ETIBNavBar from '../components/ETIBNavBar';

import Customer from '../types/Customer';

import CustomerService from '../services/CustomerService';

export default function Compatibility() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState({ page: "compatibility" });
    const [customers, setCustomers] = useState<Customer[]>([]);

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const parsedUserInfo = JSON.parse(userInfo);
            if (parsedUserInfo.roles[0] === "ROLE_CUSTOMER") {
                navigate("/Wardrobe");
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }
    }, []);

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
            <ETIBNavBar properties={properties} OnChangeView={setProperties} />
            <CustomersCompatibility properties={customers} />
        </div>
    )
}