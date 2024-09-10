import { useEffect, useState } from "react";

import { HiOutlineArchive, HiOutlineMail } from "react-icons/hi";

import { Avatar } from "flowbite-react";
import EncounterService from "../../services/EncounterService";

const ProfileSide: React.FC<{ properties: any }> = ({ properties }) => {
    const [positives, setPositives] = useState(0);

    useEffect(() => {
        function fetchEncounters() {
            return Promise.all(properties.encounters.map((encounter: string) => {
                const id = parseInt(encounter.split("/").pop() as string);
                return EncounterService.get(id);
            }));
        }

        fetchEncounters().then((responses) => {
            let count = 0;
            responses.map((response) => {
                const data = response.data;
                if (data.rating > 3) {
                    count++;
                }
            });
            setPositives(count);
        });
    }, []);
    return (
        <div className="flex flex-col bg-white border mr-8 w-[25%] rounded-md">
            <div className="flex flex-col bg-white border py-8">
                <Avatar size="lg" img={process.env.REACT_APP_PICTURES_URL + "/customers/" + properties.id + ".png"} rounded/>
                <div className="flex flex-col p-4 mx-auto text-center">
                    <h1 className="text-2xl font-bold">
                        {properties.name + " " + properties.surname}
                    </h1>
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
                        {properties.encounters.length}
                    </h1>
                    <p className="text-gray-500">
                        Total Encounters
                    </p>
                </div>
                <div className="flex flex-col text-center w-[30%]">
                    <h1 className="text-2xl font-bold">
                        {positives}
                    </h1>
                    <p className="text-gray-500">
                        Positives
                    </p>
                </div>
            </div>
            <div className="flex flex-col bg-white border py-8 justify-between px-8">
                <h2>
                    SHORT DETAILS
                </h2>
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
                        Gender
                    </p>
                    <p className="">
                        {properties.gender}
                    </p>
                </div>
                <div className="flex flex-col py-2">
                    <p className="text-gray-500">
                        Astrological Sign
                    </p>
                    <p className="">
                        {properties.astrologicalSign}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileSide;