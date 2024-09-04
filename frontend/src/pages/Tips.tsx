import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";
import { Accordion } from "flowbite-react";

function Tips() {
    const [props, setProps] = useState({ page: "tips" });

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
                            <Accordion.Title className="font-bold">What is Flowbite?</Accordion.Title>
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
                        <Accordion.Panel>
                            <Accordion.Title className="font-bold">Is there a Figma file available?</Accordion.Title>
                            <Accordion.Content>
                                Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
                                has a design equivalent in our Figma file.
                                Check out the
                                <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                    Figma design system
                                </a>
                                based on the utility classes from Tailwind CSS and components from Flowbite.
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title className="font-bold">What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
                            <Accordion.Content>
                                The main difference is that the core components from Flowbite are open source under the MIT license, whereas
                                Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
                                components, whereas Tailwind UI offers sections of pages.
                                However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
                                technical reason stopping you from using the best of two worlds.
                                <ul className="list-disc pl-5 dark:text-gray-400">
                                    <li>
                                        <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                            Flowbite Pro
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://tailwindui.com/"
                                            rel="nofollow"
                                            className="text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            Tailwind UI
                                        </a>
                                    </li>
                                </ul>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Tips;
