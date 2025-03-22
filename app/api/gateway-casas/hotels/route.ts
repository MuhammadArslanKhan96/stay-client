// app/api/example/route.ts
import { NextResponse } from 'next/server';
import { apiClient } from '@/util/gateway-casas/apiClient';
import { HOTEL_END_POINT } from '@/util/gateway-casas/config';


export async function GET(request:Request) {
  try {

    const requestData= {
      language: "en",
      currencyWished: "USD",
    }

    const {url , method} = HOTEL_END_POINT;

    // Note: Authorization will be done by apiClient.ts;
    const option = {
        method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(requestData)
    }
    const response = await apiClient(url, option);
    const data = await response.json();

    console.log("Response Data....");
    console.log(data?.length);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
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