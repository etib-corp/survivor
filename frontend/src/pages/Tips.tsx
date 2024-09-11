import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Accordion, Button, ButtonGroup } from "flowbite-react";

import ETIBNavBar from "../components/ETIBNavBar";

import Tip from "../types/Tip";

import TipService from "../services/TipService";

import CryptoJS from "crypto-js";

function Tips() {
    const navigate = useNavigate();
    const [props, setProps] = useState({ page: "tips" });
    const [tips, setTips] = useState<Tip[]>([]);
    const [language, setLanguage] = useState(0);
    const [parsedTips, setParsedTips] = useState<{ id: number, title: string[], tip: string[] }[]>([]);
    const [id, setId] = useState(-1);
    const { register, handleSubmit, reset } = useForm<Tip>();

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const secretKey = 'etib';
            const bytes = CryptoJS.AES.decrypt(userInfo, secretKey);
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
        setParsedTips([]);
        TipService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setTips(response.data['hydra:member']);
                response.data['hydra:member'].map((tip: Tip) => {
                    let title = tip.title.split("||||");
                    let tipText = tip.tip.split("||||");
                    setParsedTips((parsedTips: any) => [...parsedTips, { id: tip.id, title: title, tip: tipText }]);
                });
            } else {
                console.log("Expected an array of tips but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    const onSubmit = (data: Tip) => {
        if (id == -2) {
            TipService.create(data).then(() => {
                window.location.reload();
            }).catch((e) => {
                console.log(e);
            })
        } else {
            TipService.update(id, data).then(() => {
                window.location.reload();
            }).catch((e) => {
                console.log(e);
            });
        }
        setId(-1);
        reset();
    };

    function translate() {
        if (language === 0) {
            return "FR";
        }
        if (language === 1) {
            return "EN";
        }
        if (language === 2) {
            return "ES";
        }
        if (language === 3) {
            return "ZH";
        }
    }

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <div className="flex flex-col p-5">
                <h1 className="text-5xl py-1">
                    Tips for Coaches
                </h1>
                {
                    id != -1 ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-row justify-between items-center">
                                <input type="text" className="w-1/2 border border-gray-400 p-1" placeholder="Title" defaultValue={parsedTips[id]?.title[language]} {...register("title", { required: true })} />
                                <input type="text" className="w-1/2 border border-gray-400 p-1" placeholder="Tip" defaultValue={parsedTips[id]?.tip[language]} {...register("tip", { required: true })} />
                                <select className="w-1/2 border border-gray-400 p-1" defaultValue={translate()} {...register("language", { required: true })} >
                                    <option value="FR">French</option>
                                    <option value="EN">English</option>
                                    <option value="ES">Spanish</option>
                                    <option value="ZH">Chinese</option>
                                </select>
                            </div>
                            <div className="flex items-end justify-end">
                                <ButtonGroup outline>
                                    <Button className="border border-gray-400" type="submit" >Save</Button>
                                    <Button className="border border-gray-400" onClick={() => setId(-1)}>Cancel</Button>
                                </ButtonGroup>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-row items-end justify-end">
                            <Button className="border border-gray-400" onClick={() => setId(-2)}>Add Tip</Button>
                        </div>
                    )
                }
                <div className="flex items-start justify-start">
                    <ButtonGroup outline>
                        <Button className="bg-white border border-gray-400" disabled={language === 0} onClick={() => setLanguage(0)}>
                            <img width={25} height={25} src="/fr.png"></img>
                        </Button>
                        <Button className="bg-white border border-gray-400" disabled={language === 1} onClick={() => setLanguage(1)}>
                            <img width={25} height={25} src="/en.png"></img>
                        </Button>
                        <Button className="bg-white border border-gray-400" disabled={language === 2} onClick={() => setLanguage(2)}>
                            <img width={25} height={25} src="/es.png"></img>
                        </Button>
                        <Button className="bg-white border border-gray-400" disabled={language === 3} onClick={() => setLanguage(3)}>
                            <img width={25} height={25} src="/cn.png"></img>
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="flex justify-center pt-10">
                    <Accordion className="w-full">
                        {parsedTips.map((tip, index) => (
                            <Accordion.Panel key={tip.id}>
                                <Accordion.Title className="flex flex-row justify-between items-center">
                                    <p>
                                        {tip.title[language]}
                                    </p>
                                    <div className="flex items-start justify-start">
                                        <ButtonGroup>
                                            <Button className="bg-pinkT" onClick={() => setId(tip.id)}>
                                                Edit
                                            </Button>
                                            <Button className="bg-pinkT" onClick={() => {
                                                TipService.deleteID(tip.id)
                                                window.location.reload()
                                            }}>
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content>
                                    <p>{tip.tip[language]}</p>
                                </Accordion.Content>
                            </Accordion.Panel>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div >
    );
}

export default Tips;
