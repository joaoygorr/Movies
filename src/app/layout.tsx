import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import "primeicons/primeicons.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppProvider } from "@/shared/context/context";
import { ErrorBoundary } from "@/shared/components/errorBoundary/ErrorBoundary";
import { Header } from "@/shared/components/header/header";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "CineScope - Movie & TV Show Discovery",
    description: "Discover your favorite movies and TV shows with CineScope",
    formatDetection: {
        telephone: false,
    },
    icons: [
        { rel: "icon", url: "/favicon.ico" },
    ],
};

export const viewport: Viewport = {
    themeColor: "#1e40af",
};

function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <head>
                <meta name="theme-color" content="#1e40af" />
            </head>
            <body>
                <ErrorBoundary>
                    <AppProvider>
                        <Header />
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            {children}
                        </SkeletonTheme>
                    </AppProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}

export default RootLayout;
