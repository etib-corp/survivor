import { HiOutlineArchive, HiOutlineMail } from "react-icons/hi";

import { Avatar } from "flowbite-react";

const ProfileSide: React.FC<{ properties: any }> = ({ properties }) => {
    return (
        <div className="flex flex-col bg-white border mr-8 w-[25%] rounded-md">
            <div className="flex flex-col bg-white border py-8">
                <Avatar size="lg" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>
                <div className="flex flex-col p-4 mx-auto text-center">
                    <h1 className="text-2xl font-bold">{properties.name}</h1>
                </div>
            </div>
            <div className="flex flex-col bg-white border py-8">
                <div className="flex flex-row mx-auto space-x-8">
                    <HiOutlineMail className="h-10 w-10"/>
                    <HiOutlineArchive className="h-10 w-10"/>
                </div>
            </div>
            <div className="flex flex-row bg-white border py-8 justify-between px-8">
                <div className="flex flex-col text-center w-[30%]">
                    <h1 className="text-2xl font-bold">
                        {properties.encounters}
                    </h1>
                    <p className="text-gray-500">
                        Total Encounters
                    </p>
                </div>
                <div className="flex flex-col text-center w-[30%]">
                    <h1 className="text-2xl font-bold">
                        {properties.positives}
                    </h1>
                    <p className="text-gray-500">
                        Positives
                    </p>
                </div>
                <div className="flex flex-col text-center w-[30%]">
                    <h1 className="text-2xl font-bold">
                        {properties.inprogress}
                    </h1>
                    <p className="text-gray-500">
                        In Progress
                    </p>
                </div>
            </div>
            <div className="flex flex-col bg-white border py-8 justify-between px-8">
                <h2>
                    SHORT DETAILS
                </h2>
                <div className="flex flex-col py-2">
                    <p className="text-gray-500">
                        User ID:
                    </p>
                    <p className="">
                        {properties.id}
                    </p>
                </div>
                <div className="flex flex-col py-2">
                    <p className="text-gray-500">
                        Email:
                    </p>
                    <p className="">
                        {properties.email}
                    </p>
                </div>
                <div className="flex flex-col py-2">
                    <p className="text-gray-500">
                        Address:
                    </p>
                    <p className="">
                        {properties.address}
                    </p>
                </div>
                <div className="flex flex-col py-2">
                    <p className="text-gray-500">
                        Last Activity:
                    </p>
                    <p className="">
                        {properties.lastActivity}
                    </p>
                </div>
                <div className="flex flex-col py-2">
                    <p className="text-gray-500">
                        Coach:
                    </p>
                    <p className="">
                        {properties.coach}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileSide;