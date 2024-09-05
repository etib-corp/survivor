import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ isAuthenticated: false, login: (userToken: any) => {}, logout: () => {} });

const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [token, setToken] = useState(null);
    const login = (userToken: any) => {
        setToken(userToken);
    };
    const logout = () => {
        setToken(null);
    };
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;