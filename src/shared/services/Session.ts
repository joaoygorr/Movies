import { useCallback, useEffect, useState } from "react";
//api
import { Instance } from "../../api/api";
// interface
import { IToken } from "../Interfaces/IToken";
import { ISession } from "../Interfaces/ISession";


const { baseUrl, key } = Instance;

const getToken = useCallback(async () => {
    
})


const postSession = (data: string) => {
    const dataToken = { request_token: data };
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToken)
    }

    useEffect(() => {
        try {
            fetch(`${baseUrl}/authentication/session/new?api_key=${key}`, requestOptions);
        } catch (error) {
            console.log("🚀 ~ file: Session.ts:40 ~ useEffect ~ error:", error);
        }
    }, [])
}

const postSessionWithLogin = (data: ISession) => {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    useEffect(() => {
        try {
            fetch(`${baseUrl}/authentication/token/validate_with_login?api_key=${key}`, requestOptions);
        } catch (error) {
            console.log("🚀 ~ file: Session.ts:40 ~ useEffect ~ error:", error);
        }
    }, []);
}


export const SessionService = {
    getToken,
    postSession,
    postSessionWithLogin
}