import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ETIBNavBar from "../components/ETIBNavBar";
import Statistics from "./Statistics";

function Home() {
    const navigate = useNavigate();
    const [props, setProps] = useState({ page: "dashboard" });

    const userInfo: any = localStorage.getItem("userData") || "";

    useEffect(() => {
        try {
            const parsedUserInfo = JSON.parse(userInfo);

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