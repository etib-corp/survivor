import { useState } from "react";
import { SignIn } from "../components/Sign/SignIn";

export default function Sign() {
    const [switcher, setSwitcher] = useState("sign-up");

    return (
        <div className="flex flex-col sm:w-[20%] space-y-4 w-[70%] mx-auto border p-8 my-[10%] bg-white shadow-md">
            <h1 className="text-center text-2xl">
                Soul Connection
            </h1>
            <SignIn />
        </div>
    );
}