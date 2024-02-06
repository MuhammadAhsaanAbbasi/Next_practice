import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null)

    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET
    )

    const alg = "HS256"
    const jwt = await new jose.SignJWT({ email: body.email })
        .setProtectedHeader({ alg })
        .setExpirationTime("30s")
        .setIssuedAt()
        .sign(secret)
    cookies().set("token", jwt)

    return NextResponse.json({ message: "Login SuccessFull" })
}

import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag') as string
    revalidateTag(tag)
    return Response.json({ revalidated: tag, now: Date.now() })
}