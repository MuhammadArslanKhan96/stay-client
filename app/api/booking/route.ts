import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";
import { connect } from "http2";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  // console.log("Request Body...");
  // console.log(reqBody);
  try {
    //checking if already exists...
    const user = await prisma.user.findUnique({
      where:{
        email:reqBody.userEmail
      }
    });

    const userId = user?.id;
    const roomId = reqBody.roomId;
    const hotelId = reqBody.hotelId;

    const alreadyExists = await prisma.booking.findFirst({
      where :{
        userId,
        roomId,
        hotelId
      }
    })

    if(alreadyExists){
      return NextResponse.json(
        { message: "Already Booked" },
        { status: 409 }
      );
    }
    
    const newBooking = await prisma.booking.create({
      data: {
        startTime: reqBody.startTime,
        endTime: reqBody.endTime,
        duration: reqBody.duration,
        price: reqBody.price,
        transactionHash: reqBody.hash,
        room: {
          connect: {
            id: reqBody.roomId,
          },
        },
        hotel: {
          connect: {
            id: reqBody.hotelId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!newBooking) {
      return NextResponse.json(
        { error: "could not create booking" },
        { status: 502 }
      );
    }
    return NextResponse.json({ newBooking }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not create booking" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const id: any = req.nextUrl.searchParams.get("id");
  try {
    const user = await prisma.user.findFirst({
      where:{
        email:id
      }
    })
    const userId = user?.id;
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
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