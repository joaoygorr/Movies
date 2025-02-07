import type { Metadata } from "next";
import "./styles/globals.css";
import { Header } from "./shared/components/header/header";
import "primeicons/primeicons.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
                <Header />
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    {children}
                </SkeletonTheme>
            </body>
        </html>
    );
}
