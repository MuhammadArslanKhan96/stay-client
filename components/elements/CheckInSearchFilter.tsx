"use client";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import MyDatePicker from "./MyDatePicker";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimate } from "@/util/swiperOption";

export default function Check() {
  return (
    <div
      className="box-search-advance background-card wow fadeInUp background-body"
      style={{ top: "0px", margin: "10px 0px" }}
    >
      <CheckFilter />
    </div>
  );
}

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

const CheckFilter: React.FC<CheckFilterProps> = ({ miniField }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    checkIn: new Date().toISOString(),
    checkOut: new Date().toISOString(),
    guests: { adults: 2, children: 2, rooms: 1 },
  });
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<any>([]);

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
    try {
      setLoading(true);
      const totalGuest =
        searchParams.guests.adults + searchParams.guests.children;
      const rooms = searchParams.guests.rooms;
      const paramsData = {
        dateFrom: searchParams.checkIn,
        dateTo: searchParams.checkOut,
        guest: totalGuest.toString(),
        bedRooms: rooms.toString(),
      };
      const queryParams = new URLSearchParams(paramsData).toString();
      const res = await fetch(
        `/api/gateway-casas/filterHotels?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("data", data);
      console.log(data);
      setHotels(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="box-bottom-search background-card justify-content-center">
        <div className="item-search item-search-2">
          <label className="text-sm-bold neutral-500">Check In</label>
          <div className="box-calendar-date">
            <MyDatePicker onChange={handleCheckInChange} />
          </div>
        </div>
        <div className="item-search item-search-3">
          <label className="text-sm-bold neutral-500">Check Out</label>
          <div className="box-calendar-date">
            <MyDatePicker onChange={handleCheckOutChange} />
          </div>
        </div>
        {!miniField && (
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
        )}
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
      {hotels.length > 0 && <HotelDisplayer hotels={hotels} />}
    </>
  );
};

function HotelDisplayer({ hotels }: any) {
  const displayHotels = () => {
    return hotels.map((hotel: any, index: number) => {
      return (
        <SwiperSlide key={index}>
          <div className="card-journey-small background-card">
            <div className="card-image">
              {" "}
              <Link className="wish" href={`/hotel-detail/${hotel.id}`}>
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 20 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z"
                    stroke=""
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </Link>
              <img src={hotel.imageSource} alt="StayChain" />
            </div>
            <div className="card-info">
              <div className="card-rating">
                <div className="card-left"> </div>
                <div className="card-right">
                  {" "}
                  <span className="rating">
                    {hotel?.rating}{" "}
                    <span className="text-sm-medium neutral-500">
                      ({hotel?.rating_count || 400} reviews)
                    </span>
                  </span>
                </div>
              </div>
              <div className="card-title">
                {" "}
                <Link className="heading-6 neutral-1000" href={`/hotel-detail`}>
                  {hotel.name || "Hotel"}
                </Link>
              </div>
              <div className="card-program">
                <div className="card-location">
                  <p className="text-location text-md-medium neutral-500">
                    {hotel.city}, {hotel.country}
                  </p>
                  <p className="text-star">
                    {" "}
                    <img
                      className="light-mode"
                      src="/assets/imgs/template/icons/star-black.svg"
                      alt="StayChain"
                    />
                    <img
                      className="light-mode"
                      src="/assets/imgs/template/icons/star-black.svg"
                      alt="StayChain"
                    />
                    <img
                      className="light-mode"
                      src="/assets/imgs/template/icons/star-black.svg"
                      alt="StayChain"
                    />
                    <img
                      className="light-mode"
                      src="/assets/imgs/template/icons/star-black.svg"
                      alt="StayChain"
                    />
                    <img
                      className="light-mode"
                      src="/assets/imgs/template/icons/star-black.svg"
                      alt="StayChain"
                    />
                    <img
                      className="dark-mode"
                      src="/assets/imgs/template/icons/star-w.svg"
                      alt="StayChain"
                    />
                    <img
                      className="dark-mode"
                      src="/assets/imgs/template/icons/star-w.svg"
                      alt="StayChain"
                    />
                    <img
                      className="dark-mode"
                      src="/assets/imgs/template/icons/star-w.svg"
                      alt="StayChain"
                    />
                    <img
                      className="dark-mode"
                      src="/assets/imgs/template/icons/star-w.svg"
                      alt="StayChain"
                    />
                    <img
                      className="dark-mode"
                      src="/assets/imgs/template/icons/star-w.svg"
                      alt="StayChain"
                    />
                  </p>
                </div>
                <div className="endtime">
                  <div className="card-price">
                    <h6 className="heading-6 neutral-1000">
                      {hotel?.pricePerNightBase} Stay
                    </h6>
                    <p className="text-md-medium neutral-500">/ person</p>
                  </div>
                  <div className="card-button">
                    {" "}
                    <Link className="btn btn-gray" href={`/hotel-detail`}>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <>
      <section className="section-box box-top-rated background-1">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-6">
              <h2 className="neutral-1000">Available Hotels</h2>
            </div>
          </div>
        </div>
        <div className="container-slider box-swiper-padding">
          <div className="box-swiper mt-30">
            <div className="swiper-container swiper-group-animate swiper-group-journey">
              <Swiper {...swiperGroupAnimate}>{displayHotels()}</Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
