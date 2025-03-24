import { url } from "inspector";

const parentUrl = "https://api-services.beat.homes/gtw-web/api";

export const LOGIN_END_POINT = {
  url: `${parentUrl}/Login`,
  method: "POST",
};

export const HOTEL_END_POINT = {
  url: `${parentUrl}/Property/List`,
  method: "POST",
};

export const GET_PROPERTY_POINT = {
  url: "https://api-services.beat.homes/gtw-web/api/Property/Get",
  method: "POST",
};

export const RESERVE_BOOKING_POINT = {
  url: "https://api-services.beat.homes/gtw-web/api/Booking/RequestReservationToken",
  method: "POST",
};

export const SERVICE_END_POINT = {
  url: "https://api-services.beat.homes/gtw-web/api/Service/List",
  method: "GET",
};

export const BOOK_HOTEL_ENDPOINT = {
  url: "https://api-services.beat.homes/gtw-web/api/Booking/BuildBooking",
  method: "POST",
};
