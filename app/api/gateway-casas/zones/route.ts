// app/api/example/route.ts
import { NextResponse } from 'next/server';
import { apiClient } from '@/util/gateway-casas/apiClient';
import { HOTEL_END_POINT } from '@/util/gateway-casas/config';

interface Filters {
  dateFrom: string;
  dateTo: string;
  priceFrom: number;
  priceTo: number;
  bedRooms: number;
  guest: number;
  language: string;
  currencyWished: string;
  country: string;
}
export async function GET(request:Request) {
  try {
    const language = 'pt';

    const url = `https://api-services.beat.homes/gtw-web/api/Zone/List?language=${language}`;
    const option = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    const response = await apiClient(url, option);
    console.log(response);
    const data = await response.json();
    console.log("Response" , data);
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