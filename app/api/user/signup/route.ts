import prisma from "@/prisma/prisma";
import { createUser, getUserByEmail } from "@/util/services/user";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const isUser = await prisma.user.findUnique({
    where: {
      email: reqBody.email,
    },
  });
  console.log(isUser);
  if (!isUser) {
    try {
      // const newUser = await createUser(reqBody);
      const newUser = await prisma.user.create({
        data: {
          email: reqBody.email,
          // password: reqBody.password,
          username: reqBody.username,
          wallet: reqBody.wallet,
        },
      });
      if (newUser) {
        console.log("user created: ", newUser);
        return NextResponse.json(newUser, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "error creating user" },
          { status: 500 }
        );
        throw new Error();
      }
    } catch (error: any) {
      console.log("error creating user: " + error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: "A user with this email already exist" },
      { status: 400 }
    );
  }
}
