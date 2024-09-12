import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({ login: (userToken: any) => { }, logout: () => { } });


const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        } else {
            if (!document.location.href.includes("/Sign")) {
                document.location.href = "/Sign";
            }
        }
    }, []);

    const login = (userToken: string) => {
        localStorage.setItem("authToken", userToken);
        localStorage.setItem("isAuthenticated", "true");
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        setToken(null);
    };


    return (
        <AuthContext.Provider value={{ login, logout }}>
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
