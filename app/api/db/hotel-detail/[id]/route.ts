import { NextRequest, NextResponse } from "next/server";
import generateAuthHeaders from "@/util/hotelAPI/headers";

import prisma from "../../../../../prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const hotelCode = params.id;
  try {
    console.log("Fetching data for hotel ", hotelCode);
    const hotelDetails = await prisma.api_hotels.findFirst({
      where: {
        code: Number(hotelCode),
      },
      include: {
        api_hotel_rooms: true,
        api_hotel_images: true,
      },
    });

    return NextResponse.json({ data: hotelDetails });
  } catch (error: any) {
    return NextResponse.json("An error occoured: " + error.message, {
      status: 400,
    });
  }
}
