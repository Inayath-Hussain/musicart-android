import { storage } from "./storageInstance"

export const authCookieKey = "authCookie"

export const addAuthCookies = (cookie: string) => {
    storage.set(authCookieKey, cookie);
}


export const getAuthCookie = () => {
    return storage.getString(authCookieKey)
}


export const removeAuthCookie = () => {
    return storage.delete(authCookieKey)
}