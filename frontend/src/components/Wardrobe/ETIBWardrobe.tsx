import { useEffect, useState } from "react";

import { Button, Carousel } from "flowbite-react";

import Clothe from "../../types/Clothe";
import ClotheService from "../../services/ClotheService";

export default function ETIBWardrobe() {
    const [clothes, setClothes] = useState<Clothe[]>([]);
    useEffect(() => {
        ClotheService.getAll().then((response: any) => {
            if (Array.isArray(response.data['hydra:member'])) {
                setClothes(response.data['hydra:member']);
            } else {
                console.log("Expected an array of clothes but got:", response.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    const hats = clothes.filter((clothe) => clothe.type === "hat/cap");
    const topClothes = clothes.filter((clothe) => clothe.type === "top");
    const bottomClothes = clothes.filter((clothe) => clothe.type === "bottom");
    const shoes = clothes.filter((clothe) => clothe.type === "shoes");
    return (
        <div className="flex flex-col space-y-56">
            <div className="grid grid-cols-1 md:flex md:flex-row justify-between md:mt-8 ml-4 mr-4">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold py-1">
                        Wardrobe
                    </h1>
                    <p>
                        Test and visualize clothes combinations.
                    </p>
                </div>
                <div className="mt-3 md:mt-auto mb-auto">
                    <Button href="#customizer" className="bg-blueT">
                        Let's start !
                    </Button>
                </div>
            </div>
            <div id="customizer" className="flex justify-center pb-20">
                <div className="flex flex-col bg-white rounded-md space-y-4">
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Hats
                            </h1>
                            <p>
                                You have total {hats.length} hats.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                {hats.map((hat) => (
                                    <img src={process.env.REACT_APP_PICTURES_URL + "/clothes/" + hat.id + ".png"} alt="hat" />
                                )
                                )}
                            </Carousel>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Top clothes
                            </h1>
                            <p>
                                You have total {topClothes.length} top clothes.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                {topClothes.map((top) => (
                                    <img src={process.env.REACT_APP_PICTURES_URL + "/clothes/" + top.id + ".png"} alt="top" />
                                )
                                )}
                            </Carousel>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Bottom clothes
                            </h1>
                            <p>
                                You have total {bottomClothes.length} bottom clothes.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                {bottomClothes.map((bottom) => (
                                    <img src={process.env.REACT_APP_PICTURES_URL + "/clothes/" + bottom.id + ".png"} alt="bottom" />
                                )
                                )}
                            </Carousel>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Shoes
                            </h1>
                            <p>
                                You have total {shoes.length} shoes.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                {shoes.map((shoe) => (
                                    <img src={process.env.REACT_APP_PICTURES_URL + "/clothes/" + shoe.id + ".png"} alt="shoe" />
                                )
                                )}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}