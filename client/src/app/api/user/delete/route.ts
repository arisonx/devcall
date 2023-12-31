import { prisma } from '../../../../lib/prisma/prisma';

import { verify } from 'jsonwebtoken';

interface IJwtPayload {
 id: string;
}

export async function DELETE(request: Request) {
 const authorizationHeader = request.headers.get('authorization')?.concat('');
 if (!authorizationHeader) {
  return new Response('', {
   status: 401,
   statusText: 'Unauthorized',
  });
 }

 try {
  const token = authorizationHeader?.split(' ')[1] as string;

  const secret = process.env.JWT_SECRET as string;

  const { id } = verify(token, secret) as IJwtPayload;

  const userExists = await prisma.user.findFirst({
   where: { id: id },
  });

  if (userExists?.id) {
   try {
    await prisma.user.delete({
     where: { id: id },
    });
    return new Response('', {
     status: 200,
    });
   } catch (err) {
    return new Response('', {
     status: 500,
     statusText: 'Internal Server Error',
    });
   }
  } else {
   return new Response('', {
    status: 404,
   });
  }
 } catch (err: any) {
  if (err.message === 'invalid token') {
   return new Response(err.message, {
    status: 400,
    statusText: 'Invalid token',
   });
  }
  return new Response('', {
   status: 500,
   statusText: 'Internal Server Error',
  });
 }
}
