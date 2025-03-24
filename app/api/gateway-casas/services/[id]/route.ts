import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import {
  GET_PROPERTY_POINT,
  SERVICE_END_POINT,
} from "@/util/gateway-casas/config";
import { apiClient } from "@/util/gateway-casas/apiClient";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const hotelId = params.id;
  try {
    const { url, method } = SERVICE_END_POINT;
    console.log(url, " method ", method);

    // Note: Authorization will be done by apiClient.ts;
    const option = {
      method,
      headers: {
        accept: "application/json",
      },
    };
    const response = await apiClient(`${url}/${hotelId}/pt/USD`, option);
    const data = await response.json();

    console.log("Services: ...");
    console.log(data);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json("An error occoured: " + error.message, {
      status: error.status || 400,
    });
  }
}
