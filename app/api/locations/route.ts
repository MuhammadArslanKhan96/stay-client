import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";


export async function GET(req: NextRequest) {
  try {
        
    const locations = await prisma.hotel.findMany({
       select:{
        city:true
       },
       distinct: ['city']
      });
    return NextResponse.json({ locations });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not get bookings" },
      { status: 500 }
    );
  }
}
