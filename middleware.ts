import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /products/1)
    const pathname = request.nextUrl.pathname;

    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = ['pt-BR', 'en-US'].every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        // Get the locale from the cookie or default to pt-BR
        const locale = request.cookies.get('NEXT_LOCALE')?.value || 'pt-BR';

        // Redirect to the locale-prefixed path
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};