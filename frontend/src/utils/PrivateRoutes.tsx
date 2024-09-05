import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/Sign" />;
};

export default PrivateRoutes;
