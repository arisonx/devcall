import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    
 if (request.nextUrl.pathname === '/' && request.cookies.has('devcall_auth')) {
  return NextResponse.redirect(new URL('/call/select', request.url));
 }

 if (request.nextUrl.pathname === '/' && !request.cookies.has('devcall_auth')) {
  return NextResponse.next();
 }

 const token = request.cookies.get('devcall_auth');
 const mainPath = process.env.NEXT_PUBLIC_AUTH_CLIENT_URL as string;
 const url = new URL(mainPath);
 const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
 const pathUrl = `${apiUrl}/user/auth/tokenvalidation`;

 if (!token) {
  return NextResponse.redirect(url.href);
 } else {
  try {
   const checkToken = await fetch(pathUrl, {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${token.value}`,
    },
   });

   if (checkToken.status !== 200) {
    console.log(checkToken.status);
    return NextResponse.redirect(url.href);
   } else {
    NextResponse.next();
   }
  } catch (err: any) {
   return NextResponse.redirect(url.href);
  }
 }
}
export const config = {
 matcher: ['/call/:path*', '/'],
};
