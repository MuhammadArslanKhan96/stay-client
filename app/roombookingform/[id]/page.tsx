"use client";
import BookingForm from "@/components/Booking";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const router = usePathname();
  const [hotelCode, setHotelCode] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const url = router.split("/");
        const hotelCode = url[url.length - 1];
        console.log("hotel code: ", hotelCode);
        setHotelCode(hotelCode);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);
  return <BookingForm room={exampleRoom} />;
}

const exampleRoom = {
  id: 1,
  name: "Deluxe Ocean View Room",
  description:
    "Enjoy breathtaking views of the ocean from your private balcony in our spacious deluxe room. Perfect for couples or small families.",
  price: 249,
  capacity: 3,
  amenities: [
    "Free WiFi",
    "Air Conditioning",
    "King Size Bed",
    "Ocean View",
    "Mini Bar",
    "Coffee Maker",
    "Safe Deposit Box",
    "Daily Housekeeping",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
};

// /home/arsalan/projects/stay-client-admin/stay-client/app/roombookingform/[id]/page.tsx
