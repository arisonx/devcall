import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

interface IJwtPayload {
 id: string;
}

export async function middleware(request: NextRequest) {
 const token = request.cookies.get('devcall_auth');
 const secret = process.env.JWT_SECRET as string;

 const url = request.nextUrl.clone();
 

 if (!token) {
  return NextResponse.redirect(url.href);
 } 
  try {
   const { id } = verify(token.value, secret) as IJwtPayload;
   console.log("kkakakakakakakakakakak"); 
  } catch (err: any) {
   if (err.message === 'jwt malformed') {
    return NextResponse.redirect(url.href);
   }
  }
}

export const config = {
 matcher: '/call/:path*',
};
