"use client";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import MyDatePicker from "./MyDatePicker";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimate } from "@/util/swiperOption";
import { ICountry, IState, ICity } from "country-state-city";
import { Country, State, City } from "country-state-city";

export default function Check() {
  return <CheckFilter />;
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
  location: {
    name: string;
    lat: string;
    lng: string;
  };
  checkIn: string;
  checkOut: string;
  guests: Guests;
}

interface CheckFilterProps {
  miniField?: boolean;
}

const CheckFilter: React.FC<CheckFilterProps> = ({ miniField }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: {
      name: "",
      lat: "",
      lng: "",
    },
    checkIn: new Date().toISOString(),
    checkOut: new Date().toISOString(),
    guests: { adults: 2, children: 0, rooms: 1 },
  });
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<any>([]);

  useEffect(() => {
    const searchFilters: any = sessionStorage.getItem("search_filter");
    const searchFilterObject = JSON.parse(searchFilters);
    console.log("Filter search... ", searchFilterObject);
    if (searchFilterObject) {
      // console.log("session value... ", searchFilterObject);
      setSearchParams(searchFilterObject);
    }
  }, []);

  const handleLocationChange = (
    locationName: string,
    coordinates: { lat: number; lng: number } | null
  ) => {
    const location = {
      name: locationName,
      lat: coordinates?.lat.toString() || "0",
      lng: coordinates?.lng?.toString() || "0",
    };
    setSearchParams((prev) => ({ ...prev, location }));
  };

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
    console.log(searchParams);
    alert("Right not availability is disabled due to Quota Exceed.");
    return;
    sessionStorage.setItem("search_filter", JSON.stringify(searchParams));
    try {
      setLoading(true);

      // Saving the check in and out in session storage for other pages:

      const bodyData = {
        lat: searchParams?.location?.lat,
        lng: searchParams?.location?.lng,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        adults: searchParams.guests.adults,
        children: 0,
        rooms: searchParams.guests.rooms,
      };

      const res = await fetch(`/api/hotelAPi/checkroute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (res.ok) {
        const { hotels } = data;
        console.log("Hotels data is here: ");
        console.log(hotels);
        setHotels(hotels?.hotels || []);
      }
      console.log(res);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="box-search-advance background-card wow fadeInUp background-body"
        style={{ top: "0px", margin: "10px 0px" }}
      >
        <div className="box-bottom-search background-card justify-content-center">
          {!miniField && (
            <LocationSearch
              searchParams={searchParams}
              onLocationChange={handleLocationChange}
            />
          )}
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
      </div>
      {hotels.length > 0 && <HotelDisplayer hotels={hotels} />}
    </>
  );
};

function HotelDisplayer({ hotels }: any) {
  const displayHotels = () => {
    let updatedHotels = hotels;
    if (hotels.length > 10) {
      updatedHotels = hotels.slice(0, 10);
    }
    return updatedHotels.map((hotel: any, index: number) => {
      const numberOfStars = getCategoryNumber(hotel?.categoryName);
      return (
        <SwiperSlide key={index}>
          <div className="card-journey-small background-card">
            <div className="card-image">
              {" "}
              <Link className="wish" href={`/hotel-detail-3/${hotel.code}`}>
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
              <img
                src={hotel.imageSource || "/assets/imgs/page/hotel/room.png"}
                alt="StayChain"
              />
            </div>
            <div className="card-info">
              <div className="card-rating">
                <div className="card-left"> </div>
                <div className="card-right">
                  {" "}
                  <span className="rating">
                    {hotel?.rating}{" "}
                    <span className="text-sm-medium neutral-500">
                      ({hotel?.rating_count || 40} reviews)
                    </span>
                  </span>
                </div>
              </div>
              <div className="card-title">
                {" "}
                <Link
                  className="heading-6 neutral-1000"
                  href={`/hotel-detail-3/${hotel.code}`}
                >
                  {hotel.name || "Hotel"}
                </Link>
              </div>
              <p className="neutral-1000">Rooms: {hotel?.rooms?.length}</p>
              <div className="card-program">
                <div className="card-location">
                  <p className="text-location text-md-medium neutral-500">
                    {hotel?.destinationName}
                  </p>

                  <p className="text-star">
                    {Array.from({ length: numberOfStars }).map(
                      (_, index: number) => (
                        <img
                          key={index}
                          className="light-mode"
                          src="/assets/imgs/template/icons/star-black.svg"
                          alt="StayChain"
                        />
                      )
                    )}

                    {Array.from({ length: numberOfStars }).map(
                      (_, index: number) => (
                        <img
                          key={index}
                          className="dark-mode"
                          src="/assets/imgs/template/icons/star-w.svg"
                          alt="StayChain"
                        />
                      )
                    )}
                  </p>
                </div>
                <div className="endtime">
                  <div className="card-price">
                    <div className="heading- neutral-1000">
                      <p>Price Range</p>
                      {hotel?.minRate} - {hotel?.maxRate} Stay
                    </div>
                    {/* <p className="text-md-medium neutral-500">/ person</p> */}
                  </div>
                  <div className="card-button">
                    {" "}
                    <Link
                      className="btn btn-gray"
                      href={`/hotel-detail-3/${hotel.code}`}
                    >
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

export function LocationSearch({
  miniField = false,
  searchParams,
  onLocationChange,
}: {
  miniField?: boolean;
  searchParams: SearchParams;
  onLocationChange: (
    location: string,
    coordinates: { lat: number; lng: number } | null
  ) => void;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [locations, setLocations] = useState<(ICountry | IState | ICity)[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const [flag, setFlag] = useState<any>("");

  useEffect(() => {
    setSelectedLocation(searchParams?.location?.name);
  }, [searchParams]);

  useEffect(() => {
    if (searchInput.length > 1) {
      const results: (ICountry | IState | ICity)[] = [];

      const countryResults = Country.getAllCountries().filter((country) =>
        country.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      results.push(...countryResults);

      // Search states if we have more than 2 characters
      if (searchInput.length > 2) {
        const stateResults = State.getAllStates().filter((state) =>
          state.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        results.push(...stateResults);
      }

      // Search cities if we have more than 3 characters
      if (searchInput.length > 3) {
        const cityResults = City.getAllCities().filter((city) =>
          city.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        results.push(...cityResults);
      }

      setLocations(results.slice(0, 50)); // Limit to 50 results
    } else {
      setLocations([]);
    }
  }, [searchInput]);

  const handleSelect = (location: ICountry | IState | ICity) => {
    let displayText = location.name;

    let coordinates = null;

    //latitude and longitude...
    if (
      "latitude" in location &&
      location.latitude &&
      "longitude" in location &&
      location.longitude
    ) {
      coordinates = {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude),
      };
    } else {
      console.log("could not find coordinates...");
    }

    // Add state/country context if available
    if ("stateCode" in location) {
      const state = State.getStateByCodeAndCountry(
        location.stateCode,
        location.countryCode
      );
      if (state) displayText += `, ${state.name}`;
    }

    if ("countryCode" in location) {
      const country = Country.getCountryByCode(location.countryCode);
      if (country) displayText += `, ${country.name}`;
    }

    setSelectedLocation(displayText);
    setSearchInput("");
    setLocations([]);

    const flagResult =
      "countryCode" in location && location.countryCode
        ? getCountryFlag(location.countryCode)
        : "flag" in location && location.flag
        ? location.flag
        : null;

    setFlag(flagResult);

    onLocationChange(displayText, coordinates);
    setShowDropdown(false);
  };

  const getCountryFlag = (countryCode: any) => {
    return Country.getCountryByCode(countryCode)?.flag;
  };

  if (miniField) return null;

  return (
    <div className="item-search">
      <label className="text-sm-bold neutral-500">Location</label>
      <Dropdown
        show={showDropdown}
        onToggle={(isOpen) => setShowDropdown(isOpen)}
        className="dropdown"
      >
        <Dropdown.Toggle
          className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"
          type="button"
          aria-expanded="false"
        >
          <span className="me-1">{flag}</span>
          {selectedLocation || "Select location"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search country, state or city..."
              className="form-control"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
          </div>

          {locations.length > 0 ? (
            <div
              className="location-results"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {locations.map((location, index) => (
                <Dropdown.Item
                  key={`${location.name}-${index}`}
                  onClick={() => handleSelect(location)}
                  className="px-3 py-2"
                >
                  <div>
                    <span className="me-2">
                      {"countryCode" in location && location.countryCode
                        ? getCountryFlag(location.countryCode)
                        : "flag" in location && location.flag}
                    </span>
                    {location.name}
                    {"isoCode" in location && (
                      <span className="text-muted ms-2">
                        ({location.isoCode})
                      </span>
                    )}
                    {"stateCode" in location && location.stateCode && (
                      <span className="text-muted ms-2">
                        {location.stateCode}
                      </span>
                    )}
                    {"countryCode" in location && location.countryCode && (
                      <span className="text-muted ms-2">
                        {location.countryCode}
                      </span>
                    )}
                  </div>
                </Dropdown.Item>
              ))}
            </div>
          ) : (
            <Dropdown.ItemText className="px-3 py-2 text-muted">
              {searchInput.length > 1
                ? "No results found"
                : "Start typing to search locations"}
            </Dropdown.ItemText>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function getCategoryNumber(stringCat: string) {
  let number = parseInt(stringCat.trim().split(" ")[0], 10);
  return number;
}
/**
 * function HotelDisplayer({ hotels }: any) {
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
 */
