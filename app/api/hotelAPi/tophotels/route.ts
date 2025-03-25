import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const headers = generateAuthHeaders();

    const url = `https://api.test.hotelbeds.com/hotel-api/hotels`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headers,
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      },
    });

    console.log(response);

    const data = await response.json();

    console.log("Response from GET endpoint ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const response = await apiClient('https://api.thirdparty.com/another-endpoint', {
//       method: 'POST',
//       body: JSON.stringify(body),
//     });
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
//   }
// }
