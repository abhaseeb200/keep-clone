import axios from "axios";
import { store } from "../Config/store";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const { access_token, token_type } = store?.getState()?.auth;

        if (access_token) {
            config.headers["Authorization"] = `${token_type} ${access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
