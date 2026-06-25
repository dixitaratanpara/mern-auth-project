import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(() => {

        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;

    });

    return (

        <AuthContext.Provider
            value={{
                token,
                setToken,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export default AuthProvider;