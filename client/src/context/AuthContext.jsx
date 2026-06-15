import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      user,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;