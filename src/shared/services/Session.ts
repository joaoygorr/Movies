import { Instance } from "../../api/api";
import { ISession } from "@/shared/Interfaces";
import { Console } from "console";

const { baseUrl, key } = Instance;

const getToken = () => {
    const { baseUrl, key } = Instance;

    try {
        return fetch(`${baseUrl}/authentication/token/new?api_key=${key}`)
            .then(data => data.json());
    } catch (error) {
        console.log("🚀 ~ file: Session.ts:18 ~ getToken ~ error:", error)
    }
};


const postSession = (data: string) => {
    const dataToken = { request_token: data };

    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToken)
    };

    try {
        fetch(`${baseUrl}/authentication/session/new?api_key=${key}`, requestOptions)
    } catch (error) {
        console.log("🚀 ~ file: Session.ts:33 ~ postSession ~ error:", error);
    }
};

const postSessionWithLogin = (data: ISession) => {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    try {
        fetch(`${baseUrl}/authentication/token/validate_with_login?api_key=${key}`, requestOptions)
            .then(res => {
                if (res.ok) {
                    postSession(data.request_token)
                } 
                
            })

    } catch (error) {
        console.log("🚀 ~ file: Session.ts:40 ~ useEffect ~ error:", error);
    }
}


export const SessionService = {
    getToken,
    postSession,
    postSessionWithLogin
}