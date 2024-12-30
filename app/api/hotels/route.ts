// import DnDTablePage from "@/app/(hydrogen)/tables/dnd/page";
import clientPromise from "../lib";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        contact: true, // Include the related contact
        room: true, // Include all related rooms
      },
    });
    console.log(hotels);
    return NextResponse.json(hotels);
  } catch (error: any) {
    console.error("error getting hotels: " + error.message);
    return NextResponse.json({
      error: error.message,
    });
  }
}

// export async function POST(req: Request, res: NextApiResponse) {
//   try {
//     const client = await clientPromise;
//     const db: any = client.db("staychain");
//     const data: any = await req.json();
//     console.log(data);
//     const name = data.name;
//     console.log(name);
//     const newHotel = await db.collection("hotels").insertOne({
//       name: data.name,
//       city: data.city,
//       images: {
//         main: data.images.main,
//         supporting: data.images.supporting,
//       },
//       contact: {
//         number: data.contact.number,
//         email: data.contact.email,
//       },
//       rooms: data.rooms,
//     });
//     return NextResponse.json(newHotel);
//   } catch (error: any) {
//     console.log("error: " + error.message);
//     NextResponse.json(error.message);
//   }
// }
