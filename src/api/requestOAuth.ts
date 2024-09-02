import axios, { AxiosInstance } from "axios";
import { RequestResponse, RequestOAuthLoginParams, RequestOAuthUpdatePasswordData } from "../types";

// Axios Instance
const OAuthRequest: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000,
});

// Response
OAuthRequest.interceptors.response.use(
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

// Login
const OAuthLogin = (params: RequestOAuthLoginParams): Promise<RequestResponse> => {
    return OAuthRequest.post("/login", params);
};

// Logout
const OAuthLogout = (accessToken: string): Promise<RequestResponse> => {
    return OAuthRequest.request({
        headers: { Authorization: "Bearer " + accessToken },
        method: "get",
        url: "/logout",
    });
};

// Update Password
const OAuthUpdatePassword = (accessToken: string, data: RequestOAuthUpdatePasswordData): Promise<RequestResponse> => {
    return OAuthRequest.request({
        headers: { Authorization: "Bearer " + accessToken },
        method: "put",
        url: "/profile/updatePassword",
        data: data,
    });
};

// Load captcha
const OAuthCaptcha = (): Promise<RequestResponse> => {
    return OAuthRequest.request({
        method: "get",
        url: "/captcha",
    });
};

export { OAuthLogin, OAuthLogout, OAuthCaptcha, OAuthUpdatePassword };
