import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: Request) {
  try {
    const from = 1;
    const to = 10;

    await insertHotels(Number(from), Number(to));
    return NextResponse.json({ message: "Hotels inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}

async function insertHotels(from: number, to: number) {
  const hotels = await mapHotelData(from, to);

  // Insert hotels into the database
  for (const hotel of hotels) {
    await prisma.hotels.create({
      data: hotel,
    });
  }
  console.log(`Inserted ${hotels.length} hotels.`);
}

async function mapHotelData(from: number, to: number) {
  const apiResponse = await fetchHotels(from, to);
  const hotels = apiResponse?.hotels; // Assuming `hotels` is the key in the API response containing the hotel data.

  return hotels.map((hotel: any) => ({
    name: hotel?.name?.content,
    chainCode: hotel?.chainCode || null,
    hotelCode: hotel?.code,
    accommodationTypeCode: hotel.accommodationTypeCode || null,
    categoryCode: hotel.categoryCode || null,
    categoryGroupCode: hotel.categoryGroupCode || null,
    description: hotel.description.content || null,
    giataCode: hotel.giataCode || null,
    countryCode: hotel.countryCode,
    cityCode: hotel.cityCode || null,
    postalCode: hotel.postalCode || null,
    latitude: hotel.coordinates.latitude,
    longitude: hotel.coordinates.longitude,
    phoneNumber: hotel.phones?.[0]?.phoneNumber || null,
    email: hotel.email || null,
    website: hotel.web || null,
    ranking: hotel.ranking || null,
    lastUpdate: hotel.lastUpdate || null,
    license: hotel.license || null,
  }));
}

async function fetchHotels(from: number, to: number) {
  const headers = generateAuthHeaders();
  const response = await fetch(
    `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?from=${from}&to=${to}`,

    {
      method: "GET",
      headers: {
        ...headers,
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching hotels: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
