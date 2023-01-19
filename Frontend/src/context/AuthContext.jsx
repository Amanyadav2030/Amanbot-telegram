import { createContext, useState } from "react";
export const AuthContext = createContext();
const Token = localStorage.getItem('token') || '';
function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(Token ? true : false);
    const [token, setToken] = useState(Token);
    const loginUser = (Token) => {
        setIsAuth(true);
        setToken(Token);
    }
    const logOutUser = () => {
        setIsAuth(false);
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={{ isAuth, token, loginUser, logOutUser }}>
            {children}
        </AuthContext.Provider>

    )

}

export default AuthContextProvider;
