import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import {
  GET_PROPERTY_POINT,
  HOTEL_END_POINT,
} from "@/util/gateway-casas/config";
import { apiClient } from "@/util/gateway-casas/apiClient";
import generateAuthHeaders from "@/util/hotelAPI/headers";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const hotelCode = params.id;
  try {
    const endPoint = `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels/${hotelCode}/details`;

    const response = await fetch(endPoint, {
      method: "GET",
      headers: {
        ...generateAuthHeaders(),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
      },
    });

    console.log("response", response);
    const data = await response.json();

    // console.log(data);

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json("An error occoured: " + error.message, {
      status: 400,
    });
  }
}

/**
 * 
 *  const { url, method } = GET_PROPERTY_POINT;
    console.log(url, " method ", method);

    // Note: Authorization will be done by apiClient.ts;
    const option = {
      method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(bodyData),
    };
    const response = await apiClient(url, option);
    const data = await response.json();

    console.log("Get Property data: ...");
    console.log(data);
    return NextResponse.json(data);
 */
