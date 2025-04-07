"use client";
import BookingForm from "@/components/Booking";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const router = usePathname();
  const [hotelCode, setHotelCode] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const url = router.split("/");
        const hotelCode = url[url.length - 1];
        console.log("hotel code: ", hotelCode);
        // Getting rooms:
        const roomsJson: any = sessionStorage.getItem("bookedRooms");
        const roomsArray = JSON.parse(roomsJson);

        const rooms = roomsArray.map((room: any) => ({
          id: room.code,
          name: room.name,
          adults: room.rates[0].adults,
          children: room.rates[0].children,
          price: room.rates[0].net,
          rateKey: room.rates[0].rateKey,
        }));
        setRooms(rooms);
        setHotelCode(hotelCode);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);
  return <BookingForm rooms={rooms} />;
}
