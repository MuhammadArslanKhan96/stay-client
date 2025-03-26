// app/api/example/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Body is , ", body);
    console.log("Saved the data to the db...");
    console.log("Body is , ", body);
    const bookProperty = await prisma.bookedProperties.create({
      data: {
        userId: body.userId,
        propertyId: body.propertyID,
        startDate: body.checkin,
        endDate: body.checkout,
        currency: body.currencyWished,
        language: body.language,
      },
    });
    if (bookProperty) {
      return NextResponse.json({
        message: "Booking is saved in DB.",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Error occured while creating a new booking.",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}

/**
 * 
 * export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Body is , ", body);
    const { url, method } = BOOK_HOTEL_ENDPOINT;
    console.log("url, ", url, " method", method);

    const response = await apiClient(url, {
      method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Data from booking ... , ", data);
    return NextResponse.json(data);
    // const { url, method } = RESERVE_BOOKING_POINT;

    // const response = await apiClient(url, {
    //   method,
    //   body: JSON.stringify(body),
    // });
    // const data = await response.json();
    // console.log("Booking Reservation token...");
    // console.log(data);
    // return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
 */
