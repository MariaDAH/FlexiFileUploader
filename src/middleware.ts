import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/services/auth'
import { PUBLIC_ROUTES } from '@/lib/routes';

export async function middleware(request: NextRequest) {

    const { nextUrl } = request;

    const session = await auth();
    const isAuthenticated = !!session?.user;

    console.log(JSON.stringify(request));

    console.log(isAuthenticated, session?.user?.name, nextUrl.pathname);

    const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname == "ROOT");

    if(!isPublicRoute && !isAuthenticated)
        return NextResponse.redirect(new URL('/', nextUrl));
}

//ToDo: Improve matcher
export const config = {
    matcher: ['/api/v1/:path*', '/home', '/analytics', '/uploader', '/profile']
}
