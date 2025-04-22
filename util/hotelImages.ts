import { IMAGE_BASE_URL } from "./constant";

type ImageType = {
  path: string;
  room_code?: string;
  visual_order?: number;
  //'GEN', 'HAB', 'RES'
  image_type_code: string;
  image_order: number;
};

type FormattedImage = {
  url: string;
  visualOrder: number;
  type: string;
  roomCode?: string;
  imageOrder: number;
};

export function getHotelImages(
  images: ImageType[] = [],
  size: "xl" | "xxl" | "original" = "xl"
): FormattedImage[] {
  const baseUrl = `${IMAGE_BASE_URL}/${size}/`;

  return images
    .filter((img) => img.image_type_code === "GEN")
    .map((img) => ({
      url: `${baseUrl}${img.path}`,
      visualOrder: img.visual_order ?? 999,
      type: img.image_type_code,
      imageOrder: img?.image_order,
    }))
    .sort((a, b) => a.imageOrder - b.imageOrder);
}

// Rooms image
export function getRoomImages(
  images: ImageType[] = [],
  roomCode: string,
  size: "xl" | "xxl" | "original" = "xl"
): FormattedImage[] {
  const baseUrl = `${IMAGE_BASE_URL}/${size}/`;
  //   console.log("Images array form db is here: ", images);

  return images
    .filter(
      (img) => img.image_type_code === "HAB" && img.room_code === roomCode
    )
    .map((img) => ({
      url: `${baseUrl}${img.path}`,
      visualOrder: img.visual_order ?? 999,
      type: img.image_type_code,
      roomCode: img.room_code,
      imageOrder: img?.image_order ?? 0,
    }))
    .sort((a, b) => a.imageOrder - b.imageOrder);
}

export function getRestaurantImages(
  images: ImageType[] = [],
  size: "xl" | "xxl" | "original" = "xl"
): FormattedImage[] {
  const baseUrl = `${IMAGE_BASE_URL}/${size}/`;

  return images
    .filter((img) => img.image_type_code === "RES")
    .map((img) => ({
      url: `${baseUrl}${img.path}`,
      visualOrder: img.visual_order ?? 999,
      type: img.image_type_code,
      imageOrder: img?.image_order ?? 0,
    }))
    .sort((a, b) => a.imageOrder - b.imageOrder);
}
