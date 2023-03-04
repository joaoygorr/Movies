//api
import { Instance } from "../../api/api";
// interface
import { ISession } from "../Interfaces/ISession";

const { baseUrl, key } = Instance;

const getToken = async () => {
    let token: any;
    const { baseUrl, key } = Instance;

    try {
        await fetch(`${baseUrl}/authentication/token/new?api_key=${key}`)
            .then(data => data.json())
            .then(json => token = json);
    } catch (error) {
        console.log("🚀 ~ file: Session.ts:18 ~ getToken ~ error:", error)
    }

    return token;
};


const postSession = async (data: string) => {
    const dataToken = { request_token: data };

    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToken)
    };

    try {
        await fetch(`${baseUrl}/authentication/session/new?api_key=${key}`, requestOptions);
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
        fetch(`${baseUrl}/authentication/token/validate_with_login?api_key=${key}`, requestOptions);
        console.log("login (postSessionWithLogin): ", requestOptions);
    } catch (error) {
        console.log("🚀 ~ file: Session.ts:40 ~ useEffect ~ error:", error);
    }
}


export const SessionService = {
    getToken,
    postSession,
    postSessionWithLogin
}