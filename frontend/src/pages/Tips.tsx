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
        TipService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setTips(response.data['hydra:member']);
                console.log(response.data['hydra:member']);
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
                        {tips.map((tip) => (
                            <Accordion.Panel key={tip.id}>
                                <Accordion.Title><p>{tip.title}</p></Accordion.Title>
                                <Accordion.Content><p>{tip.tip}</p></Accordion.Content>
                            </Accordion.Panel>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Tips;
