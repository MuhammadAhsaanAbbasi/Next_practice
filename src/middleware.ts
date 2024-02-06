import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    let isLoggedIn = true;

    let validatePath = ['/blog','/dashboard']

    if(!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url))
    }          
    if(isLoggedIn && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL('/blog', request.url))
    }          
}


export const config = {
    matcher: ["/dashboard"]
}