import React, { useEffect } from "react";
import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";
import { Accordion } from "flowbite-react";
import Tip from "../types/Tip";
import TipService from "../services/TipService";

function Tips() {
    const [props, setProps] = useState({ page: "tips" });
    const [tips, setTips] = useState<Tip[]>([]);

    useEffect(() => {
        TipService.getAll().then((response) => {
            if (Array.isArray(response.data)) {
                setTips(response.data);
            } else {
                console.log("Expected an array of tips but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);


    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flex flex-col p-5">
                <h1 className="text-5xl py-1">
                    Tips for Coaches
                </h1>
                <div className="flex justify-center pt-10">
                    <Accordion className="w-full">
                        <Accordion.Panel>
                            <Accordion.Title className="font-bold bg-white">What is Flowbite?</Accordion.Title>
                            <Accordion.Content>
                                Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                                dropdowns, modals, navbars, and more.
                                Check out this guide to learn how to&nbsp;
                                <a
                                    href="https://flowbite.com/docs/getting-started/introduction/"
                                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    get started&nbsp;
                                </a>
                                and start developing websites even faster with components on top of Tailwind CSS.
                            </Accordion.Content>
                        </Accordion.Panel> 
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Tips;
