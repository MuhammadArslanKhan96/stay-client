// app/api/referenced-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/prisma";


export async function GET(request: NextRequest) {
  try {
    const userId:any = request.nextUrl.searchParams.get("userId");
    if(!userId){
      return NextResponse.json({ message:"Invalid UserID" }, { status: 404 });
    }
    
    const referencedUsers = await prisma.user.findMany({ where:{
        referredBy: userId
    } });

    return NextResponse.json({ users: referencedUsers }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}