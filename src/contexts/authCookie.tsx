import { updateCart } from "@src/store/slices/cartItems";
import { updateUserName } from "@src/store/slices/userSlice";
import { authCookieKey, getAuthCookie, removeAuthCookie } from "@src/utilities/storage/authTokens";
import { storage } from "@src/utilities/storage/storageInstance";
import { PropsWithChildren, createContext, useState } from "react";
import { useDispatch } from "react-redux";


interface Icontext {
    value: string
    logout: () => void

    loggedIn: boolean
}

export const authCookieContext = createContext<Icontext>({ value: "", logout: () => { }, loggedIn: false });



const AuthCookieContextProvide: React.FC<PropsWithChildren> = ({ children }) => {

    const [value, setValue] = useState(getAuthCookie() || "");
    const [loggedIn, setLoggedIn] = useState(getAuthCookie() ? true : false);

    const dispatch = useDispatch();

    storage.addOnValueChangedListener((key) => {
        if (key === authCookieKey) {
            const cookie = getAuthCookie()
            setValue(cookie || "")
            setLoggedIn(cookie ? true : false)
        }
    })

    const logout = () => {
        // clear cart
        dispatch(updateCart(0))
        // clear name
        dispatch(updateUserName(""))
        removeAuthCookie();

    }

    return (
        <authCookieContext.Provider value={{ value, logout, loggedIn }} >
            {children}
        </authCookieContext.Provider>
    )
}


export default AuthCookieContextProvide;