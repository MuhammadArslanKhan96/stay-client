import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";
import { connect } from "http2";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  try {
    const newBooking = await prisma.booking.create({
      data: {
        // userId: reqBody.userId,
        // roomId: reqBody.roomId,
        // hotelId: reqBody.hotelId,
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
            id: reqBody.userId,
          },
        },
      },
    });
    console.log(newBooking);
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
    const bookingsCount = await prisma.booking.count({
      where: {
        userId: id,
      },
    });
    return NextResponse.json({ bookingsCount }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not get bookings" },
      { status: 500 }
    );
  }
}
