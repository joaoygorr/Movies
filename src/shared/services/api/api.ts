import axios from "axios"

// const token = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")!) : null;

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    params: {
        language: "pt-br"
    },
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_READ_API}`
    }
})

// instance.interceptors.request.use(async (config) => {
//     console.log("opa", config);
    
//     return config;
// })