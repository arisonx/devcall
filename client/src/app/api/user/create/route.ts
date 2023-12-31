import { prisma } from '../../../../lib/prisma/prisma';
import { UserData } from './interface';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
 const { name }: UserData = await request.json();

 try {
  const newUser = await prisma.user.create({
   data: {
    name,
   },
  });

  const secret = process.env.JWT_SECRET as string;
  const token = sign({ id: newUser.id }, secret, {
   expiresIn: '7d',
  });

  cookies().set({
   name: 'devcall_auth',
   value: token,
   httpOnly: true,
   path: '/',
   maxAge: 60 * 60 * 24 * 7, // 2 days,
  });

  return new Response(token, {
   status: 201,
  });
 } catch (err) {
  return new Response('Internal server Error', {
   status: 500,
  });
 }
}
