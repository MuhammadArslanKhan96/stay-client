import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: Request) {
  try {
    const hotelsData = await prisma.api_hotels.findMany({
      skip: 1,
      take: 10,
      include: {
        api_hotel_images: true,
        _count: {
          select: {
            api_hotel_rooms: true,
          },
        },
      },
    });

    if (hotelsData) {
      return NextResponse.json({ success: true, data: hotelsData });
    }

    return NextResponse.json({ success: false, message: "not found" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to load hotels from DB." },
      { status: 500 }
    );
  }
}

// Use to return the available hotels from Brazil...
export async function POST(request: Request) {
  try {
    const bodyObj = await request.json();

    // const checkIn = bodyObj.checkIn.split("T")[0];
    // const checkOut = bodyObj.checkOut.split("T")[0];
    // const rooms = bodyObj.rooms;
    // const adults = bodyObj.adults;
    // const children = bodyObj.children;

    console.log("Body passed is: ", bodyObj);

    const starter = getRandomNumber();
    const hotelsData = await prisma.api_hotels.findMany({
      skip: starter,
      take: 10,
      include: {
        api_hotel_images: true,
        _count: {
          select: {
            api_hotel_rooms: true,
          },
        },
      },
    });

    if (hotelsData) {
      return NextResponse.json({ success: true, data: hotelsData });
    }

    return NextResponse.json({ success: false, message: "not found" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to load hotels from DB." },
      { status: 500 }
    );
  }
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 70) + 1;
}
