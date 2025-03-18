import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

// API to check for the bookings...
export async function GET(req: NextRequest) {
  try {
    // Query to check in and check out...
    const location: any = req.nextUrl.searchParams.get("location");
    const checkInDate: any = new Date(req.nextUrl.searchParams.get("checkIn") as string).toISOString();
    const checkOutDate: any = new Date(req.nextUrl.searchParams.get("checkOut") as string).toISOString();
    const guest: any = req.nextUrl.searchParams.get("guest");
    
    const availableRooms = await prisma.room.findMany({
      where: {
        hotel:{
          city:location
        },
        bookings: {
          none: { // Filter rooms that have no overlapping bookings during the provided dates
            OR: [
              {
                startTime: { lt: checkOutDate }, // Room booked before checkout
                endTime: { gt: checkInDate }, // Room booked after checkin
              },
              {
                startTime: { gte: checkInDate }, // Room booked after checkin
                endTime: { lte: checkOutDate }, // Room booked before checkout
              }
            ]
          }
        }
        
      },
    });
    return NextResponse.json({ availableRooms}, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "could not get bookings" },
      { status: 500 }
    );
  }
}
