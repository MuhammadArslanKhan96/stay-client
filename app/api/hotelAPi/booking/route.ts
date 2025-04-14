import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

const HOTEL_BOOKING_URL =
  "https://api.test.hotelbeds.com/hotel-api/1.0/bookings";
export async function POST(request: Request) {
  try {
    //Headers
    const bodyObj = await request.json();

    console.log(bodyObj);

    const holderName = bodyObj.firstName;
    const holderSurname = bodyObj.lastName;
    const rateKeys = bodyObj.rateKey;
    const userId = bodyObj.userId;
    console.log("user id is: ", userId);
    const clientReference = `HTL-${Date.now()}`.substring(0, 20);

    const requestedBody = {
      holder: {
        name: holderName,
        surname: holderSurname,
      },
      clientReference,

      rooms: [{ rateKey: rateKeys }],
    };

    console.log("Booking Data passed... ", requestedBody);

    // return NextResponse.json({ data: "response from API." });

    const headers = generateAuthHeaders();

    const response = await fetch(HOTEL_BOOKING_URL, {
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

    console.log("Booking data response...", data);
    console.log("Saving data to the DB...");

    if (data && data?.error) {
      console.log("Error from booking API...");
      return NextResponse.json(
        { error: data?.error?.message },
        { status: 500 }
      );
    }

    if (data && data.booking) {
      const booking = data?.booking;
      console.log("Booking information is as below: ");
      console.log(booking);
      // Save the data to the DB:
      try {
        await createBooking(booking, rateKeys, userId);
      } catch (err) {
        console.log("Failed to create the booking in DB...");
        return NextResponse.json({ data }, { status: 500 });
      }
    }

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

export const createBooking = async (
  bookingData: any,
  rateKey: string,
  userId: string
) => {
  try {
    const hotelCode = bookingData?.hotel?.code || 0;
    const roomCode = bookingData?.hotel?.rooms?.[0].code || 0;

    // console.log("Booking data: ");
    // console.log("*******************");
    // console.log(hotelCode);
    // console.log(roomCode);
    // console.log("*******************");

    const hotel = await prisma.api_hotels.findFirst({
      where: {
        code: hotelCode,
      },
    });

    let hotelId = 0;
    if (hotel) {
      hotelId = hotel.id;
    }

    const roomData = await prisma.api_hotel_rooms.findFirst({
      where: {
        hotel_code: hotelCode,
        room_code: roomCode,
      },
    });

    let roomId = 0;
    if (roomData) roomId = roomData?.id;

    console.log("Hotel id: ", hotelId);
    console.log("room Id", roomId);

    if (hotel && roomData) {
      const dataToSave = {
        reference: bookingData.reference,
        client_reference: bookingData.clientReference,
        hotel_id: hotelId,
        room_id: roomId,
        rate_key: rateKey,
        check_in: new Date(bookingData?.hotel?.checkIn),
        check_out: new Date(bookingData?.hotel?.checkOut),
        total_amount: bookingData.totalNet,
        currency: bookingData.currency || "USD",
        holder_name: bookingData.holder.name,
        holder_surname: bookingData.holder.surname,
        holder_email: bookingData.holder.name,
        holder_phone: "12345678",
        status: bookingData.status || "confirmed",
        payment_status: bookingData.paymentStatus || "pending",
        payment_method: bookingData.paymentMethod,
        supplier_data: bookingData.supplierData,
        user_id: userId,
      };

      const booking = await prisma.api_bookings.create({
        data: dataToSave,
        include: {
          api_hotel_rooms: true,
          api_hotels: true,
        },
      });
      return booking;
    }
    throw new Error("Failed to locate hotel and room");
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  } finally {
    await prisma.$disconnect();
  }
};
