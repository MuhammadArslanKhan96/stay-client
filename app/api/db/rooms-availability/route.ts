import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //Headers
    const bodyObj = await request.json();
    console.log("Body ojbect is: ", bodyObj);

    const hotelCode = bodyObj.hotelCode;
    const checkIn = bodyObj.checkIn.split("T")[0];
    const checkOut = bodyObj.checkOut.split("T")[0];
    const rooms = bodyObj.guests.rooms;
    const adults = bodyObj.guests.adults;
    const children = bodyObj.guests.children;

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
      hotels: {
        hotel: [Number(hotelCode)],
      },
    };

    console.log("REquested bodyis : ", requestedBody);
    // return NextResponse.json({ data: "" });
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

    console.log(response);

    const data = await response.json();

    console.log("Data received is, ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
