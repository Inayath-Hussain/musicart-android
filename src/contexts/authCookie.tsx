import { authCookieKey, getAuthCookie, removeAuthCookie } from "@src/utilities/storage/authTokens";
import { storage } from "@src/utilities/storage/storageInstance";
import { PropsWithChildren, createContext, useState } from "react";


interface Icontext {
    value: string
    logout: () => void

    loggedIn: boolean
}

export const authCookieContext = createContext<Icontext>({ value: "", logout: () => { }, loggedIn: false });



const AuthCookieContextProvide: React.FC<PropsWithChildren> = ({ children }) => {

    const [value, setValue] = useState(getAuthCookie() || "");
    const [loggedIn, setLoggedIn] = useState(getAuthCookie() ? true : false);

    storage.addOnValueChangedListener((key) => {
        if (key === authCookieKey) {
            const cookie = getAuthCookie()
            setValue(cookie || "")
            setLoggedIn(cookie ? true : false)
        }
    })

    const logout = () => {
        removeAuthCookie()
    }

    return (
        <authCookieContext.Provider value={{ value, logout, loggedIn }} >
            {children}
        </authCookieContext.Provider>
    )
}


export default AuthCookieContextProvide;