// Here I create axiosInstance

import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com/"
});

axiosInstance.interceptors.request.use(
    async function (config) {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token !== null || token !== undefined) {
            config.headers["x-access-token"] = token; // Here I pass token 
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);


export default axiosInstance;  