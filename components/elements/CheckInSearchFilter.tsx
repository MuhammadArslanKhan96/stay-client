"use client";
import Dropdown from "react-bootstrap/Dropdown";
import MyDatePicker from "./MyDatePicker";
import { useEffect, useState, useTransition } from "react";
import { ICountry, IState, ICity } from "country-state-city";
import { Country, State, City } from "country-state-city";
import { useRouter } from "next/navigation";

export default function SearchFilterTop() {
  return (
    <section className="box-section block-banner-property">
      <div className="container">
        <div className="text-center">
          <h3>Journey with Stay Chain - Begin Your Story!</h3>
          <h6 className="heading-6-medium">
            Easily search for top properties offered by our professional network
          </h6>
        </div>
        <div className="box-search-advance box-search-advance-3 background-card wow fadeInUp">
          <CheckFilter />
        </div>
      </div>
    </section>
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
    // console.log(searchParams);
    sessionStorage.setItem("search_filter", JSON.stringify(searchParams));
    sessionStorage.setItem("isfilterApplied", "true");
    console.log("Search filter is clicked");

    const { location, checkIn, checkOut, guests } = searchParams;

    const query = new URLSearchParams({
      locationName: location.name,
      lat: location.lat,
      lng: location.lng,
      checkIn,
      checkOut,
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      rooms: guests.rooms.toString(),
    });

    startTransition(() => {
      router.push(`/available-hotels?${query.toString()}`);
    });
  };

  return (
    <>
      <div className="box-bottom-search background-card">
        {!miniField && (
          <div className="item-search item-search-1">
            <label className="text-sm-bold neutral-500">Location</label>
            {/* <div className="box-calendar-date"> */}
            <LocationSearch
              searchParams={searchParams}
              onLocationChange={handleLocationChange}
            />
            {/* </div> */}
          </div>
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
                className="btn btn-secondary dropdown-toggle d-flex justify-content-between align-items-center  btn-dropdown-search location-search"
                type="button"
                aria-expanded="false"
              >
                <p>
                  {`${searchParams.guests.adults} Adults, ${searchParams.guests.children} children, ${searchParams.guests.rooms} Rooms`}
                </p>
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
            disabled={isPending}
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
            {isPending ? "Searching" : "Search"}
          </button>
        </div>
      </div>
    </>
  );
};

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
    <Dropdown
      show={showDropdown}
      onToggle={(isOpen) => setShowDropdown(isOpen)}
      className="dropdown"
    >
      <Dropdown.Toggle
        className="btn btn-secondary dropdown-toggle d-flex justify-content-between align-items-center w-100 btn-dropdown-search location-search"
        type="button"
        aria-expanded="false"
      >
        <p>
          <span className="me-1">{flag}</span>
          <span>{selectedLocation || "Select location"}</span>
        </p>
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
  );
}

// // Add state/country context if available
// if ("stateCode" in location) {
//   const state = State.getStateByCodeAndCountry(
//     location.stateCode,
//     location.countryCode
//   );
//   if (state) displayText += `, ${state.name}`;
// }

// if ("countryCode" in location) {
//   const country = Country.getCountryByCode(location.countryCode);
//   if (country) displayText += `, ${country.name}`;
// }
