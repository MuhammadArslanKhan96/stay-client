// app/api/example/route.ts
import { NextResponse } from "next/server";
import { apiClient } from "@/util/gateway-casas/apiClient";
import {
  BOOK_HOTEL_ENDPOINT,
  RESERVE_BOOKING_POINT,
} from "@/util/gateway-casas/config";

export async function POST(request: Request) {
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
