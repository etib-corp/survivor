import { useState } from "react";
import { SignIn } from "../components/Sign/SignIn";
import { SignUp } from "../components/Sign/SignUp";
import { Button } from "flowbite-react";

export default function Sign() {
    const [switcher, setSwitcher] = useState("sign-up");

    return (
        <div className="flex flex-col sm:w-[20%] space-y-4 w-[70%] mx-auto border p-8 my-[10%] bg-white shadow-md">
            <h1 className="text-center text-2xl">
                Soul Connection
            </h1>
            {switcher === "sign-up" && <SignUp />}
            {switcher === "sign-in" && <SignIn />}
            <Button className="bg-transparent text-gray-700 border-gray-700 enabled:hover:bg-gray-300 focus:ring-0" onClick={() => {
                if (switcher === "sign-up") {
                    setSwitcher("sign-in");
                } else {
                    setSwitcher("sign-up");
                }
            }}>
                {switcher === "sign-up" ? "Already have an account?" : "Don't have an account?"}
            </Button>
        </div>
    );
}