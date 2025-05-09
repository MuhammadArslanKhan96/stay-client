import { getHotelImages } from "@/util/hotelImages";
import { capitalizeWords } from "@/util/wordCapitals";

type GetHotelsParams = {
  location?: string;
  lat?: string;
  lng?: string;
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  rooms: number;
};

export const getHotels = async (params: GetHotelsParams) => {
  const query = new URLSearchParams(params as any).toString();

  // console.log("URL Query: ", query);

  const res = await fetch(`/api/db/tophotels?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch hotels");

  const data = await res.json();

  const hotels = data?.data;
  console.log("Hotels from DB ... ", hotels);
  return transformHotels(hotels);
};

function transformHotels(dbHotels: any[]) {
  return dbHotels.map((hotel) => {
    const path = getHotelImages(hotel?.api_hotel_images, "original")?.[0].url;

    return {
      id: hotel.id,
      code: hotel?.code,
      price: Math.floor(Math.random() * 300) + 50,
      duration: Math.floor(Math.random() * 7) + 1,
      propertyType: "Hotel",
      amenities: "Wi-Fi",
      rating: (hotel.ranking / 10).toFixed(1),
      fuelType: "Vacation",
      location: capitalizeWords(hotel.city_content || "Unknown"),
      image: path ? path : "real1.png",
      name: hotel.name_content,
      rooms: hotel?._count?.api_hotel_rooms,
    };
  });
}

function getHotelImage(images: any) {
  if (!Array.isArray(images)) return null;
  console.log("Hotel images inside the available api, ", images);

  const matchedImage = images.findLast((img) => img?.image_type_code !== "HAB");
  return matchedImage?.path || null;
}
