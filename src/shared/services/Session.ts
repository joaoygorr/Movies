import { useEffect, useState } from "react";
//api
import { Instance } from "../../api/api";
// interface
import { IToken } from "../Interfaces/IToken";
import { ISession } from "../Interfaces/ISession";

function getToken() {
    const [token, setToken] = useState<IToken>();

    // useEffect(() => {
    //     async () => {
    //         try {
    //             const response = await fetch(`${Instance.baseUrl}/authentication/token/new?api_key=${Instance.key}`);
    //             const json = await response.json();
    //             setToken(json);
    //         } catch (error) {
    //             console.log("🚀 ~ file: Session.ts:9 ~ useEffect ~ error:", error);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        try {
            fetch(`${Instance.baseUrl}/authentication/token/new?api_key=${Instance.key}`)
                .then(res => res.json())
                .then(json => setToken(json));
        } catch (error) {
            console.log("🚀 ~ file: Session.ts:9 ~ useEffect ~ error:", error);
        }
    }, []);

    return token;
};

function postSession(data: ISession) {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.parse(data)
    }

    useEffect(() => {
        try {
            fetch(`${Instance.baseUrl}/authentication/token/validate_with_login?api_key=${Instance.key}`, requestOptions)
        } catch (error) {
            console.log("🚀 ~ file: Session.ts:40 ~ useEffect ~ error:", error)
        }
    }, [])
}


export const SessionService = {
    getToken,
    postSession
}