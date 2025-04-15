import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Check if the booking exists
    const booking = await prisma.api_bookings.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Delete the booking
    await prisma.api_bookings.delete({
      where: {
        id: bookingId,
      },
    });

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting booking:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
