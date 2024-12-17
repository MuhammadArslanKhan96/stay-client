import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //   console.log(req.body);
  const hotelId = params.id;
  console.log(hotelId);
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        contact: true, // Include the related contact
        room: true, // Include all related rooms
      },
    });
    if (!hotel || hotel == undefined || hotel == null) {
      // return NextResponse.json({error: "Hotel not found"}, {status: 404})
      return NextResponse.json("request hotel does not exist");
    } else {
      console.log(hotel);
      return NextResponse.json(hotel);
    }
  } catch (error: any) {
    // return NextResponse.json({ error: "An error occoured: " + error.message }, { status: 500 });
    return NextResponse.json("An error occoured: " + error.message);
  }
}
