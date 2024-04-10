import axios from "axios";
import { baseURL } from "./URLs";


export const axiosInstance = axios.create({
    baseURL
})
