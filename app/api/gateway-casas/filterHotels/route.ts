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

    const client_url = new URL(request.url);
    const dateFrom = client_url.searchParams.get('dateFrom') || '';
    const dateTo = client_url.searchParams.get('dateTo') || '';
    const priceFrom = parseFloat(client_url.searchParams.get('priceFrom') || '0');
    const priceTo = parseFloat(client_url.searchParams.get('priceTo') || '0');
    const bedRooms = parseInt(client_url.searchParams.get('bedRooms') || '0', 10);
    const guest = parseInt(client_url.searchParams.get('guest') || '0', 10);
    const language = client_url.searchParams.get('language') || 'en';
    const currencyWished = client_url.searchParams.get('currencyWished') || 'BRL';
    const country = client_url.searchParams.get('country') || '';
    
    if (!dateFrom || !dateTo) {
      return NextResponse.json({ error: 'Missing required parameters: dateFrom and dateTo' }, { status: 400 });
    }

    console.log('Called API with:', { dateFrom, dateTo, priceFrom, priceTo, bedRooms, guest, language, currencyWished, country });
    const filters: Filters = {
      dateFrom,
      dateTo,
      priceFrom,
      priceTo,
      bedRooms,
      guest,
      language,
      currencyWished,
      country,
    };

    const {url , method} = HOTEL_END_POINT;

    // Note: Authorization will be done by apiClient.ts;
    const option = {
        method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(filters)
    }
    const response = await apiClient(url, option);
    const data = await response.json();

    console.log("Response from hotel end point...");
    console.log(data?.length);
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