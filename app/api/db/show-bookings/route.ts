import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  const id: any = req.nextUrl.searchParams.get("id");
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: id,
      },
    });
    const userId = user?.id;
    const bookings = await prisma.api_bookings.findMany({
      where: {
        user_id: userId,
      },
      include: {
        api_hotels: true,
        api_hotel_rooms: true,
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not get bookings" },
      { status: 500 }
    );
  }
}
