import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function POST(request: Request) {
  try {
    //Headers
    const bodyObj = await request.json();

    const lat = bodyObj?.lat;
    const lng = bodyObj?.lng;
    const checkIn = bodyObj.checkIn.split("T")[0];
    const checkOut = bodyObj.checkOut.split("T")[0];
    const rooms = bodyObj.rooms;
    const adults = bodyObj.adults;
    const children = bodyObj.children;

    const requestedBody = {
      stay: {
        checkIn,
        checkOut,
      },
      occupancies: [
        {
          rooms,
          adults,
          children,
        },
      ],

      geolocation: {
        latitude: lat,
        longitude: lng,
        radius: "200",
        unit: "km",
      },
      //   hotels: {
      //     hotel: [123223, 123224, 122197],
      //   },
    };

    console.log("Requested Body is , ", requestedBody);

    const headers = generateAuthHeaders();

    const url = `https://api.test.hotelbeds.com/hotel-api/hotels`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
      },
      body: JSON.stringify(requestedBody),
    });

    const data = await response.json();
    console.log("data", data);
    console.log("API response", response);
    if (!response.ok) {
      return NextResponse.json(
        { error: response.statusText },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}

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
