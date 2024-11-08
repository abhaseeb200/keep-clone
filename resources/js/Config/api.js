import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        
        if (auth?.access_token) {
            config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
