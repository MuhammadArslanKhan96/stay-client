import generateAuthHeaders from "@/util/hotelAPI/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

const LOADER_URL =
  "https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?countryCode=BR&from=101&to=199&fields=all";

export async function GET(request: Request) {
  try {
    const headers = generateAuthHeaders();

    const hotelData = await insertHotelData(hotelDetails);

    return NextResponse.json({
      hotelData,
    });

    const response = await fetch(LOADER_URL, {
      method: "GET",
      headers: {
        ...headers,
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      },
    });

    const data = await response.json();
    const hotels = data?.hotels;

    console.log("Number of hotels...", hotels.length);

    if (hotels) {
      for (const hotel of hotels) {
        await insertHotelData(hotel);
      }
    }

    return NextResponse.json({
      data,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err });
  }
}

export async function insertHotelData(hotelData: any) {
  try {
    // Check if hotel already exists
    console.log("Saving the hotel to DB, with code: ", hotelData?.code);
    const existingHotel = await prisma.api_hotels.findUnique({
      where: { code: hotelData.code },
    });

    if (existingHotel) {
      console.log(`Hotel with code ${hotelData.code} already exists`);
      return;
    }

    // Create main hotel record
    const hotel = await prisma.api_hotels.create({
      data: {
        code: hotelData.code,
        name_content: hotelData.name.content,
        description_content: hotelData.description?.content,
        country_code: hotelData.countryCode,
        state_code: hotelData.stateCode,
        destination_code: hotelData.destinationCode,
        zone_code: hotelData.zoneCode,
        longitude: hotelData.coordinates?.longitude,
        latitude: hotelData.coordinates?.latitude,
        category_code: hotelData.categoryCode,
        category_group_code: hotelData.categoryGroupCode,
        chain_code: hotelData.chainCode,
        accommodation_type_code: hotelData.accommodationTypeCode,
        address_content: hotelData.address?.content,
        address_street: hotelData.address?.street,
        postal_code: hotelData.postalCode,
        city_content: hotelData.city?.content,
        email: hotelData.email,
        giata_code: hotelData.giataCode,
        web: hotelData.web,
        last_update: hotelData.lastUpdate,
        s2c: hotelData.S2C,
        ranking: hotelData.ranking,

        // Create related records in one transaction
        api_hotel_board_codes: {
          createMany: {
            data:
              hotelData.boardCodes?.map((code: any) => ({
                board_code: code,
              })) || [],
          },
        },
        api_hotel_segment_codes: {
          createMany: {
            data:
              hotelData.segmentCodes?.map((code: any) => ({
                segment_code: code,
              })) || [],
          },
        },
        api_hotel_phones: {
          create:
            hotelData.phones?.map((phone: any) => ({
              phone_number: phone.phoneNumber,
              phone_type: phone.phoneType,
            })) || [],
        },

        api_hotel_rooms: {
          create:
            hotelData.rooms?.map((room: any) => ({
              room_code: room.roomCode,
              is_parent_room: room.isParentRoom,
              min_pax: room.minPax,
              max_pax: room.maxPax,
              max_adults: room.maxAdults,
              max_children: room.maxChildren,
              min_adults: room.minAdults,
              room_type: room.roomType,
              characteristic_code: room.characteristicCode,
              api_room_stays: {
                create:
                  room.roomStays?.map((stay: any) => ({
                    stay_type: stay.stayType,
                    stay_order: stay.order,
                    description: stay.description,
                  })) || [],
              },
            })) || [],
        },
        api_hotel_facilities: {
          create:
            hotelData.facilities?.map((facility: any) => ({
              facility_code: facility.facilityCode,
              facility_group_code: facility.facilityGroupCode,
              facility_order: facility.order,
              number: facility.number,
              time_from: facility.timeFrom,
              time_to: facility.timeTo,
              voucher: facility.voucher,
            })) || [],
        },
        api_hotel_issues: {
          create:
            hotelData.issues?.map((issue: any) => ({
              issue_code: issue.issueCode,
              issue_type: issue.issueType,
              date_from: issue.dateFrom,
              date_to: issue.dateTo,
              issue_order: issue.order,
              alternative: issue.alternative,
            })) || [],
        },
        api_interest_points: {
          create:
            hotelData.interestPoints?.map((point: any) => ({
              facility_code: point.facilityCode,
              facility_group_code: point.facilityGroupCode,
              point_order: point.order,
              poi_name: point.poiName,
              distance: point.distance,
            })) || [],
        },
        api_hotel_images: {
          create:
            hotelData.images?.map((image: any) => ({
              image_type_code: image.imageTypeCode,
              path: image.path,
              image_order: image.order,
              visual_order: image.visualOrder,
              room_code: image.roomCode,
              room_type: image.roomType,
              characteristic_code: image.characteristicCode,
            })) || [],
        },
        api_wildcards: {
          create:
            hotelData.wildcards?.map((wildcard: any) => ({
              room_type: wildcard.roomType,
              room_code: wildcard.roomCode,
              characteristic_code: wildcard.characteristicCode,
              hotel_room_description_content:
                wildcard.hotelRoomDescription?.content,
            })) || [],
        },
      },
      include: {
        api_hotel_board_codes: true,
        api_hotel_segment_codes: true,
        api_hotel_phones: true,
        api_hotel_rooms: { include: { api_room_stays: true } },
        api_hotel_facilities: true,
        api_hotel_issues: true,
        api_interest_points: true,
        api_hotel_images: true,
        api_wildcards: true,
      },
    });

    return hotel;
  } catch (error) {
    console.error("Error inserting hotel data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Adding Hotel Function
// async function addHotel(hotel: any) {
//   try {
//     const hotelAddResponse = await prisma.hotels.findUnique({
//       where: { hotel_code: hotel.code },
//     });

//     if (!hotelAddResponse) {
//       const hotelCreated = await prisma.hotels.create({
//         data: {
//           hotel_code: hotel.code,
//           name: hotel.name?.content,
//           email: hotel.email,
//           web: hotel.web,
//           postal_code: hotel.postalCode,
//           s2c: hotel.S2C,
//           accommodation_type_code: hotel.accommodationTypeCode,
//           category_code: hotel.categoryCode,
//           category_group_code: hotel.categoryGroupCode,
//           chain_code: hotel.chainCode,
//           city: hotel.city?.content,
//           country_code: hotel.countryCode,
//           destination_code: hotel.destinationCode,
//           state_code: hotel.stateCode,
//           ranking: hotel.ranking,
//           giata_code: hotel.giataCode,
//           exclusive_deal: hotel.exclusiveDeal,
//           license: hotel.license,
//           last_update: hotel.lastUpdate,
//           latitude: hotel.coordinates?.latitude,
//           longitude: hotel.coordinates?.longitude,
//         },
//       });

//       if (hotelCreated) {
//         const hotelID = hotelCreated.id;

//         const categoryGroup = hotel.categoryGroup;
//         if (categoryGroup) {
//           console.log("Adding category Group...");
//           await prisma.category_groups.create({
//             data: {
//               code: hotel.categoryGroupCode,
//               description_content: categoryGroup.description.content,
//               description_language: categoryGroup.description.languageCode,
//               name_content: categoryGroup.name.content,
//               name_language: categoryGroup.name.languageCode,
//               order: categoryGroup.order,
//             },
//           });
//         }

//         const category = hotel.category;
//         const categoryCode = hotel.categoryCode;
//         if (category && categoryCode) {
//           console.log("Adding category...");
//           await prisma.categories.create({
//             data: {
//               code: categoryCode,
//               accommodation_type: category.accommodationType,
//               description_content: category.description.content,
//               description_language: category.description.languageCode,
//               group_code: category.group,
//               simple_code: category.simpleCode,
//             },
//           });
//         }

//         const accommodationType = hotel.accommodationType;
//         if (accommodationType) {
//           console.log("Adding Accomodation Type...");
//           await prisma.accommodation_types.create({
//             data: {
//               code: accommodationType.code,
//               type_description: accommodationType.typeDescription,
//               multi_description_content:
//                 accommodationType.typeMultiDescription.content,
//               multi_description_language:
//                 accommodationType.typeMultiDescription.languageCode,
//             },
//           });
//         }

//         const boards = hotel.boards;
//         if (boards && boards?.length > 0) {
//           console.log("Adding Boards...");
//           await prisma.boards.createMany({
//             data: hotel.boards.map((board: any) => ({
//               hotel_id: hotelID,
//               code: board.code,
//               multilingual_code: board.multiLingualCode,
//               description_content: board.description.content,
//               description_language: board.description.languageCode,
//             })),
//           });
//         }

//         // Images of hotel...
//         console.log("Adding Images...");
//         await prisma.images.createMany({
//           data: hotel.images.map((img: any) => ({
//             hotel_id: hotelID,
//             characteristic_code: img.characteristicCode,
//             image_type_code: img.imageTypeCode,
//             order: img.order,
//             path: img.path,
//             room_code: img.roomCode,
//             room_type: img.roomType,
//             pms_room_code: img.PMSRoomCode,
//             visual_order: img.visualOrder,
//             type_code: img.type?.code,
//             type_description_content: img?.type?.description?.content,
//             type_description_language: img?.type?.description?.languageCode,
//           })),
//         });

//         // Room Data...
//         console.log("Adding Rooms Data...");
//         for (const room of hotel?.rooms) {
//           const roomCreated = await prisma.rooms.create({
//             data: {
//               hotel_id: hotelID,
//               room_code: room.roomCode,
//               description: room.description,
//               room_type: room.roomType,
//               characteristic_code: room.characteristicCode,
//             },
//           });

//           // Room Facilities
//           const roomFacilities = room.roomFacilities;
//           if (roomFacilities && roomFacilities.length > 0) {
//             await prisma.room_facilities.createMany({
//               data: room.roomFacilities.map((rf: any) => ({
//                 room_id: roomCreated.id,
//                 facility_code: rf.facilityCode,
//                 facility_group_code: rf.facilityGroupCode,
//                 ind_fee: rf.indFee,
//                 ind_logic: rf.indLogic,
//                 ind_yes_or_no: rf.indYesOrNo,
//                 number: rf.number,
//                 order: rf.order,
//                 voucher: rf.voucher,
//                 description_content: rf.description?.content,
//                 description_language: rf.description?.languageCode,
//               })),
//             });
//           }

//           // Room Stays

//           const roomStays = room.roomStays;
//           if (roomStays) {
//             for (const stay of room.roomStays) {
//               const roomStayCreated = await prisma.room_stays.create({
//                 data: {
//                   room_id: roomCreated.id,
//                   description: stay.description,
//                   order: Number(stay.order),
//                   stay_type: stay.stayType,
//                 },
//               });

//               const roomStayFacilities = stay.roomStayFacilities;

//               if (roomStayFacilities) {
//                 await prisma.room_stay_facilities.createMany({
//                   data: stay.roomStayFacilities.map((rsf: any) => ({
//                     room_stay_id: roomStayCreated.id,
//                     facility_code: rsf.facilityCode,
//                     facility_group_code: rsf.facilityGroupCode,
//                     number: rsf.number,
//                   })),
//                 });
//               }
//             }
//           }
//         }

//         console.log("Adding Facilities...");

//         const facilities = hotel.facilities;
//         if (facilities) {
//           await prisma.facilities.createMany({
//             data: hotel.facilities.map((f: any) => ({
//               hotel_id: hotelID,
//               facility_code: f?.facilityCode,
//               facility_group_code: f?.facilityGroupCode,
//               age_from: f?.ageFrom,
//               age_to: f?.ageTo,
//               amount: f?.amount,
//               application_type: f?.applicationType,
//               currency: f.currency,
//               date_from: f.dateFrom,
//               date_to: f.dateTo,
//               distance: f.distance,
//               facility_name: f.facilityName,
//               ind_fee: f.indFee,
//               ind_logic: f.indLogic,
//               ind_yes_or_no: f.indYesOrNo,
//               number: f.number,
//               order: f.order,
//               time_from: f.timeFrom,
//               time_to: f.timeTo,
//               voucher: f.voucher,
//               description_content: f.description?.content,
//               description_language_code: f.description?.languageCode,
//             })),
//           });
//         }
//       }
//     } else {
//       console.log("Record Already exists...");
//     }
//     return hotelAddResponse;
//   } catch (err: any) {
//     console.log("error occured while adding the hotel data into the db.");
//     console.log(err.message);
//     return null;
//   }
// }

// export async function GET(request: Request) {
//   try {
//     let recordNumber = 0;

//     // const res = await getTotalCount();
//     // const totalCount = res.total;

//     // for (let it = 1; it <= totalCount; it += 100) {
//     //   console.log("Fetching data from: ", it + " to:" + (it + 100));
//     //   await loadData(it, it + 100);
//     // }

//     const hotelsData = await fetchHotels(1, 10);

//     console.log("HOTELs DATA: ");
//     console.log(hotelsData);

//     // for (let hotel of hotelsData) {
//     //   console.log("HOTEL DETAILS....");
//     //   console.log(hotel);
//     // }

//     if (recordNumber > 0) {
//       console.log("Hotel record added/updated ", recordNumber);
//       return NextResponse.json({
//         message: `${recordNumber} Hotels inserted successfully`,
//       });
//     }

//     return NextResponse.json({
//       message: `0 Updated/inserted`,
//       data: hotelsData?.hotels,
//       // total: totalCount,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: "Failed to generated data" },
//       { status: 500 }
//     );
//   }
// }

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

// async function fetchHotels(from: number, to: number) {
//   const headers = generateAuthHeaders();
//   const response = await fetch(
//     `${LOADER_URL}&from=${from}&to=${to}`,

//     {
//       method: "GET",
//       headers: {
//         ...headers,
//         Accept: "application/json",
//         "Accept-Encoding": "gzip",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error fetching hotels: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data;
// }

// async function getTotalCount() {
//   const headers = generateAuthHeaders();
//   const response = await fetch(LOADER_URL, {
//     method: "GET",
//     headers: {
//       ...headers,
//       Accept: "application/json",
//       "Accept-Encoding": "gzip",
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Error fetching hotels: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data;
// }

// async function loadData(from: number, to: number) {
//   const apiResponse = await fetchHotels(from, to);
//   const hotels = apiResponse?.hotels;

//   for (let hotel_ of hotels) {
//     let hotelId;
//     const hotelData = {
//       name: hotel_?.name?.content,
//       chainCode: hotel_?.chainCode || null,
//       accommodationTypeCode: hotel_.accommodationTypeCode || null,
//       categoryCode: hotel_.categoryCode || null,
//       categoryGroupCode: hotel_.categoryGroupCode || null,
//       description: hotel_.description.content || null,
//       giataCode: hotel_.giataCode || null,
//       countryCode: hotel_.countryCode,
//       cityCode: hotel_.country?.isoCode || null,
//       postalCode: hotel_.postalCode || null,
//       latitude: hotel_.coordinates.latitude,
//       longitude: hotel_.coordinates.longitude,
//       phoneNumber: hotel_.phones?.[0]?.phoneNumber || null,
//       email: hotel_.email || null,
//       website: hotel_.web || null,
//       ranking: hotel_.ranking || null,
//       lastUpdate: hotel_.lastUpdate || null,
//       license: hotel_.license || null,
//     };

//     // First checking hotel in db:
//     console.log("Checking for hotel: ", hotel_.code);
//     const existingHotel = await prisma.hotels.findUnique({
//       where: {
//         hotelCode: hotel_?.code,
//       },
//     });

//     if (existingHotel) {
//       // If existing hotel doesn't have a lastUpdate or if the new lastUpdate is greater than the existing one
//       if (
//         !existingHotel.lastUpdate ||
//         new Date(hotelData.lastUpdate) > new Date(existingHotel.lastUpdate)
//       ) {
//         const result = await prisma.hotels.update({
//           where: {
//             hotelCode: hotel_?.code,
//           },
//           data: hotelData,
//         });

//         if (result) {
//           console.log(`Hotel record Updated`);
//           hotelId = result.id;
//         }
//       } else {
//         console.log(`${hotel_?.code} is already up-to-date.`);
//       }
//     } else {
//       const r = await prisma.hotels.create({
//         data: {
//           hotelCode: hotel_?.code,
//           ...hotelData,
//         },
//       });

//       if (r) {
//         console.log("New Hotel Record Added");
//         hotelId = r.id;
//       }
//     }

//     //If hotel is updated or changed...
//     if (hotelId) {
//       //1. Adding rooms.
//       const rooms = hotel_.rooms;
//       console.log("API HAS ROOMS: ", rooms.length);
//       for (const room of rooms) {
//         const roomData = {
//           roomCode: room.roomCode,
//           roomType: room.roomType,
//           description: room.description,
//         };
//         const alreadyAvailable = await prisma.hotelRooms.findFirst({
//           where: {
//             hotel_id: hotelId,
//             roomCode: roomData.roomCode,
//           },
//         });

//         if (alreadyAvailable) {
//           const updated = await prisma.hotelRooms.update({
//             where: {
//               id: alreadyAvailable.id,
//             },
//             data: {
//               roomType: roomData.roomType,
//               description: roomData.description,
//             },
//           });
//           if (updated) {
//             console.log("Room Updated");
//           }
//         } else {
//           const insertRoom = await prisma.hotelRooms.create({
//             data: {
//               hotel_id: hotelId,
//               roomCode: roomData.roomCode,
//               roomType: roomData.roomType,
//               description: roomData.description,
//             },
//           });
//           if (insertRoom) {
//             console.log("New room added.");
//           }
//         }
//       }

//       //2. Adding HotelImages:
//       const hotelImages = hotel_.images;
//       console.log("API HAS Images: ", hotelImages.length);

//       const hotelImagesMapped = hotelImages.map((image: any) => ({
//         hotel_id: hotelId,
//         imageTypeCode: image.imageTypeCode,
//         path: image.path,
//         roomCode: image.roomCode,
//         roomType: image.roomType,
//         visualOrder: image.visualOrder,
//       }));

//       for (const imageData of hotelImagesMapped) {
//         // Check if the image already exists
//         const existingImage = await prisma.hotelImages.findFirst({
//           where: {
//             hotel_id: imageData.hotel_id,
//             imageTypeCode: imageData.imageTypeCode,
//             roomCode: imageData.roomCode,
//           },
//         });

//         if (existingImage) {
//           const imageUpdate = await prisma.hotelImages.update({
//             where: {
//               id: existingImage.id, // Find the image by its unique ID
//             },
//             data: {
//               path: imageData.path,
//               roomType: imageData.roomType,
//               visualOrder: imageData.visualOrder,
//             },
//           });
//           if (imageUpdate) {
//             console.log("Image updated");
//           }
//         } else {
//           // If the image does not exist, create a new one
//           const imageAdded = await prisma.hotelImages.create({
//             data: {
//               hotel_id: imageData.hotel_id,
//               imageTypeCode: imageData.imageTypeCode,
//               path: imageData.path,
//               roomCode: imageData.roomCode,
//               roomType: imageData.roomType,
//               visualOrder: imageData.visualOrder,
//             },
//           });
//           if (imageAdded) {
//             console.log("Image added");
//           }
//         }
//       }

//       //3. Adding address:
//       // const phoneNumbers = hotel.phones?.map((phone: any) => ({
//       //   phoneNumber: phone?.phoneNumber,
//       //   phoneType: phone?.phoneType,
//       // }));

//       // 4. ADding facilities:

//       const facilities = hotel_.facilities;
//       // console.log(facilities);

//       for (let fac of facilities) {
//         const facilityData = {
//           facilityCode: fac?.facilityCode,
//           facilityName: fac?.facilityName,
//           description: fac?.description,
//           currency: fac?.currency,
//           ageFrom: fac?.ageFrom,
//           ageTo: fac?.ageTo,
//           dateFrom: fac?.dateFrom,
//           dateTo: fac?.dateTo,
//           indFee: fac?.indFee,
//           voucher: fac?.voucher,
//         };
//         const existingFacility = await prisma.hotelFacilities.findFirst({
//           where: {
//             hotel_id: hotelId,
//             facilityCode: facilityData.facilityCode, // Unique check: hotel_id + facilityCode
//           },
//         });

//         if (existingFacility) {
//           // If the facility exists, update it
//           const facUpdated = await prisma.hotelFacilities.update({
//             where: {
//               id: existingFacility.id,
//             },
//             data: {
//               facilityName: facilityData.facilityName,
//               description: facilityData.description,
//               currency: facilityData.currency,
//               ageFrom: facilityData.ageFrom,
//               ageTo: facilityData.ageTo,
//               dateFrom: facilityData.dateFrom,
//               dateTo: facilityData.dateTo,
//               indFee: facilityData.indFee,
//               voucher: facilityData.voucher,
//             },
//           });

//           if (facUpdated) {
//             console.log("Facility Updated.");
//           }
//         } else {
//           const facAdded = await prisma.hotelFacilities.create({
//             data: {
//               hotel_id: hotelId,
//               ...facilityData,
//             },
//           });
//           if (facAdded) {
//             console.log("New facility is added");
//           }
//         }
//       }
//     }
//   }
// }

const hotelDetails = {
  code: 19387,
  name: {
    content: "Blue Tree Premium Paulista",
  },
  description: {
    content:
      "Blue Tree Premium Paulista is centrally located in São Paulo just 12 km from Congonhas Airport and 30 km from Guarulhos Airport. This hotel is ideal for business and leisure travelers. Rooms are elegantly designed, with modern amenities and functional spaces. The hotel has rooms that are equipped with modern conference technology, which is sure to impress, and leisure facilities to ensure a comfortable stay for all types of travellers. \nHotel charges R$6. 00/day tourist tax. \n\nWe are making improvements to some areas of the hotel, including the lobby and common areas, and access to certain areas may be temporarily restricted, but alternatives will be made available. Our services and support will continue to operate normally. \nSauna temporarily disabled. ",
  },
  countryCode: "BR",
  stateCode: "SP",
  destinationCode: "SAO",
  zoneCode: 1,
  coordinates: {
    longitude: -46.655971,
    latitude: -23.560238,
  },
  categoryCode: "4EST",
  categoryGroupCode: "GRUPO4",
  chainCode: "BLUET",
  accommodationTypeCode: "H",
  boardCodes: ["BB", "AI", "HB", "FB", "RO", "DB", "CB"],
  segmentCodes: [34],
  address: {
    content: "Rua Peixoto Gomide 707",
    street: "Rua Peixoto Gomide 707",
  },
  postalCode: "01409-001",
  city: {
    content: "SAO PAULO",
  },
  email: "reservas@bluetree.com.br",
  giataCode: 54987,
  phones: [
    {
      phoneNumber: "+551101409001",
      phoneType: "PHONEBOOKING",
    },
    {
      phoneNumber: "+551101409001",
      phoneType: "PHONEHOTEL",
    },
    {
      phoneNumber: "+551131477000",
      phoneType: "FAXNUMBER",
    },
  ],
  rooms: [
    {
      roomCode: "BED.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "BED",
      characteristicCode: "ST",
    },
    {
      roomCode: "DBL.DB-SU",
      isParentRoom: true,
      minPax: 1,
      maxPax: 3,
      maxAdults: 2,
      maxChildren: 1,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DB-SU",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "5179",
    },
    {
      roomCode: "DBL.DX",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: true,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 294,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "2946",
    },
    {
      roomCode: "DBL.DX-1",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-1",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2946",
    },
    {
      roomCode: "DBL.DX-2",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-2",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2946",
    },
    {
      roomCode: "DBL.DX-3",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-3",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2946",
    },
    {
      roomCode: "DBL.DX-4",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-4",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2976",
    },
    {
      roomCode: "DBL.DX-5",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-5",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2976",
    },
    {
      roomCode: "DBL.DX-6",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-6",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2976",
    },
    {
      roomCode: "DBL.DX-GD",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-GD",
    },
    {
      roomCode: "DBL.DX-PE",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-PE",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2976",
    },
    {
      roomCode: "DBL.DX-SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "DX-SU",
    },
    {
      roomCode: "DBL.EY",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "EY",
    },
    {
      roomCode: "DBL.GD-SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "GD-SU",
    },
    {
      roomCode: "DBL.LX",
      isParentRoom: true,
      minPax: 1,
      maxPax: 3,
      maxAdults: 2,
      maxChildren: 1,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "LX",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "10",
    },
    {
      roomCode: "DBL.LX-1",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "LX-1",
    },
    {
      roomCode: "DBL.PE",
      isParentRoom: true,
      minPax: 1,
      maxPax: 3,
      maxAdults: 2,
      maxChildren: 1,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "PE",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "294",
    },
    {
      roomCode: "DBL.PE-1",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "PE-1",
    },
    {
      roomCode: "DBL.QN",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "QN",
    },
    {
      roomCode: "DBL.QN-SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "QN-SU",
    },
    {
      roomCode: "DBL.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "ST",
    },
    {
      roomCode: "DBL.SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 3,
      maxAdults: 2,
      maxChildren: 1,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "SU",
      roomFacilities: [
        {
          facilityCode: 10,
          facilityGroupCode: 60,
          indLogic: true,
          number: 1,
          voucher: false,
        },
        {
          facilityCode: 50,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 80,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 160,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 170,
          facilityGroupCode: 60,
          indLogic: true,
          voucher: false,
        },
        {
          facilityCode: 190,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 195,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: false,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "4",
    },
    {
      roomCode: "DBL.SU-1",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "SU-1",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "5179",
    },
    {
      roomCode: "DBL.SU-2",
      isParentRoom: true,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "SU-2",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "5179",
    },
    {
      roomCode: "DBL.SU-3",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "SU-3",
    },
    {
      roomCode: "DBL.PI",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBL",
      characteristicCode: "PI",
    },
    {
      roomCode: "DBT.DX-PE",
      isParentRoom: false,
      minPax: 1,
      maxPax: 6,
      maxAdults: 6,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBT",
      characteristicCode: "DX-PE",
    },
    {
      roomCode: "DBT.DX-SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 6,
      maxAdults: 6,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBT",
      characteristicCode: "DX-SU",
    },
    {
      roomCode: "DBT.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 6,
      maxAdults: 6,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBT",
      characteristicCode: "ST",
    },
    {
      roomCode: "DBT.SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 6,
      maxAdults: 6,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBT",
      characteristicCode: "SU",
    },
    {
      roomCode: "DBT.PI",
      isParentRoom: false,
      minPax: 1,
      maxPax: 6,
      maxAdults: 6,
      maxChildren: 3,
      minAdults: 1,
      roomType: "DBT",
      characteristicCode: "PI",
    },
    {
      roomCode: "DUS.DX",
      isParentRoom: false,
      minPax: 1,
      maxPax: 2,
      maxAdults: 1,
      maxChildren: 1,
      minAdults: 1,
      roomType: "DUS",
      characteristicCode: "DX",
    },
    {
      roomCode: "DUS.SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 2,
      maxAdults: 1,
      maxChildren: 1,
      minAdults: 1,
      roomType: "DUS",
      characteristicCode: "SU",
    },
    {
      roomCode: "ROO.DX-PI",
      isParentRoom: false,
      minPax: 1,
      maxPax: 10,
      maxAdults: 10,
      maxChildren: 6,
      minAdults: 1,
      roomType: "ROO",
      characteristicCode: "DX-PI",
    },
    {
      roomCode: "ROO.RO",
      isParentRoom: false,
      minPax: 1,
      maxPax: 10,
      maxAdults: 10,
      maxChildren: 6,
      minAdults: 1,
      roomType: "ROO",
      characteristicCode: "RO",
    },
    {
      roomCode: "ROO.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 10,
      maxAdults: 10,
      maxChildren: 6,
      minAdults: 1,
      roomType: "ROO",
      characteristicCode: "ST",
    },
    {
      roomCode: "ROO.SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 10,
      maxAdults: 10,
      maxChildren: 6,
      minAdults: 1,
      roomType: "ROO",
      characteristicCode: "SU",
    },
    {
      roomCode: "ROO.PI",
      isParentRoom: false,
      minPax: 1,
      maxPax: 10,
      maxAdults: 10,
      maxChildren: 6,
      minAdults: 1,
      roomType: "ROO",
      characteristicCode: "PI",
    },
    {
      roomCode: "SGL.2B-1",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "2B-1",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2945",
    },
    {
      roomCode: "SGL.2B-2",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "2B-2",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2945",
    },
    {
      roomCode: "SGL.DX",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "DX",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: true,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 1,
              facilityGroupCode: 61,
              number: 2,
            },
          ],
        },
      ],
      PMSRoomCode: "5180",
    },
    {
      roomCode: "SGL.DX-1",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "DX-1",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "5180",
    },
    {
      roomCode: "SGL.DX-2",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "DX-2",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "5180",
    },
    {
      roomCode: "SGL.DX-PE",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "DX-PE",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "27956",
    },
    {
      roomCode: "SGL.LX",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "LX",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: false,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "12",
    },
    {
      roomCode: "SGL.LX-1",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "LX-1",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "27956",
    },
    {
      roomCode: "SGL.LX-2",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "LX-2",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "27956",
    },
    {
      roomCode: "SGL.PE",
      isParentRoom: false,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "PE",
      roomFacilities: [
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: false,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 1,
              facilityGroupCode: 61,
              number: 1,
            },
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "294",
    },
    {
      roomCode: "SGL.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "ST",
    },
    {
      roomCode: "SGL.SU",
      isParentRoom: false,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "SU",
      roomFacilities: [
        {
          facilityCode: 10,
          facilityGroupCode: 60,
          indLogic: true,
          number: 1,
          voucher: false,
        },
        {
          facilityCode: 50,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 80,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 160,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 170,
          facilityGroupCode: 60,
          indLogic: true,
          voucher: false,
        },
        {
          facilityCode: 190,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 195,
          facilityGroupCode: 60,
          indLogic: true,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: false,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 150,
              facilityGroupCode: 61,
              number: 1,
            },
          ],
        },
      ],
      PMSRoomCode: "4",
    },
    {
      roomCode: "SGL.SU-1",
      isParentRoom: false,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "SU-1",
    },
    {
      roomCode: "SGL.2B",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "2B",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "2945",
    },
    {
      roomCode: "SGL.2B-DX",
      isParentRoom: true,
      minPax: 1,
      maxPax: 1,
      maxAdults: 1,
      maxChildren: 0,
      minAdults: 1,
      roomType: "SGL",
      characteristicCode: "2B-DX",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "5180",
    },
    {
      roomCode: "STU.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 5,
      maxAdults: 5,
      maxChildren: 3,
      minAdults: 1,
      roomType: "STU",
      characteristicCode: "ST",
    },
    {
      roomCode: "SUI.PI-1",
      isParentRoom: true,
      minPax: 1,
      maxPax: 8,
      maxAdults: 8,
      maxChildren: 5,
      minAdults: 1,
      roomType: "SUI",
      characteristicCode: "PI-1",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "29369",
    },
    {
      roomCode: "SUI.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 8,
      maxAdults: 8,
      maxChildren: 5,
      minAdults: 1,
      roomType: "SUI",
      characteristicCode: "ST",
    },
    {
      roomCode: "SUI.PI",
      isParentRoom: true,
      minPax: 1,
      maxPax: 8,
      maxAdults: 8,
      maxChildren: 5,
      minAdults: 1,
      roomType: "SUI",
      characteristicCode: "PI",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
      PMSRoomCode: "29369",
    },
    {
      roomCode: "TLN.SU",
      isParentRoom: false,
      minPax: 2,
      maxPax: 7,
      maxAdults: 7,
      maxChildren: 6,
      minAdults: 1,
      roomType: "TLN",
      characteristicCode: "SU",
    },
    {
      roomCode: "TWN.DX",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "DX",
    },
    {
      roomCode: "TWN.DX-PE",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "DX-PE",
    },
    {
      roomCode: "TWN.LX-1",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "LX-1",
    },
    {
      roomCode: "TWN.ST",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "ST",
    },
    {
      roomCode: "TWN.SU",
      isParentRoom: true,
      minPax: 1,
      maxPax: 2,
      maxAdults: 2,
      maxChildren: 1,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "SU",
      roomFacilities: [
        {
          facilityCode: 100,
          facilityGroupCode: 60,
          indLogic: false,
          indFee: false,
          voucher: false,
        },
        {
          facilityCode: 220,
          facilityGroupCode: 60,
          indLogic: false,
          number: 0,
          voucher: false,
        },
        {
          facilityCode: 250,
          facilityGroupCode: 60,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 261,
          facilityGroupCode: 60,
          indFee: false,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 295,
          facilityGroupCode: 60,
          number: 28,
          indYesOrNo: true,
          voucher: false,
        },
        {
          facilityCode: 298,
          facilityGroupCode: 60,
          indLogic: false,
          number: 1,
          voucher: false,
        },
      ],
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
          roomStayFacilities: [
            {
              facilityCode: 1,
              facilityGroupCode: 61,
              number: 2,
            },
          ],
        },
      ],
      PMSRoomCode: "5",
    },
    {
      roomCode: "TWN.SU-1",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "SU-1",
    },
    {
      roomCode: "TWN.PI",
      isParentRoom: false,
      minPax: 1,
      maxPax: 4,
      maxAdults: 4,
      maxChildren: 3,
      minAdults: 1,
      roomType: "TWN",
      characteristicCode: "PI",
    },
  ],
  facilities: [
    {
      facilityCode: 20,
      facilityGroupCode: 10,
      order: 1,
      number: 2001,
      voucher: false,
    },
    {
      facilityCode: 70,
      facilityGroupCode: 10,
      order: 1,
      indYesOrNo: true,
      number: 240,
      voucher: false,
    },
    {
      facilityCode: 50,
      facilityGroupCode: 10,
      order: 1,
      number: 24,
      voucher: false,
    },
    {
      facilityCode: 124,
      facilityGroupCode: 10,
      order: 1,
      number: 1,
      voucher: false,
    },
    {
      facilityCode: 10,
      facilityGroupCode: 20,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 10,
      facilityGroupCode: 30,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 40,
      facilityGroupCode: 30,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 50,
      facilityGroupCode: 30,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 60,
      facilityGroupCode: 30,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 260,
      facilityGroupCode: 60,
      order: 1,
      indLogic: false,
      voucher: false,
    },
    {
      facilityCode: 20,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      voucher: false,
    },
    {
      facilityCode: 30,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      voucher: false,
    },
    {
      facilityCode: 40,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 280,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 281,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 304,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 55,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 289,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 120,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 200,
      facilityGroupCode: 60,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 287,
      facilityGroupCode: 60,
      order: 1,
      indYesOrNo: false,
      voucher: false,
    },
    {
      facilityCode: 275,
      facilityGroupCode: 60,
      order: 1,
      indLogic: false,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 264,
      facilityGroupCode: 60,
      order: 1,
      indLogic: false,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 295,
      facilityGroupCode: 70,
      order: 1,
      indYesOrNo: false,
      voucher: false,
    },
    {
      facilityCode: 320,
      facilityGroupCode: 70,
      order: 1,
      indFee: true,
      indYesOrNo: true,
      amount: 38,
      currency: "BRL",
      applicationType: "UN",
      voucher: true,
    },
    {
      facilityCode: 30,
      facilityGroupCode: 70,
      order: 1,
      indYesOrNo: true,
      voucher: false,
    },
    {
      facilityCode: 260,
      facilityGroupCode: 70,
      order: 1,
      timeFrom: "14:00:00",
      timeTo: "00:00:00",
      voucher: true,
    },
    {
      facilityCode: 390,
      facilityGroupCode: 70,
      order: 1,
      timeTo: "12:00:00",
      voucher: false,
    },
    {
      facilityCode: 240,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 250,
      facilityGroupCode: 70,
      order: 1,
      indLogic: false,
      indFee: true,
      voucher: false,
    },
    {
      facilityCode: 550,
      facilityGroupCode: 70,
      order: 1,
      indFee: false,
      indYesOrNo: true,
      voucher: false,
    },
    {
      facilityCode: 270,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 280,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: true,
      voucher: false,
    },
    {
      facilityCode: 505,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 10,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      voucher: false,
    },
    {
      facilityCode: 40,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 70,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 585,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 470,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 559,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 578,
      facilityGroupCode: 70,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 130,
      facilityGroupCode: 71,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 200,
      facilityGroupCode: 71,
      order: 1,
      indLogic: true,
      voucher: false,
    },
    {
      facilityCode: 220,
      facilityGroupCode: 71,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 575,
      facilityGroupCode: 71,
      order: 1,
      indLogic: true,
      voucher: false,
    },
    {
      facilityCode: 170,
      facilityGroupCode: 72,
      order: 1,
      indLogic: true,
      number: 5,
      voucher: false,
    },
    {
      facilityCode: 575,
      facilityGroupCode: 72,
      order: 1,
      indLogic: true,
      voucher: false,
    },
    {
      facilityCode: 605,
      facilityGroupCode: 72,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 360,
      facilityGroupCode: 73,
      order: 1,
      indFee: false,
      number: 1,
      voucher: false,
    },
    {
      facilityCode: 395,
      facilityGroupCode: 73,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 420,
      facilityGroupCode: 74,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 40,
      facilityGroupCode: 80,
      order: 1,
      indLogic: true,
      timeFrom: "06:00:00",
      timeTo: "10:00:00",
      voucher: false,
    },
    {
      facilityCode: 562,
      facilityGroupCode: 85,
      order: 1,
      indLogic: true,
      indFee: false,
      voucher: false,
    },
    {
      facilityCode: 89,
      facilityGroupCode: 91,
      order: 1,
      indLogic: true,
      dateTo: "2049-12-31",
      voucher: false,
    },
  ],
  terminals: [
    {
      terminalCode: "CGH",
      distance: 9,
    },
    {
      terminalCode: "GRU",
      distance: 28,
    },
  ],
  issues: [
    {
      issueCode: "DECLARATION",
      issueType: "DECLARATION",
      dateFrom: "2015-03-22",
      dateTo: "2040-12-31",
      order: 1,
      alternative: false,
    },
  ],
  interestPoints: [
    {
      facilityCode: 10,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Avenida Paulista  ",
      distance: "20",
    },
    {
      facilityCode: 40,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Centro de Convenções Rebouças ",
      distance: "2000",
    },
    {
      facilityCode: 30,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Centro de Convenções Frei Caneca ",
      distance: "500",
    },
    {
      facilityCode: 20,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Shopping Paulista ",
      distance: "500",
    },
  ],
  images: [
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_009.jpg",
      order: 9,
      visualOrder: 505,
    },
    {
      imageTypeCode: "DEP",
      path: "01/019387/019387a_hb_f_002.jpg",
      order: 2,
      visualOrder: 802,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_005.jpg",
      order: 5,
      visualOrder: 502,
    },
    {
      imageTypeCode: "DEP",
      path: "01/019387/019387a_hb_f_001.jpg",
      order: 1,
      visualOrder: 801,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_006.jpg",
      order: 6,
      visualOrder: 503,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_008.jpg",
      order: 8,
      visualOrder: 501,
    },
    {
      imageTypeCode: "COM",
      path: "01/019387/019387a_hb_l_001.jpg",
      order: 1,
      visualOrder: 101,
    },
    {
      imageTypeCode: "COM",
      path: "01/019387/019387a_hb_l_003.jpg",
      order: 3,
      visualOrder: 105,
    },
    {
      imageTypeCode: "COM",
      path: "01/019387/019387a_hb_l_002.jpg",
      order: 2,
      visualOrder: 104,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019387/019387a_hb_p_002.jpg",
      order: 2,
      visualOrder: 402,
    },
    {
      imageTypeCode: "BAR",
      path: "01/019387/019387a_hb_ba_001.jpg",
      order: 1,
      visualOrder: 602,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019387/019387a_hb_p_001.jpg",
      order: 1,
      visualOrder: 401,
    },
    {
      imageTypeCode: "BAR",
      path: "01/019387/019387a_hb_ba_002.jpg",
      order: 2,
      visualOrder: 601,
    },
    {
      imageTypeCode: "COM",
      path: "01/019387/019387a_hb_l_005.jpg",
      order: 5,
      visualOrder: 102,
    },
    {
      imageTypeCode: "COM",
      path: "01/019387/019387a_hb_l_004.jpg",
      order: 4,
      visualOrder: 106,
    },
    {
      imageTypeCode: "COM",
      path: "01/019387/019387a_hb_l_006.jpg",
      order: 6,
      visualOrder: 103,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019387/019387a_hb_p_004.jpg",
      order: 4,
      visualOrder: 405,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019387/019387a_hb_p_003.jpg",
      order: 3,
      visualOrder: 404,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019387/019387a_hb_p_006.jpg",
      order: 6,
      visualOrder: 406,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019387/019387a_hb_p_007.jpg",
      order: 7,
      visualOrder: 403,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_010.jpg",
      roomCode: "DBL.DX-1",
      roomType: "DBL",
      characteristicCode: "DX-1",
      order: 10,
      visualOrder: 310,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_001.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 1,
      visualOrder: 317,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_006.jpg",
      roomCode: "DBL.DX",
      roomType: "DBL",
      characteristicCode: "DX",
      order: 6,
      visualOrder: 312,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_005.jpg",
      roomCode: "SGL.LX",
      roomType: "SGL",
      characteristicCode: "LX",
      order: 5,
      visualOrder: 314,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_020.jpg",
      roomCode: "TWN.SU",
      roomType: "TWN",
      characteristicCode: "SU",
      order: 20,
      visualOrder: 321,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_027.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 27,
      visualOrder: 304,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_029.jpg",
      roomCode: "DBL.PE",
      roomType: "DBL",
      characteristicCode: "PE",
      order: 29,
      visualOrder: 305,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_031.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 32,
      visualOrder: 306,
    },
    {
      imageTypeCode: "GEN",
      path: "01/019387/019387a_hb_a_008.jpg",
      order: 8,
      visualOrder: 11,
    },
    {
      imageTypeCode: "CON",
      path: "01/019387/019387a_hb_k_002.jpg",
      order: 2,
      visualOrder: 703,
    },
    {
      imageTypeCode: "GEN",
      path: "01/019387/019387a_hb_a_007.jpg",
      order: 7,
      visualOrder: 10,
    },
    {
      imageTypeCode: "CON",
      path: "01/019387/019387a_hb_k_001.jpg",
      order: 1,
      visualOrder: 702,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_035.jpg",
      roomCode: "DBL.DB-SU",
      roomType: "DBL",
      characteristicCode: "DB-SU",
      order: 35,
      visualOrder: 308,
    },
    {
      imageTypeCode: "GEN",
      path: "01/019387/019387a_hb_a_009.jpg",
      order: 9,
      visualOrder: 9,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_009.jpg",
      roomCode: "SGL.DX-1",
      roomType: "SGL",
      characteristicCode: "DX-1",
      order: 9,
      visualOrder: 315,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_027.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 28,
      visualOrder: 304,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_029.jpg",
      roomCode: "DBL.PE",
      roomType: "DBL",
      characteristicCode: "PE",
      order: 30,
      visualOrder: 305,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_008.jpg",
      roomCode: "DBL.DX-SU",
      roomType: "DBL",
      characteristicCode: "DX-SU",
      order: 8,
      visualOrder: 311,
    },
    {
      imageTypeCode: "CON",
      path: "01/019387/019387a_hb_k_004.jpg",
      order: 4,
      visualOrder: 701,
    },
    {
      imageTypeCode: "CON",
      path: "01/019387/019387a_hb_k_003.jpg",
      order: 3,
      visualOrder: 701,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_018.jpg",
      roomCode: "SGL.SU",
      roomType: "SGL",
      characteristicCode: "SU",
      order: 18,
      visualOrder: 318,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_007.jpg",
      roomCode: "SGL.DX",
      roomType: "SGL",
      characteristicCode: "DX",
      order: 7,
      visualOrder: 316,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_004.jpg",
      roomCode: "DBL.LX",
      roomType: "DBL",
      characteristicCode: "LX",
      order: 4,
      visualOrder: 309,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_010.jpg",
      order: 10,
      visualOrder: 506,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_011.jpg",
      order: 11,
      visualOrder: 507,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_033.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 33,
      visualOrder: 307,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_012.jpg",
      order: 12,
      visualOrder: 508,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_013.jpg",
      order: 13,
      visualOrder: 509,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_031.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 31,
      visualOrder: 306,
    },
    {
      imageTypeCode: "RES",
      path: "01/019387/019387a_hb_r_014.jpg",
      order: 14,
      visualOrder: 504,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_023.jpg",
      roomCode: "DBL.PE",
      roomType: "DBL",
      characteristicCode: "PE",
      order: 24,
      visualOrder: 302,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_033.jpg",
      roomCode: "SGL.PE",
      roomType: "SGL",
      characteristicCode: "PE",
      order: 34,
      visualOrder: 307,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_012.jpg",
      roomCode: "DBL.SU",
      roomType: "DBL",
      characteristicCode: "SU",
      order: 12,
      visualOrder: 313,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019387/019387a_hb_ro_023.jpg",
      roomCode: "DBL.PE",
      roomType: "DBL",
      characteristicCode: "PE",
      order: 23,
      visualOrder: 302,
    },
  ],
  wildcards: [
    {
      roomType: "SGL.2B-2",
      roomCode: "SGL",
      characteristicCode: "2B-2",
      hotelRoomDescription: {
        content: "Single Two Beds Capacity 01",
      },
    },
    {
      roomType: "SGL.PE",
      roomCode: "SGL",
      characteristicCode: "PE",
      hotelRoomDescription: {
        content: "Luxury Premier Double Bed Capacity 01",
      },
    },
    {
      roomType: "SGL.2B-1",
      roomCode: "SGL",
      characteristicCode: "2B-1",
      hotelRoomDescription: {
        content: "Single Two Beds",
      },
    },
    {
      roomType: "DBL.LX",
      roomCode: "DBL",
      characteristicCode: "LX",
      hotelRoomDescription: {
        content: "Luxury Double Bed",
      },
    },
    {
      roomType: "SGL.SU",
      roomCode: "SGL",
      characteristicCode: "SU",
      hotelRoomDescription: {
        content: "Superior Double Bed Capacity 01",
      },
    },
    {
      roomType: "DBL.DB-SU",
      roomCode: "DBL",
      characteristicCode: "DB-SU",
      hotelRoomDescription: {
        content: "Double Superior with Double Bed",
      },
    },
    {
      roomType: "DBL.SU",
      roomCode: "DBL",
      characteristicCode: "SU",
      hotelRoomDescription: {
        content: "Superior Double Bed",
      },
    },
    {
      roomType: "SGL.DX-1",
      roomCode: "SGL",
      characteristicCode: "DX-1",
      hotelRoomDescription: {
        content: "DELUXE SUPERIOR",
      },
    },
    {
      roomType: "TWN.SU",
      roomCode: "TWN",
      characteristicCode: "SU",
      hotelRoomDescription: {
        content: "Superior Two Beds",
      },
    },
    {
      roomType: "DBL.PE",
      roomCode: "DBL",
      characteristicCode: "PE",
      hotelRoomDescription: {
        content: "Luxury Premier Double Bed",
      },
    },
    {
      roomType: "DBL.DX-1",
      roomCode: "DBL",
      characteristicCode: "DX-1",
      hotelRoomDescription: {
        content: "DELUXE SUPERIOR",
      },
    },
    {
      roomType: "SGL.LX",
      roomCode: "SGL",
      characteristicCode: "LX",
      hotelRoomDescription: {
        content: "Luxury Double Bed Capacity 01",
      },
    },
  ],
  web: "www.bluetree.com.br",
  lastUpdate: "2024-11-01",
  S2C: "2*",
  ranking: 27,
};

const hotelObj = {
  code: 19401,
  name: {
    content: "Novotel Salvador Rio Vermelho",
  },
  description: {
    content:
      "Novotel Salvador Rio Vermelho is perfect for work and leisure. The rooms are comfortable, have a balcony and some have an incredible sea view. There are also options for greater family comfort. Other hotel attractions include a swimming pool with a privileged sea view, pool bar, gym and kids space. Enjoy a balanced breakfast with regional items at the restaurant. ",
  },
  countryCode: "BR",
  stateCode: "BA",
  destinationCode: "SVD",
  zoneCode: 1,
  coordinates: {
    longitude: -38.487293,
    latitude: -13.015148,
  },
  categoryCode: "4EST",
  categoryGroupCode: "GRUPO4",
  chainCode: "ACCOR",
  accommodationTypeCode: "H",
  boardCodes: ["BB", "AI", "HB", "FB", "RO", "CB"],
  segmentCodes: [34],
  address: {
    content: "Rua Monte Conselho 505 Rio Vermelho",
    street: "Rua Monte Conselho 505 Rio Vermelho",
  },
  postalCode: "41940370",
  city: {
    content: "Salvador",
  },
  email: "HB275-RE@ACCOR.COM",
  giataCode: 51393,
  phones: [
    {
      phoneNumber: "+557121032233",
      phoneType: "PHONEBOOKING",
    },
    {
      phoneNumber: "+557121032233",
      phoneType: "PHONEHOTEL",
    },
    {
      phoneNumber: "+557121032200",
      phoneType: "FAXNUMBER",
    },
  ],
  rooms: [
    {
      roomCode: "APT.CV-KG",
      isParentRoom: false,
      minPax: 1,
      maxPax: 2,
      maxAdults: 2,
      maxChildren: 1,
      minAdults: 1,
      roomType: "APT",
      characteristicCode: "CV-KG",
      roomStays: [
        {
          stayType: "BED",
          order: "1",
          description: "Bed room",
        },
      ],
    },
    {
      roomCode: "APT.DX-VM",
      isParentRoom: false,
      minPax: 1,
      maxPax: 10,
      maxAdults: 10,
      maxChildren: 6,
      minAdults: 1,
      roomType: "APT",
      characteristicCode: "DX-VM",
    },
  ],
  facilities: [
    {
      facilityCode: 124,
      facilityGroupCode: 10,
      order: 1,
      number: 2,
      voucher: false,
    },

    {
      facilityCode: 260,
      facilityGroupCode: 70,
      order: 1,
      timeFrom: "12:00:00",
      voucher: true,
    },
    {
      facilityCode: 390,
      facilityGroupCode: 70,
      order: 1,
      timeTo: "12:00:00",
      voucher: false,
    },
  ],
  issues: [
    {
      issueCode: "DECLARATION",
      issueType: "DECLARATION",
      dateFrom: "2015-03-22",
      dateTo: "2040-12-31",
      order: 1,
      alternative: false,
    },
  ],
  interestPoints: [
    {
      facilityCode: 40,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Farol da Barra",
      distance: "5000",
    },
    {
      facilityCode: 30,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Praia da Barra",
      distance: "4600",
    },
    {
      facilityCode: 20,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Arena Fonte Nova",
      distance: "4400",
    },
    {
      facilityCode: 50,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Pelourinho",
      distance: "5200",
    },
    {
      facilityCode: 10,
      facilityGroupCode: 100,
      order: 1,
      poiName: "Shopping Iguatemi",
      distance: "4400",
    },
  ],
  images: [
    {
      imageTypeCode: "DEP",
      path: "01/019401/019401a_hb_f_006_20250303_180104.jpg",
      order: 6,
      visualOrder: 806,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019401/019401a_hb_ro_089.jpg",
      roomCode: "APT.CV-KG",
      roomType: "APT",
      characteristicCode: "CV-KG",
      order: 89,
      visualOrder: 358,
    },

    {
      imageTypeCode: "DEP",
      path: "01/019401/019401a_hb_f_004_20250303_180101.jpg",
      order: 4,
      visualOrder: 804,
    },
    {
      imageTypeCode: "HAB",
      path: "01/019401/019401a_hb_ro_080.jpg",
      roomCode: "DBL.DX-KG",
      roomType: "DBL",
      characteristicCode: "DX-KG",
      order: 80,
      visualOrder: 368,
    },
    {
      imageTypeCode: "PIS",
      path: "01/019401/019401a_hb_p_002.jpg",
      order: 2,
      visualOrder: 401,
    },
  ],
  wildcards: [
    {
      roomType: "FAM.LX",
      roomCode: "FAM",
      characteristicCode: "LX",
      hotelRoomDescription: {
        content: "FAMILY LUXURY SINGLE",
      },
    },
    {
      roomType: "DBL.SU-WV",
      roomCode: "DBL",
      characteristicCode: "SU-WV",
      hotelRoomDescription: {
        content: "Superior Beach View Room - 1 king-size bed",
      },
    },
    {
      roomType: "DBL.KG-6",
      roomCode: "DBL",
      characteristicCode: "KG-6",
      hotelRoomDescription: {
        content: "Standard Room - 1 king-size bed",
      },
    },
  ],
  web: "https://www.accorhotels.com/es/hotel-B275-novotel-salvador-rio-vermelho-/index.shtml",
  lastUpdate: "2025-03-03",
  S2C: "2*",
  ranking: 16,
};
