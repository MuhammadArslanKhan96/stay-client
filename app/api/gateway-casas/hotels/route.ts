// app/api/example/route.ts
import { NextResponse } from 'next/server';
import { apiClient } from '@/util/gateway-casas/apiClient';
import { HOTEL_END_POINT } from '@/util/gateway-casas/config';


export async function GET() {
  try {
    const {url, method} = HOTEL_END_POINT;
    console.log('CAlled API with url, an dmehtod', url, method);
    // Note: Authorization will be done by apiClient.ts;
    const option = {
        method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-Api-Key': '3B46jpFhDgzuXQMfNmDNG9ZV1UuqerqLH1ySpc2nNXb8GtusdniXSjKSXrtoBhtNEJzMRTTHRbgwJ1wX77MYkj6m'
        },
        body: JSON.stringify({dateFrom: '2025-01-20 08:30:00', dateTo: '2025-05-15 08:30:00'})
    }
    const response = await apiClient(url, option);
    const data = await response.json();

    console.log("Response from hotel end point...");
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await apiClient('https://api.thirdparty.com/another-endpoint', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}