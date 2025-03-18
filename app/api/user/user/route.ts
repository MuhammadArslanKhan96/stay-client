import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const email:any = req.nextUrl.searchParams.get("email");
    console.log("Email is, ", email);
        
    const user = await prisma.user.findUnique({
       where:{
        email
       }
    });
    return NextResponse.json({ referralCode: user?.referralCode });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not get bookings" },
      { status: 500 }
    );
  }
}
