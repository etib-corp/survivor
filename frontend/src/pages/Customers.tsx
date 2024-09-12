import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ETIBCustomers from "../components/ETIBCustomers";
import ETIBNavBar from "../components/ETIBNavBar";

import CustomerService from "../services/CustomerService";
import PaymentService from "../services/PaymentService";

import Customer from "../types/Customer";
import Payment from "../types/Payment";

import CryptoJS from "crypto-js";

function Customers() {
    const navigate = useNavigate();
    const [props, setProps] = useState({ page: "customers" });
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const bytes = CryptoJS.AES.decrypt(userInfo, process.env.REACT_APP_SECRET_KEY || "");
            const decryptedUserInfo = bytes.toString(CryptoJS.enc.Utf8);
            const parsedUserInfo = JSON.parse(decryptedUserInfo);

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
    }, [customers]);

    useEffect(() => {
        PaymentService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setPayments(response.data['hydra:member']);
            } else {
                console.log("Expected an array of payments but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    for (let i = 0; i < customers.length; i++) {
        for (let j = 0; j < payments.length; j++) {
            if (payments[j].customer.slice(15) === customers[i].id?.toString()) {
                customers[i].payment_method = payments[j].method;
            }
        }
    }

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <ETIBCustomers customers={customers} />
        </div>
    )
}

export default Customers;
