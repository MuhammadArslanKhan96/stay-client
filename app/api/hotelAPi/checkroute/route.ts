import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //Headers
    const bodyObj = await request.json();

    const lat = bodyObj?.lat;
    const lng = bodyObj?.lng;
    const checkIn = bodyObj.checkIn.split("T")[0];
    const checkOut = bodyObj.checkOut.split("T")[0];
    const rooms = bodyObj.rooms;
    const adults = bodyObj.adults;
    const children = bodyObj.children;

    const requestedBody = {
      stay: {
        checkIn,
        checkOut,
      },
      occupancies: [
        {
          rooms,
          adults,
          children,
        },
      ],

      geolocation: {
        latitude: lat,
        longitude: lng,
        radius: "200",
        unit: "km",
      },
      //   hotels: {
      //     hotel: [123223, 123224, 122197],
      //   },
    };

    console.log("Requested Body is , ", requestedBody);

    const headers = generateAuthHeaders();

    const url = `https://api.test.hotelbeds.com/hotel-api/hotels`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
      },
      body: JSON.stringify(requestedBody),
    });

    console.log(response);

    const data = await response.json();

    console.log("Data received is, ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const headers = generateAuthHeaders();

    // const uri = `https://api.test.hotelbeds.com/hotel-content-api/hotels`;
    const url = `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?from=1&to=10&countryCode=BZ`;
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
