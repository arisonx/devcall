import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers"
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookiesStore = request.cookies

    console.log("Cookies"+cookiesStore)


  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/chat/:path*',
}