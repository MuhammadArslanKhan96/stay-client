import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import {
  GET_PROPERTY_POINT,
  HOTEL_END_POINT,
} from "@/util/gateway-casas/config";
import { apiClient } from "@/util/gateway-casas/apiClient";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const hotelId = params.id;
  console.log(hotelId);
  try {
    const { url, method } = GET_PROPERTY_POINT;
    console.log(url, " method ", method);

    // Note: Authorization will be done by apiClient.ts;
    const option = {
      method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: hotelId,
        currencyWished: "BRL",
        language: "en",
        withCache: false,
      }),
    };
    const response = await apiClient(url, option);
    const data = await response.json();

    console.log("Get Property data: ...");
    console.log(data);
    return NextResponse.json(data);
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
