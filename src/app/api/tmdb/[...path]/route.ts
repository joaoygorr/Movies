import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_READ_API_TOKEN;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const endpoint = "/" + path.join("/");
    const searchParams = request.nextUrl.searchParams;

    const url = new URL(endpoint, TMDB_BASE_URL);
    searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
    });

    try {
        const response = await fetch(url.toString(), {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${TMDB_TOKEN}`
            },
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: `TMDB API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[TMDB Proxy]", error);
        return NextResponse.json(
            { message: "Failed to fetch from TMDB" },
            { status: 502 }
        );
    }
}
