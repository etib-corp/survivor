import React from "react";

import { HiArrowLeft } from "react-icons/hi";

import { Button } from "flowbite-react";

import ProfileSide from "./ProfileSide";
import ProfileStats from "./ProfileStats";

const CustomerDetails: React.FC<{ properties: any }> = ({ properties }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between mt-8 px-4 mb-8">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold py-3">
                        Customer Details
                    </h1>
                </div>
                <div className="mt-auto mb-auto">
                    <Button className="bg-white text-gray-700 border-gray-700" href="/Customers">
                        <HiArrowLeft className="mr-2 h-5 w-5"/>
                        Back
                    </Button>
                </div>
            </div>
            <div className="flex flex-row px-4">
                <ProfileSide properties={properties}/>
                <ProfileStats properties={properties}/>
            </div>
        </div>
    )
}

export default CustomerDetails;