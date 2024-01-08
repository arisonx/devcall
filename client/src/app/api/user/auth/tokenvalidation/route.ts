import { verify } from 'jsonwebtoken';

interface IJwtPayload {
 id: string;
}

export async function POST(request: Request) {
 const secret = process.env.JWT_SECRET as string;
 const authorizationHeader = request.headers.get('authorization')?.concat('');

 if (!authorizationHeader) {
  return new Response('', {
   status: 401,
   statusText: 'Unauthorized',
  });
 }

 try {
  const token = authorizationHeader?.split(' ')[1] as string;
  const { id } = verify(token, secret) as IJwtPayload;

  return new Response(id, {
   status: 200,
  });
 } catch (err: any) {
  if (err.message === 'jwt malformed') {
   return new Response('', {
    statusText: '',
    status: 400,
   });
  }
 }
}
