import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
 const cookies = request.cookies;
 const cookiesession = cookies.get('session');

 if (!cookiesession?.value && request.nextUrl.pathname !== '/') {
  return NextResponse.redirect(new URL('/', request.url));
 }

 if (cookiesession?.value && request.nextUrl.pathname === '/') {
  return NextResponse.redirect(new URL('/call/select', request.url));
 }

 NextResponse.redirect(new URL('/call/select', request.url));

 return NextResponse.next();
}

export const config = {
 matcher: ['/call/:path*', '/'],
};
