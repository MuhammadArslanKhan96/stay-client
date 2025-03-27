import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const hotels = await prisma.hotels.findMany({
      take: 10,
      include: {
        HotelRooms: true,
        HotelImages: true,
      },
    });

    return NextResponse.json({ hotels }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not get bookings" },
      { status: 500 }
    );
  }
}
// export async function GET(req: NextRequest) {
//   const id: any = req.nextUrl.searchParams.get("id");
//   try {
//     const bookingsCount = await prisma.booking.count({
//       where: {
//         userId: id,
//       },
//     });
//     return NextResponse.json({ bookingsCount }, { status: 200 });
//   } catch (error: any) {
//     console.log(error.message);
//     return NextResponse.json(
//       { error: "could not get bookings" },
//       { status: 500 }
//     );
//   }
// }
