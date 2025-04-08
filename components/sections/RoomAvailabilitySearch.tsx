"use client";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import MyDatePicker from "../elements/MyDatePicker";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimate } from "@/util/swiperOption";
import { ICountry, IState, ICity } from "country-state-city";
import { Country, State, City } from "country-state-city";

// Define types for the GuestSelector component
interface Guests {
  adults: number;
  children: number;
  rooms: number;
}

interface GuestSelectorProps {
  guests: Guests;
  onGuestsChange: (guests: Guests) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  guests,
  onGuestsChange,
}) => {
  const [adults, setAdults] = useState<number>(guests.adults);
  const [children, setChildren] = useState<number>(guests.children);
  const [rooms, setRooms] = useState<number>(guests.rooms);

  const handleChange = (type: keyof Guests, delta: number) => {
    if (type === "adults") {
      const newAdults = Math.max(1, adults + delta);
      setAdults(newAdults);
      onGuestsChange({ adults: newAdults, children, rooms });
    } else if (type === "children") {
      const newChildren = Math.max(0, children + delta);
      setChildren(newChildren);
      onGuestsChange({ adults, children: newChildren, rooms });
    } else if (type === "rooms") {
      const newRooms = Math.max(1, rooms + delta);
      setRooms(newRooms);
      onGuestsChange({ adults, children, rooms: newRooms });
    }
  };

  return (
    <div className="guest-selector ps-3">
      <div className="guest-option">
        <span>Adults</span>
        <button onClick={() => handleChange("adults", -1)}>-</button>
        <span>{adults}</span>
        <button onClick={() => handleChange("adults", 1)}>+</button>
      </div>
      <div className="guest-option">
        <span>Children</span>
        <button onClick={() => handleChange("children", -1)}>-</button>
        <span>{children}</span>
        <button onClick={() => handleChange("children", 1)}>+</button>
      </div>
      <div className="guest-option">
        <span>Rooms</span>
        <button onClick={() => handleChange("rooms", -1)}>-</button>
        <span>{rooms}</span>
        <button onClick={() => handleChange("rooms", 1)}>+</button>
      </div>
    </div>
  );
};

interface SearchParams {
  checkIn: string;
  checkOut: string;
  guests: Guests;
}

interface CheckFilterProps {
  miniField?: boolean;
}

export default function RoomAvailabilityChecker({
  onAvailabilityclick,
  loading,
}: any) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    checkIn: new Date().toISOString(),
    checkOut: new Date().toISOString(),
    guests: { adults: 2, children: 0, rooms: 1 },
  });
  useEffect(() => {
    const searchFilters: any = sessionStorage.getItem("search_filter");
    const searchFilterObject = JSON.parse(searchFilters);
    console.log("Session in hotel-details: ", searchFilterObject);
    if (searchFilterObject) {
      setSearchParams(() => ({
        checkIn: searchFilterObject.checkIn,
        checkOut: searchFilterObject.checkOut,
        guests: searchFilterObject.guests,
      }));
    }
  }, []);

  const handleCheckInChange = (date: string) => {
    setSearchParams((prev) => ({
      ...prev,
      checkIn: new Date(date).toISOString(),
    }));
  };

  const handleCheckOutChange = (date: string) => {
    setSearchParams((prev) => ({
      ...prev,
      checkOut: new Date(date).toISOString(),
    }));
  };

  const handleGuestsChange = (guests: Guests) => {
    setSearchParams((prev) => ({ ...prev, guests }));
  };

  const handleSearchClick = async () => {
    const bodyData = {
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      adults: searchParams.guests.adults,
      children: 0,
      rooms: searchParams.guests.rooms,
    };
    onAvailabilityclick(bodyData);
  };

  return (
    <>
      <div
        className="box-search-advance background-card wow fadeInUp background-body"
        style={{ top: "0px", margin: "10px 0px" }}
      >
        <div className="box-bottom-search background-card justify-content-center">
          <div className="item-search item-search-2">
            <label className="text-sm-bold neutral-500">Check In</label>
            <div className="box-calendar-date">
              <MyDatePicker
                onChange={handleCheckInChange}
                selectedDate={searchParams.checkIn}
              />
            </div>
          </div>
          <div className="item-search item-search-3">
            <label className="text-sm-bold neutral-500">Check Out</label>
            <div className="box-calendar-date">
              <MyDatePicker
                onChange={handleCheckOutChange}
                selectedDate={searchParams.checkOut}
              />
            </div>
          </div>

          <div className="item-search bd-none">
            <label className="text-sm-bold neutral-500">Guest</label>
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                className="btn btn-secondary dropdown-toggle btn-dropdown-search passenger-search"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {`${searchParams.guests.adults} adults, ${searchParams.guests.children} children, ${searchParams.guests.rooms} rooms`}
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul" className="dropdown-menu">
                <li>
                  <GuestSelector
                    guests={searchParams.guests}
                    onGuestsChange={handleGuestsChange}
                  />
                </li>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="item-search bd-none d-flex justify-content-end">
            <button
              className="btn btn-black-lg"
              onClick={handleSearchClick}
              disabled={loading}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              {loading ? "Searching" : "Search"}
            </button>
          </div>
        </div>
      </div>
      {/* {hotels.length > 0 && <HotelDisplayer hotels={hotels} />} */}
    </>
  );
}
