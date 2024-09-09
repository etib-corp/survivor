import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const PrivateRoutes = () => {
    useEffect(() => {
        async function fetchToken() {
            await axios.get(process.env.REACT_APP_API_URL + "/token_check", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                }
            }).catch((response) => {
                if (response.response.status === 401) {
                    localStorage.setItem("isAuthenticated", "false");
                }
            });
        }

        fetchToken();
    }, []);
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? <Outlet /> : <Navigate to="/Sign" />;
};

export default PrivateRoutes;
