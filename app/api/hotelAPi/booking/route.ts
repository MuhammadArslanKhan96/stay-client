import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //Headers
    const bodyObj = await request.json();

    const holderName = bodyObj.firstName;
    const holderSurname = bodyObj.lastName;
    const rateKeys = bodyObj.rateKeys;
    const userId = bodyObj.userId;
    console.log("user id is: ", userId);
    const clientReference = `HTL-${Date.now()}`.substring(0, 20);

    const requestedBody = {
      holder: {
        name: holderName,
        surname: holderSurname,
      },
      clientReference,

      rooms: rateKeys,
    };

    console.log("Booking Data passed... ", requestedBody);

    const headers = generateAuthHeaders();

    const url = `https://api.test.hotelbeds.com/hotel-api/1.0/bookings`;
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

    console.log("Booking result ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error while confirming the booking." },
      { status: 500 }
    );
  }
}
