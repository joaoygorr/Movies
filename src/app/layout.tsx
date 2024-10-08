import type { Metadata } from "next";
import "./styles/globals.css";
import { Header } from "./shared/components/header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primeicons/primeicons.css";
import "react-lazy-load-image-component/src/effects/blur.css";

export const metadata: Metadata = {
    title: "Movie"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body>
                <ToastContainer />
                <Header />
                {children}
            </body>
        </html>
    );
}
