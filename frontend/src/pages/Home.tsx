import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ETIBNavBar from "../components/ETIBNavBar";
import Statistics from "./Statistics";

import CryptoJS from "crypto-js";

function Home() {
    const navigate = useNavigate();
    const [props, setProps] = useState({ page: "dashboard" });

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const secretKey = 'etib';
            const bytes = CryptoJS.AES.decrypt(userInfo, secretKey);
            const decryptedUserInfo = bytes.toString(CryptoJS.enc.Utf8);
            const parsedUserInfo = JSON.parse(decryptedUserInfo);

            console.log(parsedUserInfo);

            if (parsedUserInfo.roles[0] === "ROLE_CUSTOMER") {
                navigate("/Wardrobe");
            } if (parsedUserInfo.roles[0] === "ROLE_COACH") {
                navigate("/Customers");
            }
        } catch (error) {
            console.error("Parsing error:", error);
        }
    }, []);

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps} />
            <Statistics />
        </div>
    );
}

export default Home;