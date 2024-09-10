import { useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";

export default function Error() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col sm:w-[20%] space-y-4 w-[70%] mx-auto border p-8 my-[10%] bg-white shadow-md">
            <span>
                <h3 className="my-4">
                    Soul Connection
                </h3>
                <h1 className="text-4xl font-bold">404 Error</h1>
                <p>Page not found.</p>
            </span>
        </div>
    );
}