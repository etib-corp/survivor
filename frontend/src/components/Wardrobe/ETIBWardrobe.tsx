import axios from "axios";

import { useEffect, useState } from "react";

import { HiChevronDoubleRight } from "react-icons/hi";

import { Avatar, Button, Label } from "flowbite-react";

import Clothe from "../../types/Clothe";
import ClotheService from "../../services/ClotheService";

import { buttonOutlineTheme, buttonTheme } from "../../themes";

function getClotheInBase64(clothe: Clothe | null) {
    if (!clothe) {
        return "kbo.png";
    }
    return process.env.REACT_APP_API_URL + "/clothes/" + "base64/" + clothe.id;
}

function getURL(clothe: Clothe | null) {
    if (!clothe) {
        return "https://flowbite.com/docs/images/carousel/carousel-3.svg";
    }
    return process.env.REACT_APP_PICTURES_URL + "/clothes/" + clothe.id + ".png";
}

async function downloadImage(clothe: Clothe | null) {
    if (!clothe) {
        return;
    }
    try {
        const url = getClotheInBase64(clothe);
        const response = await axios.get(url);
        const base64 = response.data; // Assuming the response contains the base64 string directly
        const blob = await fetch(`data:image/png;base64,${base64.clothe}`).then(res => res.blob());
        const objectUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = clothe.id + ".png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
        console.error('Failed to download the ressources.', error);
    }
};

export default function ETIBWardrobe() {
    const [clothes, setClothes] = useState<Clothe[]>([]);
    const hats = clothes.filter((clothe) => clothe.type === "hat/cap");
    const topClothes = clothes.filter((clothe) => clothe.type === "top");
    const bottomClothes = clothes.filter((clothe) => clothe.type === "bottom");
    const shoes = clothes.filter((clothe) => clothe.type === "shoes");

    const [type, setType] = useState(0);

    useEffect(() => {
        async function getClothes() {
            await ClotheService.getAll().then((response: any) => {
                if (Array.isArray(response.data['hydra:member'])) {
                    setClothes(response.data['hydra:member']);
                } else {
                    console.log("Expected an array of clothes but got:", response.data);
                }
            }).catch((e) => {
                console.log(e);
            });
        }

        getClothes();
    }, []);

    const [filter, setFilter] = useState(hats);
    const [selectedHat, setSelectedHat] = useState<Clothe | null>(null);
    const [selectedTop, setSelectedTop] = useState<Clothe | null>(null);
    const [selectedBottom, setSelectedBottom] = useState<Clothe | null>(null);
    const [selectedShoes, setSelectedShoes] = useState<Clothe | null>(null);

    function handleClotheClick(clothe: Clothe) {
        switch (type) {
            case 0:
                setSelectedHat(clothe);
                break;
            case 1:
                setSelectedTop(clothe);
                break;
            case 2:
                setSelectedBottom(clothe);
                break;
            case 3:
                setSelectedShoes(clothe);
                break;
        }
    }

    return (
        <div className="flex flex-col space-y-8 pb-40">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold py-1">
                        Wardrobe
                    </h1>
                    <p>
                        Test and visualize clothes combinations.
                    </p>
                </div>
                <div className="mt-3 md:mt-auto mb-auto flex space-x-4">
                    <Button href="#customizer" theme={buttonOutlineTheme} color="default">
                        Let's start !
                    </Button>
                    <Button onClick={() => {
                        downloadImage(selectedHat);
                        downloadImage(selectedTop);
                        downloadImage(selectedBottom);
                        downloadImage(selectedShoes);
                    }}
                        theme={buttonTheme}
                        color="default"
                        disabled={!(selectedHat || selectedTop || selectedBottom || selectedShoes)}>
                        Export
                    </Button>
                </div>
            </div>
            <div id="customizer" className="flex justify-around">
                <div className="flex flex-col bg-white rounded-md space-y-4 w-[30%]">
                    <div className="flex flex-col">
                        <Avatar img={getURL(selectedHat)} size="xl" />
                        <Button className="h-10 my-auto mx-auto w-[25%]" theme={buttonOutlineTheme} color="default" onClick={() => { setFilter(hats); setType(0); }}>
                            <Label>
                                Hat
                            </Label>
                            <HiChevronDoubleRight className="h-5 w-5 my-auto" />
                        </Button>
                    </div>
                    <div className="flex flex-col">
                        <Avatar img={getURL(selectedTop)} size="xl" />
                        <Button className="h-10 my-auto mx-auto w-[25%]" theme={buttonOutlineTheme} color="default" onClick={() => { setFilter(topClothes); setType(1); }}>
                            <Label>
                                Top
                            </Label>
                            <HiChevronDoubleRight className="h-5 w-5 my-auto" />
                        </Button>
                    </div>
                    <div className="flex flex-col">
                        <Avatar img={getURL(selectedBottom)} size="xl" />
                        <Button className="h-10 my-auto mx-auto w-[25%]" theme={buttonOutlineTheme} color="default" onClick={() => { setFilter(bottomClothes); setType(2); }}>
                            <Label>
                                Bottom
                            </Label>
                            <HiChevronDoubleRight className="h-5 w-5 my-auto" />
                        </Button>
                    </div>
                    <div className="flex flex-col">
                        <Avatar img={getURL(selectedShoes)} size="xl" />
                        <Button className="h-10 my-auto mx-auto w-[25%]" theme={buttonOutlineTheme} color="default" onClick={() => { setFilter(shoes); setType(3); }}>
                            <Label>
                                Shoes
                            </Label>
                            <HiChevronDoubleRight className="h-5 w-5 my-auto" />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col border mr-8 w-[30%] rounded-md my-auto bg-pinkB">
                    <div className="text-xl border p-4 bg-pinkB">
                        Choose your clothes
                    </div>
                    <div className="flex flex-wrap space-y-4 p-4 overflow-auto h-96">
                        {filter.map((clothe: Clothe) => (
                            <span onClick={() => { handleClotheClick(clothe) }} className="flex w-[50%] justify-center my-auto px-2">
                                <img
                                    src={process.env.REACT_APP_PICTURES_URL + "/clothes/" + clothe.id + ".png"} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}