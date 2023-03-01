export class Session {
    username: string;
    password: string;
    request_token: string | undefined;

    constructor(username: string, password: string, request_token: string | undefined) {
        this.username = username;
        this.password = password;
        this.request_token = request_token;
    }
}