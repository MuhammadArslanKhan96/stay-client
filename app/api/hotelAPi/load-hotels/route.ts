import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { Next } from "react-bootstrap/esm/PageItem";

export async function GET(request: Request) {
  try {
    let recordNumber = 0;

    return NextResponse.json({
      message: `API is stopped forcefully.`,
    });

    const res = await getTotalCount();
    const totalCount = res.total;

    for (let it = 1; it <= totalCount; it += 100) {
      console.log("Fetching data from: ", it + " to:" + (it + 100));
      await loadData(it, it + 100);
    }

    if (recordNumber > 0) {
      console.log("Hotel record added/updated ", recordNumber);
      return NextResponse.json({
        message: `${recordNumber} Hotels inserted successfully`,
      });
    }

    return NextResponse.json({
      message: `0 Updated/inserted`,
      total: totalCount,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generated data" },
      { status: 500 }
    );
  }
}

// async function insertHotels(from: number, to: number) {
//   const hotels = await mapHotelData(from, to);

//   // Insert hotels into the database
//   for (const hotel of hotels) {
//     await prisma.hotels.create({
//       data: hotel,
//     });
//   }
//   console.log(`Inserted ${hotels.length} hotels.`);
// }

// async function mapHotelData(from: number, to: number) {
//   const apiResponse = await fetchHotels(from, to);
//   const hotels = apiResponse?.hotels; // Assuming `hotels` is the key in the API response containing the hotel data.

//   return hotels.map((hotel: any) => ({
//     name: hotel?.name?.content,
//     chainCode: hotel?.chainCode || null,
//     hotelCode: hotel?.code,
//     accommodationTypeCode: hotel.accommodationTypeCode || null,
//     categoryCode: hotel.categoryCode || null,
//     categoryGroupCode: hotel.categoryGroupCode || null,
//     description: hotel.description.content || null,
//     giataCode: hotel.giataCode || null,
//     countryCode: hotel.countryCode,
//     cityCode: hotel.cityCode || null,
//     postalCode: hotel.postalCode || null,
//     latitude: hotel.coordinates.latitude,
//     longitude: hotel.coordinates.longitude,
//     phoneNumber: hotel.phones?.[0]?.phoneNumber || null,
//     email: hotel.email || null,
//     website: hotel.web || null,
//     ranking: hotel.ranking || null,
//     lastUpdate: hotel.lastUpdate || null,
//     license: hotel.license || null,
//   }));
// }

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

async function getTotalCount() {
  const headers = generateAuthHeaders();
  const response = await fetch(
    `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels`,

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

async function loadData(from: number, to: number) {
  const apiResponse = await fetchHotels(from, to);
  const hotels = apiResponse?.hotels;

  for (let hotel_ of hotels) {
    let hotelId;
    const hotelData = {
      name: hotel_?.name?.content,
      chainCode: hotel_?.chainCode || null,
      accommodationTypeCode: hotel_.accommodationTypeCode || null,
      categoryCode: hotel_.categoryCode || null,
      categoryGroupCode: hotel_.categoryGroupCode || null,
      description: hotel_.description.content || null,
      giataCode: hotel_.giataCode || null,
      countryCode: hotel_.countryCode,
      cityCode: hotel_.country?.isoCode || null,
      postalCode: hotel_.postalCode || null,
      latitude: hotel_.coordinates.latitude,
      longitude: hotel_.coordinates.longitude,
      phoneNumber: hotel_.phones?.[0]?.phoneNumber || null,
      email: hotel_.email || null,
      website: hotel_.web || null,
      ranking: hotel_.ranking || null,
      lastUpdate: hotel_.lastUpdate || null,
      license: hotel_.license || null,
    };

    // First checking hotel in db:
    console.log("Checking for hotel: ", hotel_.code);
    const existingHotel = await prisma.hotels.findUnique({
      where: {
        hotelCode: hotel_?.code,
      },
    });

    if (existingHotel) {
      // If existing hotel doesn't have a lastUpdate or if the new lastUpdate is greater than the existing one
      if (
        !existingHotel.lastUpdate ||
        new Date(hotelData.lastUpdate) > new Date(existingHotel.lastUpdate)
      ) {
        const result = await prisma.hotels.update({
          where: {
            hotelCode: hotel_?.code,
          },
          data: hotelData,
        });

        if (result) {
          console.log(`Hotel record Updated`);
          hotelId = result.id;
        }
      } else {
        console.log(`${hotel_?.code} is already up-to-date.`);
      }
    } else {
      const r = await prisma.hotels.create({
        data: {
          hotelCode: hotel_?.code,
          ...hotelData,
        },
      });

      if (r) {
        console.log("New Hotel Record Added");
        hotelId = r.id;
      }
    }

    //If hotel is updated or changed...
    if (hotelId) {
      //1. Adding rooms.
      const rooms = hotel_.rooms;
      console.log("API HAS ROOMS: ", rooms.length);
      for (const room of rooms) {
        const roomData = {
          roomCode: room.roomCode,
          roomType: room.roomType,
          description: room.description,
        };
        const alreadyAvailable = await prisma.hotelRooms.findFirst({
          where: {
            hotel_id: hotelId,
            roomCode: roomData.roomCode,
          },
        });

        if (alreadyAvailable) {
          const updated = await prisma.hotelRooms.update({
            where: {
              id: alreadyAvailable.id,
            },
            data: {
              roomType: roomData.roomType,
              description: roomData.description,
            },
          });
          if (updated) {
            console.log("Room Updated");
          }
        } else {
          const insertRoom = await prisma.hotelRooms.create({
            data: {
              hotel_id: hotelId,
              roomCode: roomData.roomCode,
              roomType: roomData.roomType,
              description: roomData.description,
            },
          });
          if (insertRoom) {
            console.log("New room added.");
          }
        }
      }

      //2. Adding HotelImages:
      const hotelImages = hotel_.images;
      console.log("API HAS Images: ", hotelImages.length);

      const hotelImagesMapped = hotelImages.map((image: any) => ({
        hotel_id: hotelId,
        imageTypeCode: image.imageTypeCode,
        path: image.path,
        roomCode: image.roomCode,
        roomType: image.roomType,
        visualOrder: image.visualOrder,
      }));

      for (const imageData of hotelImagesMapped) {
        // Check if the image already exists
        const existingImage = await prisma.hotelImages.findFirst({
          where: {
            hotel_id: imageData.hotel_id,
            imageTypeCode: imageData.imageTypeCode,
            roomCode: imageData.roomCode,
          },
        });

        if (existingImage) {
          const imageUpdate = await prisma.hotelImages.update({
            where: {
              id: existingImage.id, // Find the image by its unique ID
            },
            data: {
              path: imageData.path,
              roomType: imageData.roomType,
              visualOrder: imageData.visualOrder,
            },
          });
          if (imageUpdate) {
            console.log("Image updated");
          }
        } else {
          // If the image does not exist, create a new one
          const imageAdded = await prisma.hotelImages.create({
            data: {
              hotel_id: imageData.hotel_id,
              imageTypeCode: imageData.imageTypeCode,
              path: imageData.path,
              roomCode: imageData.roomCode,
              roomType: imageData.roomType,
              visualOrder: imageData.visualOrder,
            },
          });
          if (imageAdded) {
            console.log("Image added");
          }
        }
      }

      //3. Adding address:
      // const phoneNumbers = hotel.phones?.map((phone: any) => ({
      //   phoneNumber: phone?.phoneNumber,
      //   phoneType: phone?.phoneType,
      // }));

      // 4. ADding facilities:

      const facilities = hotel_.facilities;
      // console.log(facilities);

      for (let fac of facilities) {
        const facilityData = {
          facilityCode: fac?.facilityCode,
          facilityName: fac?.facilityName,
          description: fac?.description,
          currency: fac?.currency,
          ageFrom: fac?.ageFrom,
          ageTo: fac?.ageTo,
          dateFrom: fac?.dateFrom,
          dateTo: fac?.dateTo,
          indFee: fac?.indFee,
          voucher: fac?.voucher,
        };
        const existingFacility = await prisma.hotelFacilities.findFirst({
          where: {
            hotel_id: hotelId,
            facilityCode: facilityData.facilityCode, // Unique check: hotel_id + facilityCode
          },
        });

        if (existingFacility) {
          // If the facility exists, update it
          const facUpdated = await prisma.hotelFacilities.update({
            where: {
              id: existingFacility.id,
            },
            data: {
              facilityName: facilityData.facilityName,
              description: facilityData.description,
              currency: facilityData.currency,
              ageFrom: facilityData.ageFrom,
              ageTo: facilityData.ageTo,
              dateFrom: facilityData.dateFrom,
              dateTo: facilityData.dateTo,
              indFee: facilityData.indFee,
              voucher: facilityData.voucher,
            },
          });

          if (facUpdated) {
            console.log("Facility Updated.");
          }
        } else {
          const facAdded = await prisma.hotelFacilities.create({
            data: {
              hotel_id: hotelId,
              ...facilityData,
            },
          });
          if (facAdded) {
            console.log("New facility is added");
          }
        }
      }
    }
  }
}
