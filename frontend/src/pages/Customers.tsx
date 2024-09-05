import ETIBCustomers from "../components/ETIBCustomers";
import ETIBNavBar from "../components/ETIBNavBar";
import { useEffect, useState } from "react";
import CustomerService from "../services/CustomerService";
import Customer from "../types/Customer";
import Payment from "../types/Payment";
import PaymentService from "../services/PaymentService";

function Customers () {
    const [props, setProps] = useState({ page: "customers" });
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    useEffect(() => {
        CustomerService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setCustomers(response.data['hydra:member']);
                console.log(response.data['hydra:member']);
            } else {
                console.log("Expected an array of customers but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);
    useEffect(() => {
        PaymentService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setPayments(response.data['hydra:member']);
                console.log(response.data['hydra:member']);
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
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            <ETIBCustomers customers={customers}/>
        </div>
    )
}

export default Customers;