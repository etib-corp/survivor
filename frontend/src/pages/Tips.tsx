import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Accordion, Avatar, Button, ButtonGroup, TextInput } from "flowbite-react";

import ETIBNavBar from "../components/ETIBNavBar";

import Tip from "../types/Tip";

import TipService from "../services/TipService";

import CryptoJS from "crypto-js";
import { buttonOutlineTheme, buttonTheme, textInputTheme } from "../themes";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";

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
            <div className="flex flex-col">
                <div className="grid grid-cols-1 md:flex md:flex-row md:mt-8 ml-4 mr-4">
                    <div className="flex flex-col space-y-4 w-full">
                        <h1 className="text-4xl font-bold py-1">
                            Tips for Coaches
                        </h1>
                        <div className="flex justify-between w-full">
                            <div className="flex">
                                <ButtonGroup outline>
                                    <Button theme={buttonOutlineTheme} color="default" disabled={language === 0} onClick={() => setLanguage(0)}>
                                        <Avatar size="xs" img="/fr.png" />
                                    </Button>
                                    <Button theme={buttonOutlineTheme} color="default" disabled={language === 1} onClick={() => setLanguage(1)}>
                                        <Avatar size="xs" img="/en.png" />
                                    </Button>
                                    <Button theme={buttonOutlineTheme} color="default" disabled={language === 2} onClick={() => setLanguage(2)}>
                                        <Avatar size="xs" img="/es.png" />
                                    </Button>
                                    <Button theme={buttonOutlineTheme} color="default" disabled={language === 3} onClick={() => setLanguage(3)}>
                                        <Avatar size="xs" img="/cn.png" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                            {
                                id != -1 ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex space-x-4 justify-start">
                                            <TextInput theme={textInputTheme} type="text" className="w-1/2" placeholder="Title" defaultValue={parsedTips[id]?.title[language]} {...register("title", { required: true })} />
                                            <TextInput theme={textInputTheme} type="text" className="w-1/2" placeholder="Tip" defaultValue={parsedTips[id]?.tip[language]} {...register("tip", { required: true })} />
                                            <select
                                                className="w-1/2 border rounded-md p-2 border-gray-400 enabled:focus:border-pinkT enabled:focus:ring-pinkT text-gray-500 bg-gray-100"
                                                defaultValue={translate()} {...register("language", { required: true })} >
                                                <option value="FR">
                                                    French
                                                </option>
                                                <option value="EN">
                                                    English
                                                </option>
                                                <option value="ES">
                                                    Spanish
                                                </option>
                                                <option value="ZH">
                                                    Chinese
                                                </option>
                                            </select>
                                            <ButtonGroup outline>
                                                <Button theme={buttonTheme} color="default" className="border border-gray-400" type="submit" >
                                                    Save
                                                </Button>
                                                <Button theme={buttonOutlineTheme} color="default" className="border border-gray-400" onClick={() => setId(-1)}>
                                                    Cancel
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex flex-row">
                                        <Button theme={buttonTheme} className="py-1" color="default" onClick={() => setId(-2)}>
                                            <HiPlus className="h-5 w-5 mr-5" />
                                            Add Tip
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-10 mx-4">
                <Accordion className="w-full">
                    {parsedTips.map((tip, index) => (
                        <Accordion.Panel key={tip.id}>
                            <Accordion.Title >
                                <div className="flex flex-row space-x-4 my-auto">
                                    <div className="">
                                        <ButtonGroup>
                                            <Button theme={buttonTheme} color="default" onClick={() => setId(tip.id)}>
                                                <HiPencil className="h-5 w-5" />
                                            </Button>
                                            <Button theme={buttonOutlineTheme} color="default" onClick={() => {
                                                TipService.deleteID(tip.id)
                                                window.location.reload()
                                            }}>
                                                <HiTrash className="h-5 w-5" />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <p className="flex my-auto">
                                        {tip.title[language]}
                                    </p>
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
    );
}

export default Tips;
