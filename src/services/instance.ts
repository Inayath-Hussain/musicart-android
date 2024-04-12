import axios, { AxiosResponse } from "axios";
import { baseURL } from "./URLs";
import { addAuthCookies, getAuthCookie } from "@src/utilities/storage/authTokens";


export const axiosInstance = axios.create({
    baseURL
})


axiosInstance.interceptors.request.use(config => {
    config.headers.set("Cookie", getAuthCookie() || "");

    return config;
})



export const saveAuthCookieFromResponse = (result: AxiosResponse) => {
    const cookie = result.headers["set-cookie"] ? result.headers["set-cookie"][0] : "";

    if (cookie) addAuthCookies(cookie)
}