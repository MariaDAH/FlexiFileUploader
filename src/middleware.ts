import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/services/auth'
import { PUBLIC_ROUTES, SIGNUP } from '@/lib/routes';

export async function middleware(request: NextRequest) {

    const { nextUrl } = request;

    const session = await auth();
    const isAuthenticated = !!session?.user;

    const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname == "ROOT");
    const isSIGNUP = (nextUrl.pathname === SIGNUP) ? true : false;

    if(!isPublicRoute && !isAuthenticated)
        return NextResponse.redirect(new URL('/', nextUrl));
}

//ToDo: Improve matcher
export const config = {
    matcher: ['/api/v1/:path*', '/home', '/analytics', '/uploader', '/profile']
}
