import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import store from "../stores";
import { clearToken } from "../stores/reducers/auth";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000,
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const state = store.getState();
        const token = state.auth.ACCESS_TOKEN;
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
            return config;
        }
        store.dispatch(clearToken());
        window.location.href = "/login";
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        if (response.status === 200 && response.data.code === 1) {
            return response.data;
        }
        return Promise.reject(new Error(response.data.message, response.data));
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
