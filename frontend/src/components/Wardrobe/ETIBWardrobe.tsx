import { Button, Carousel } from "flowbite-react";

export default function ETIBWardrobe() {
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
                                You have total 5 hats.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                            </Carousel>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Top clothes
                            </h1>
                            <p>
                                You have total 5 top clothes.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                            </Carousel>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Bottom clothes
                            </h1>
                            <p>
                                You have total 5 bottom clothes.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                            </Carousel>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="flex flex-col bg-white border py-4 px-4 shadow-md sm:h-[60%] w-[33%]">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Shoes
                            </h1>
                            <p>
                                You have total 5 shoes.
                            </p>
                        </div>
                        <div className="h-32 w-32 sm:h-56 sm:w-56">
                            <Carousel slide={false}>
                                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}