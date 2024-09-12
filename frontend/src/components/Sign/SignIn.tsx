import axios from "axios";

import { useNavigate } from "react-router-dom";

import { Button, Label, TextInput } from "flowbite-react";

import { useAuth } from "../AuthContext";

import CryptoJS from "crypto-js";

export function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        const email = event.target.email2.value;
        const password = event.target.password2.value;

        if (email === "" || password === "") {
            return;
        }

        axios.post(process.env.REACT_APP_API_URL + "/login", { email, password }).then((response) => {
            const token = response.data.token;
            const data = response.data.data;

            const jsonString = JSON.stringify(data);
            const encryptedData = CryptoJS.AES.encrypt(jsonString, process.env.REACT_APP_SECRET_KEY || "").toString();

            login(token);
            localStorage.setItem("authToken", token);
            localStorage.setItem("userData", encryptedData);
            navigate("/Home");
        }).catch((e) => {
            alert("Invalid email or password");
        });
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email2" value="Your email" />
                </div>
                <TextInput id="email2" type="email" placeholder="name@soulconnection.com" required className="enabled:border-pinkT" />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2" value="Your password" />
                </div>
                <TextInput id="password2" type="password" required shadow className="focus:ring-1 focus:ring-gray-700" />
            </div>
            <div>
            </div>
            <Button className="bg-pinkT enabled:hover:bg-gray-300 focus:ring-1 focus:ring-gray-700" type="submit">Sign In</Button>
        </form>
    );
}
