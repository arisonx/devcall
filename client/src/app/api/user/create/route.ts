import { prisma } from "../../../../lib/prisma/prisma";
import { UserData } from "./interface";
import{sign} from "jsonwebtoken"

export async function POST(request: Request) {
  const { name }: UserData = await request.json();

  try {
    const newUser =  await prisma.user.create({
      data: {
        name,
      },
    });

    const secret =  process.env.JWT_SECRET as string;
    console.log(secret);
    const token = sign({id:newUser.id}, secret, {
      expiresIn:'7d'
    })

    return new Response(token, {
      status: 201,
    });
  } catch (err) {
    return new Response("Internal server Error", {
      status: 500,
    });
  }
}
