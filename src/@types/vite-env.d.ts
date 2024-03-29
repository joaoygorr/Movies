/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string,
    readonly VITE_KEY_API: string,
    readonly VITE_TOKEN_READ_API: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
