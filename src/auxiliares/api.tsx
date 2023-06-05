import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

const api = axios.create ({
    //baseURL: "http://132.255.246.194:8090/api/",
    //baseURL: "https://localhost:44302/api/",
    //baseURL: "http://localhost:8090/api/",
    //baseURL: "https://132.255.246.194/api/",
    //baseURL: "http://132.255.246.194:8091/api/",
    baseURL:`${process.env.REACT_APP_API_BASEURL}/`,
    //timeout: 10000, // 10 segundos
})

api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;


