"use client";
import VideoPopup from "@/components/elements/VideoPopup";
import Layout from "@/components/layout/Layout";
import SwiperGroupPaymentSlider from "@/components/slider/SwiperGroupPaymentSlider";
import { swiperGroup1, swiperGroupAnimate } from "@/util/swiperOption";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import RoomAvailabilityChecker from "@/components/sections/RoomAvailabilitySearch";
import { IMAGE_BASE_URL } from "@/util/constant";

export default function HotelDetail() {
  const [hotel, setHotel] = useState<any>([]);
  const router = usePathname();
  const [loading, setLoading] = useState(false);
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState<any>([]);

  const moveRouter = useRouter();

  const [selectedRooms, setSelectedRooms] = useState<any>([]); // To keep track of selected rooms
  const [totalPrice, setTotalPrice] = useState(0); // To keep track of the total price
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const isFilterApplied = sessionStorage.getItem("isfilterApplied");
    (async () => {
      if (router) {
        try {
          const url = router.split("/");
          const id = url[url.length - 1];
          console.log("HOTEL CODE : ", id);
          setHotelId(id);

          const response = await fetch(`/api/db/hotel-detail/${id}`);

          const data = await response.json();
          console.log(data);
          const hotel = data?.data;
          console.log("HOTEL DATA FROM DB: ", hotel);
          setHotel(hotel);

          if (id && isFilterApplied === "true") {
            console.log("Filter is applied...");
            setIsFilterApplied(true);
            const filterData: any = sessionStorage.getItem("search_filter");
            const filterDataObj = JSON.parse(filterData);
            fetchRooms(filterDataObj, id);
          }
        } catch (err) {
          console.log("Error while fetching room data...");
        }
      }
    })();
  }, []);

  async function fetchRooms(checkInfo: any, hotelCode: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/db/rooms-availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelCode: Number(hotelCode), ...checkInfo }),
      });

      console.log("Response from hotel beds API... ", res);
      if (res.ok) {
        const data = await res.json();
        const { hotels } = data;

        const hotel_s = hotels?.hotels;
        console.log("Hot:, ", hotel_s);
        if (hotel_s) {
          for (let h of hotel_s) {
            if (h.code === Number(hotelCode)) {
              console.log("set rooms with data,", h.rooms);
              setRooms(h.rooms);
              return;
            }
          }
        } else {
          setRooms([]);
          setSelectedRooms([]);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearchClick(bodyData: any) {
    console.log("Searching hotel from search btn");
    try {
      setLoading(true);
      const res = await fetch(`/api/hotelAPi/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelCode: Number(hotelId), ...bodyData }),
      });
      if (res.ok) {
        const data = await res.json();
        const { hotels } = data;

        const hotel_s = hotels?.hotels;
        console.log("Hot:, ", hotel_s);
        if (hotel_s) {
          for (let h of hotel_s) {
            if (h.code === Number(hotelId)) {
              setRooms(h.rooms);
              return;
            }
          }
        } else {
          alert("No room is available.");
          setRooms([]);
          setSelectedRooms([]);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleRoomSelection = (room: any) => {
    setSelectedRooms((prevSelectedRooms: any) => {
      if (prevSelectedRooms.some((r: any) => r.code === room.code)) {
        // If room is already selected, remove it from the selection
        return prevSelectedRooms.filter((r: any) => r.code !== room.code);
      } else {
        // Add room to the selection
        return [...prevSelectedRooms, room];
      }
    });
  };

  const handleReserveClick = async (room: Room) => {
    console.log("Push...");
    sessionStorage.setItem("bookedRoom", JSON.stringify(room));
    // window.location.href = `/roombookingform/${hotelId}`;
    moveRouter.push(`/roombookingform/${hotelId}`);
    // console.log(selectedRooms);
    // console.log(rooms);
  };

  const displayRooms = (wallet: any) => {
    // console.log(wallet);
    return (
      <div>
        {/* Rooms Display */}
        <div className="row">
          {rooms?.map((room: any, index: number) => {
            const imagePath = getImagePathByRoomCode(hotel?.images, room.code);

            return (
              <div className="col-lg-4 col-md-6 wow fadeInUp" key={room.code}>
                <div className="card-journey-small card-journey-small-type-3 background-card">
                  <div className="card-image">
                    <Link className="wish" href="#">
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
                    <Link href="/room-detail">
                      <img
                        src={`${IMAGE_BASE_URL}/${imagePath}`}
                        alt="StayChain"
                      />
                    </Link>
                  </div>
                  <div className="card-info">
                    <div className="card-rating">
                      <div className="card-left"> </div>
                      <div className="card-right">
                        <span className="rating">
                          {room.rating}{" "}
                          <span className="text-sm-medium neutral-500">
                            ({room.rating_count} reviews)
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="card-title">
                      <Link
                        className="text-lg-bold neutral-1000"
                        href="/room-detail"
                      >
                        {room.name}
                      </Link>
                    </div>
                    <div className="card-program">
                      <div className="card-facilities">
                        <div className="item-facilities">
                          <p className="pax text-md-medium neutral-1000">
                            {room?.rates?.[0]?.adults} adults
                          </p>
                        </div>
                        <div className="item-facilities">
                          <p className="size text-md-medium neutral-1000">
                            {room.size} sqm
                          </p>
                        </div>
                        <div className="item-facilities">
                          <p className="bed text-md-medium neutral-1000">
                            {room.beds} Beds
                          </p>
                        </div>
                        <div className="item-facilities">
                          <p className="pax text-md-medium neutral-1000">
                            {room?.rates?.[0]?.children} children
                          </p>
                        </div>
                      </div>
                      <div className="endtime">
                        <div className="card-price">
                          <h6 className="heading-6 neutral-1000">
                            {room?.rates?.[0]?.net || 162} Stay
                          </h6>
                          <p className="text-md-medium neutral-500">/ night</p>
                        </div>
                        <div className="card-button">
                          {/* Add a checkbox to select room */}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`room-${room.code}`}
                              checked={selectedRooms.some(
                                (r: any) => r.code === room.code
                              )}
                              onChange={() => handleRoomSelection(room)}
                            />
                            <label
                              className="form-check-label neutral-1000"
                              htmlFor={`room-${room.code}`}
                            >
                              Add to Booking
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Summary */}
        {/* <div className="booking-summary my-2 background-body neutral-1000">
          <h4>Booking Summary</h4>
          <p>Rooms Selected: {selectedRooms.length}</p>

          <button
            onClick={handleBtnSubmit}
            className="btn btn-dark"
            disabled={selectedRooms.length <= 0}
          >
            {selectedRooms.length > 0 ? "Proceed to Booking" : "Select Room"}
          </button>
        </div> */}
      </div>
    );
  };
  const numberOfStars = getCategoryNumber(hotel?.category_content);

  const hotelImages = getHotelImages(hotel?.api_hotel_images);
  return (
    <>
      {/* <Layout headerStyle={1} footerStyle={1}> */}
      <main className="main">
        <section className="box-section box-breadcrumb background-body">
          <div className="container">
            <ul className="breadcrumbs">
              <li>
                {" "}
                <Link href="/">Home</Link>
                <span className="arrow-right">
                  <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L6 6L1 1"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </li>
              <li>
                {" "}
                <Link href="/destination">Hotel</Link>
                <span className="arrow-right">
                  <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L6 6L1 1"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </li>
              <li>
                {" "}
                <span className="text-breadcrumb">{hotel?.name_content}</span>
              </li>
            </ul>
          </div>
        </section>
        <section className="section-box box-banner-home3 box-banner-hotel-detail background-body">
          <div className="container">
            <div className="box-swiper mt-0">
              <div className="swiper-container swiper-group-1">
                <Swiper {...swiperGroup1}>
                  <SwiperSlide>
                    <div
                      className="item-banner-box"
                      style={{
                        backgroundImage: `url(${
                          hotelImages?.[0]
                            ? `${IMAGE_BASE_URL}/${hotelImages[0]}`
                            : "assets/imgs/page/hotel/banner-hotel.png"
                        })`,
                      }}
                    >
                      <div className="item-banner-box-inner">
                        {" "}
                        <span className="btn btn-white-sm">
                          {Array.from({ length: numberOfStars }).map(
                            (_, index: number) => (
                              <img
                                key={index}
                                src="/assets/imgs/page/tour-detail/star-big.svg"
                                alt="StayChain"
                              />
                            )
                          )}
                        </span>
                        <h1 className="mt-20 mb-20 color-white">
                          Welcome to
                          <br className="d-none d-lg-block" />
                          {hotel?.name_content}
                        </h1>
                        <ul className="list-disc">
                          <li>Spacious and Well-Appointed Rooms</li>
                          <li>Fine Dining Restaurants</li>
                          <li>Exclusive Spa and Wellness Facilities</li>
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      className="item-banner-box"
                      style={{
                        backgroundImage: `url(${
                          hotelImages?.[1]
                            ? `${IMAGE_BASE_URL}/${hotelImages[1]}`
                            : "assets/imgs/page/hotel/banner-hotel.png"
                        })`,
                      }}
                    >
                      <div className="item-banner-box-inner">
                        {" "}
                        <span className="btn btn-white-sm">
                          {Array.from({ length: numberOfStars }).map(
                            (_, index: number) => (
                              <img
                                key={index}
                                src="/assets/imgs/page/tour-detail/star-big.svg"
                                alt="StayChain"
                              />
                            )
                          )}
                        </span>
                        <h1 className="mt-20 mb-20 color-white">
                          Welcome to
                          <br className="d-none d-lg-block" />
                          {hotel?.name_content}
                        </h1>
                        <ul className="list-disc">
                          <li>Spacious and Well-Appointed Rooms</li>
                          <li>Fine Dining Restaurants</li>
                          <li>Exclusive Spa and Wellness Facilities</li>
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="swiper-pagination swiper-pagination-group-1 swiper-pagination-style-1" />
              </div>
            </div>
            {/* <div className="box-search-advance background-card wow fadeInUp"> */}
            {/* <div className="box-top-search">
                <div className="left-top-search">
                  <Link className="category-link btn-click active" href="#">
                    Tours
                  </Link>
                  <Link className="category-link btn-click" href="#">
                    Hotels
                  </Link>
                  <Link className="category-link btn-click" href="#">
                    Tickets
                  </Link>
                  <Link className="category-link btn-click" href="#">
                    Rental
                  </Link>
                  <Link className="category-link btn-click" href="#">
                    Activities
                  </Link>
                </div>
                <div className="right-top-search">
                  <Link
                    className="text-sm-medium need-some-help"
                    href="/help-center"
                  >
                    Need some help?
                  </Link>
                </div>
              </div> */}
            {/* <SearchFilterBottom /> */}
            {/* </div> */}
          </div>
        </section>
        <section className="section-box box-partners box-hotel-facilities-list background-body">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 mb-20">
                <div className="box-authors-partner background-9 wow fadeInUp">
                  <div className="authors-partner-left">
                    <img
                      src="/assets/imgs/page/homepage5/author.png"
                      alt="StayChain"
                    />
                    <img
                      src="/assets/imgs/page/homepage5/author2.png"
                      alt="StayChain"
                    />
                    <img
                      src="/assets/imgs/page/homepage5/author3.png"
                      alt="StayChain"
                    />
                    <span className="item-author">
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="7.448"
                          width={17}
                          height="2.31818"
                          fill="black"
                        />
                        <rect
                          x="7.84082"
                          y="17.1072"
                          width={17}
                          height="2.31818"
                          transform="rotate(-90 7.84082 17.1072)"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="authors-partner-right">
                    <p className="text-sm neutral-1000">
                      1684 people used <strong>Stay Chain </strong>in the last{" "}
                      <strong>24 hours</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mb-20 wow fadeInUp">
                <div className="box-numbers-home7">
                  <div className="list-numbers wow fadeInUp">
                    <div className="item-number">
                      <div className="image-top">
                        {" "}
                        <img
                          src="/assets/imgs/page/hotel/airport.svg"
                          alt="StayChain"
                        />
                      </div>
                      <p className="text-15-medium neutral-1000">
                        Free Airport <br />
                        Transfer
                      </p>
                    </div>
                    <div className="item-number">
                      <div className="image-top">
                        {" "}
                        <img
                          src="/assets/imgs/page/hotel/living.svg"
                          alt="StayChain"
                        />
                      </div>
                      <p className="text-15-medium neutral-1000">
                        Living Kitchen <br />
                        Area
                      </p>
                    </div>
                    <div className="item-number">
                      <div className="image-top">
                        {" "}
                        <img
                          src="/assets/imgs/page/hotel/front.svg"
                          alt="StayChain"
                        />
                      </div>
                      <p className="text-15-medium neutral-1000">
                        Front desk (24-hour)
                      </p>
                    </div>
                    <div className="item-number">
                      <div className="image-top">
                        {" "}
                        <img
                          src="/assets/imgs/page/hotel/wifi.svg"
                          alt="StayChain"
                        />
                      </div>
                      <p className="text-15-medium neutral-1000">
                        Free Wifi <br />
                        Internet
                      </p>
                    </div>
                    <div className="item-number">
                      <div className="image-top">
                        {" "}
                        <img
                          src="/assets/imgs/page/hotel/spa.svg"
                          alt="StayChain"
                        />
                      </div>
                      <p className="text-15-medium neutral-1000">
                        Spa
                        <br />
                        Sauna
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box box-payments box-vision background-body">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-30">
                <div className="box-right-payment">
                  <span className="btn btn-brand-secondary">
                    Welcome to {hotel?.name_content}
                  </span>
                  <h2 className="title-why mb-25 mt-10 neutral-1000">
                    A New Vision of Luxury
                  </h2>
                  <p className="text-lg-medium neutral-500 mb-35">
                    {hotel?.description_content}
                  </p>
                  <div className="box-telephone-booking">
                    <div className="box-tel-left">
                      <div className="box-need-help">
                        <p className="need-help neutral-1000 text-lg-bold mb-5">
                          Need help? Call us
                        </p>
                        <br />
                        <Link
                          className="heading-6 phone-support"
                          href="/tel:1-800-222-8888"
                        >
                          1-800-222-8888
                        </Link>
                      </div>
                    </div>
                    <div className="box-tel-right">
                      {" "}
                      <Link className="btn btn-tag" href="#">
                        Availability Rooms
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 15L15 8L8 1M15 8L1 8"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="payment-method">
                    <p className="text-sm-bold neutral-500">
                      Payments accepted
                    </p>
                    <div className="box-swiper mt-15">
                      <div className="swiper-container swiper-group-payment">
                        <SwiperGroupPaymentSlider />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-30 text-center text-lg-end">
                <div className="box-image-vision">
                  {" "}
                  <img
                    className="w-100"
                    src="/assets/imgs/page/hotel/img-vision.png"
                    alt="StayChain"
                  />
                  <div className="image-vision-1">
                    <img
                      className="w-100 mb-15"
                      src="/assets/imgs/page/hotel/img-vision2.png"
                      alt="StayChain"
                    />
                  </div>
                  <div className="image-vision-2">
                    <img
                      className="w-100"
                      src="/assets/imgs/page/hotel/img-vision3.png"
                      alt="StayChain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box box-top-rated-3 box-nearby best-room-hotel background-body">
          <div className="container">
            <h2 className="neutral-1000 wow fadeInUp">Check Availability</h2>
            <p className="text-xl-medium neutral-500 wow fadeInUp">
              Enter details for availability check
            </p>
            <div className="row">
              <RoomAvailabilityChecker
                onAvailabilityclick={handleSearchClick}
                loading={loading}
              />
            </div>
            <div className="row">
              {hotel ? (
                isFilterApplied ? (
                  <RoomCardWithAvailability
                    rooms={rooms}
                    images={hotel?.api_hotel_images}
                    onReserve={handleReserveClick}
                  />
                ) : (
                  <RoomCardBeforeAvailability
                    rooms={hotel?.api_hotel_rooms}
                    images={hotel?.api_hotel_images}
                  />
                )
              ) : null}
            </div>
          </div>
        </section>
        <section className="section-box box-how-it-work-hotel-detail background-body">
          <div className="container">
            <div className="box-banner-left-how" />
            <div className="row">
              <div className="col-md-6" />
              <div className="col-md-6">
                <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
                <p className="text-xl-medium neutral-500 wow fadeInUp mb-40">
                  Just 4 easy and quick steps
                </p>
                <ul className="list-steps wow fadeInUp">
                  <li>
                    <div className="step-no">
                      {" "}
                      <span>1</span>
                    </div>
                    <div className="step-info">
                      <p className="text-xl-bold neutral-1000">
                        Browse and Select
                      </p>
                      <p className="text-sm-medium neutral-500">
                        Easily find your perfect car. Filter by model, brand,
                        and size for a seamless selection process.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="step-no">
                      {" "}
                      <span>2</span>
                    </div>
                    <div className="step-info">
                      <p className="text-xl-bold neutral-1000">
                        Booking and Reservation
                      </p>
                      <p className="text-sm-medium neutral-500">
                        Quickly reserve with flexible dates and locations.
                        Real-time availability updates ensure a smooth booking
                        experience.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="step-no">
                      {" "}
                      <span>3</span>
                    </div>
                    <div className="step-info">
                      <p className="text-xl-bold neutral-1000">
                        Payment and Confirmation
                      </p>
                      <p className="text-sm-medium neutral-500">
                        Secure payments, various methods accepted. Instant
                        confirmation for a hassle-free rental process.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="step-no">
                      {" "}
                      <span>4</span>
                    </div>
                    <div className="step-info">
                      <p className="text-xl-bold neutral-1000">
                        Pickup and Return
                      </p>
                      <p className="text-sm-medium neutral-500">
                        Effortless pickup and return. Simple documentation,
                        optional services like delivery, and excellent customer
                        support.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Video section */}
        {/* <section className="section-box box-picked box-hotel-video background-body">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-9 mb-30 wow fadeInUp">
                <h2 className="neutral-1000">Our Video Gallery</h2>
                <p className="text-xl-medium neutral-500">
                  Quality as judged by customers. Book at the ideal price!
                </p>
              </div>
              <div className="col-md-3 mb-30 wow fadeInUp">
                <div className="d-flex justify-content-center justify-content-md-end">
                  <Link className="btn btn-black-lg" href="#">
                    View More
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15L15 8L8 1M15 8L1 8"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="box-videos-small wow fadeInUp">
              <div className="bg-video background-2" />
              <div className="row">
                <div className="col-lg-7">
                  <div className="card-grid-video">
                    <div className="card-image">
                      <VideoPopup vdocls="btn btn-play popup-youtube" />
                      <img
                        className="mr-10"
                        src="/assets/imgs/page/homepage7/img-video.png"
                        alt="Travile"
                      />
                    </div>
                    <div className="card-info">
                      <h4>The Venetian and The Palazzo - Las Vegas, USA</h4>
                      <p className="text-md-medium">8 Resort. 24 rooms</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="list-videos-small">
                    <div className="item-video-small">
                      <div className="item-image">
                        <VideoPopup vdocls="btn btn-play-sm popup-youtube" />

                        <img
                          className="mr-10"
                          src="/assets/imgs/page/homepage7/img-video.png"
                          alt="Travile"
                        />
                      </div>
                      <div className="item-info">
                        {" "}
                        <Link className="heading-6" href="#">
                          The Burj Al Arab Dubai, UAE
                        </Link>
                        <p className="text-md-medium neutral-500">
                          8 Resort. 24 rooms
                        </p>
                      </div>
                    </div>
                    <div className="item-video-small">
                      <div className="item-image">
                        <VideoPopup vdocls="btn btn-play-sm popup-youtube" />
                        <img
                          className="mr-10"
                          src="/assets/imgs/page/homepage7/img-video2.png"
                          alt="Travile"
                        />
                      </div>
                      <div className="item-info">
                        {" "}
                        <Link className="heading-6" href="#">
                          The Burj Al Arab Dubai, UAE
                        </Link>
                        <p className="text-md-medium neutral-500">
                          8 Resort. 24 rooms
                        </p>
                      </div>
                    </div>
                    <div className="item-video-small">
                      <div className="item-image">
                        <VideoPopup vdocls="btn btn-play-sm popup-youtube" />
                        <img
                          className="mr-10"
                          src="/assets/imgs/page/homepage7/img-video3.png"
                          alt="Travile"
                        />
                      </div>
                      <div className="item-info">
                        {" "}
                        <Link className="heading-6" href="#">
                          The Burj Al Arab Dubai, UAE
                        </Link>
                        <p className="text-md-medium neutral-500">
                          8 Resort. 24 rooms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* Testinomials */}
        {/* <section className="section-box box-testimonials-2 box-testimonials-5 box-testimonials-hotel-detail background-body">
          <div className="container">
            <div className="box-author-testimonials button-bg-2 wow fadeInUp">
              {" "}
              <img
                src="/assets/imgs/page/homepage1/testimonial.png"
                alt="StayChain"
              />
              <img
                src="/assets/imgs/page/homepage1/testimonial2.png"
                alt="StayChain"
              />
              <img
                src="/assets/imgs/page/homepage1/testimonial3.png"
                alt="StayChain"
              />
              Testimonials
            </div>
            <h2 className="mt-8 mb-25 neutral-1000">What they say about us?</h2>
          </div>
          <div className="block-testimonials">
            <div className="container-testimonials wow fadeInUp">
              <div className="container-slider">
                <div className="box-swiper mt-0">
                  <div className="swiper-container swiper-group-animate swiper-group-journey">
                    <Swiper {...swiperGroupAnimate}>
                      <SwiperSlide>
                        <div className="card-testimonial background-card">
                          <div className="card-info">
                            <p className="text-xl-bold card-title neutral-1000">
                              The best booking system
                            </p>
                            <p className="neutral-500">
                              I've been using the hotel booking system for
                              several years now, and it's become my go-to
                              platform for planning my trips. The interface is
                              user-friendly, and I appreciate the detailed
                              information and real-time availability of hotels.
                            </p>
                          </div>
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-image">
                                {" "}
                                <img
                                  src="/assets/imgs/page/homepage1/author.png"
                                  alt="StayChain"
                                />
                              </div>
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Sara Mohamed
                                </p>
                                <p className="text-sm neutral-1000">Jakatar</p>
                              </div>
                            </div>
                            <div className="card-rate">
                              {" "}
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="card-testimonial background-card">
                          <div className="card-info">
                            <p className="text-xl-bold card-title neutral-1000">
                              The best booking system
                            </p>
                            <p className="neutral-500">
                              I've been using the hotel booking system for
                              several years now, and it's become my go-to
                              platform for planning my trips. The interface is
                              user-friendly, and I appreciate the detailed
                              information and real-time availability of hotels.
                            </p>
                          </div>
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-image">
                                {" "}
                                <img
                                  src="/assets/imgs/page/homepage1/author2.png"
                                  alt="StayChain"
                                />
                              </div>
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Atend John
                                </p>
                                <p className="text-sm neutral-1000">
                                  Califonia
                                </p>
                              </div>
                            </div>
                            <div className="card-rate">
                              {" "}
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="card-testimonial background-card">
                          <div className="card-info">
                            <p className="text-xl-bold card-title neutral-1000">
                              The best booking system
                            </p>
                            <p className="neutral-500">
                              I've been using the hotel booking system for
                              several years now, and it's become my go-to
                              platform for planning my trips. The interface is
                              user-friendly, and I appreciate the detailed
                              information and real-time availability of hotels.
                            </p>
                          </div>
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-image">
                                {" "}
                                <img
                                  src="/assets/imgs/page/homepage1/author.png"
                                  alt="StayChain"
                                />
                              </div>
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Sara Mohamed
                                </p>
                                <p className="text-sm neutral-1000">Jakatar</p>
                              </div>
                            </div>
                            <div className="card-rate">
                              {" "}
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="card-testimonial background-card">
                          <div className="card-info">
                            <p className="text-xl-bold card-title neutral-1000">
                              The best booking system
                            </p>
                            <p className="neutral-500">
                              I've been using the hotel booking system for
                              several years now, and it's become my go-to
                              platform for planning my trips. The interface is
                              user-friendly, and I appreciate the detailed
                              information and real-time availability of hotels.
                            </p>
                          </div>
                          <div className="card-top">
                            <div className="card-author">
                              <div className="card-image">
                                {" "}
                                <img
                                  src="/assets/imgs/page/homepage1/author2.png"
                                  alt="StayChain"
                                />
                              </div>
                              <div className="card-info">
                                <p className="text-lg-bold neutral-1000">
                                  Sara Mohamed
                                </p>
                                <p className="text-sm neutral-1000">Jakatar</p>
                              </div>
                            </div>
                            <div className="card-rate">
                              {" "}
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                              <img
                                src="/assets/imgs/template/icons/star.svg"
                                alt="StayChain"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="section-box box-media background-body">
          <div className="container-media wow fadeInUp">
            {" "}
            <img src="/assets/imgs/page/homepage5/media.png" alt="StayChain" />
            <img src="/assets/imgs/page/homepage5/media2.png" alt="StayChain" />
            <img src="/assets/imgs/page/homepage5/media3.png" alt="StayChain" />
            <img src="/assets/imgs/page/homepage5/media4.png" alt="StayChain" />
            <img src="/assets/imgs/page/homepage5/media5.png" alt="StayChain" />
            <img src="/assets/imgs/page/homepage5/media6.png" alt="StayChain" />
            <img src="/assets/imgs/page/homepage5/media7.png" alt="StayChain" />
          </div>
        </section>
      </main>

      {/* </Layout> */}
    </>
  );
}

function getRandomNumber() {
  return Math.floor(Math.random() * 4) + 2;
}

function getCategoryNumber(stringCat: string) {
  if (stringCat) {
    let number = parseInt(stringCat[0], 10);
    return number;
  }
  return 0;
}

function getImagePathByRoomCode(images: any, targetRoomCode: string) {
  if (!Array.isArray(images) || !targetRoomCode) return null;

  const match = images.find((img) => img?.room_code === targetRoomCode);

  return match?.path || null;
}

function getHotelImages(images: any) {
  if (!Array.isArray(images)) return [];

  return images
    .filter((img) => img?.image_type_code !== "HAB")
    .map((img) => img.path);
}

type RoomBeforeAvailability = {
  room_code: string;
  room_type: string;
  characteristic_code?: string;
  min_pax: number;
  max_pax: number;
  max_adults: number;
  max_children: number;
};

type Props = {
  rooms: RoomBeforeAvailability[];
  images: any;
};

const RoomCardBeforeAvailability: React.FC<Props> = ({ rooms, images }) => {
  return (
    <div className="row">
      {rooms?.map((room) => {
        const imagePath = getImagePathByRoomCode(images, room.room_code);

        return (
          <div className="col-lg-4 col-md-6" key={room.room_code}>
            <div className="card-journey-small card-journey-small-type-3 background-card">
              <div className="card-image">
                <Link href="#">
                  <img
                    src={`${IMAGE_BASE_URL}/${imagePath}`}
                    alt={room.room_type}
                    // className="img-fluid"
                  />
                </Link>
              </div>

              <div className="card-info">
                <div className="card-title">
                  <h5 className="text-lg-bold neutral-1000">
                    {room.room_type}
                  </h5>
                  {room.characteristic_code && (
                    <p className="text-sm neutral-600">
                      {room.characteristic_code}
                    </p>
                  )}
                </div>

                <div className="card-program">
                  <div className="card-facilities">
                    <div className="item-facilities">
                      <p className="text-md-medium neutral-1000">
                        Pax: {room.min_pax} - {room.max_pax}
                      </p>
                    </div>
                    <div className="item-facilities">
                      <p className="text-md-medium neutral-1000">
                        Max Adults: {room.max_adults}
                      </p>
                    </div>
                    <div className="item-facilities">
                      <p className="text-md-medium neutral-1000">
                        Max Children: {room.max_children}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-footer mt-3">
                  <p className="text-sm-medium neutral-500">
                    Enter dates to check availability & pricing
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface Rate {
  rateKey: string;
  rateClass: string;
  rateType: string;
  net: string;
  allotment: number;
  paymentType: string;
  packaging: boolean;
  boardCode: string;
  boardName: string;
  cancellationPolicies: {
    amount: string;
    from: string;
  }[];
  rooms: number;
  adults: number;
  children: number;
}

interface Room {
  code: string;
  name: string;
  rates: Rate[];
}

interface PropsRooms {
  rooms: Room[];
  images: any[]; // Replace with your actual image type
  onReserve: (room: Room) => void;
}

const RoomCardWithAvailability: React.FC<PropsRooms> = ({
  rooms,
  images,
  onReserve,
}) => {
  const usdToStays = (usdAmount: string) => {
    const usd = parseFloat(usdAmount);
    const stays = usd / 0.2;
    return Math.round(stays * 100) / 100; // Round to 2 decimal places
  };

  const formatStays = (stays: number) => {
    return `${stays} Stay`;
  };

  console.log("Rooms data in comp", rooms);
  return (
    <div className="row">
      {rooms?.map((room) => {
        const imagePath = getImagePathByRoomCode(images, room.code);
        const primaryRate = room.rates[0]; // Assuming we show the first rate

        return (
          <div className="col-lg-4 col-md-6" key={room.code}>
            <div className="card-journey-small card-journey-small-type-3 background-card">
              <div className="card-image">
                <Link href="#">
                  <img src={`${IMAGE_BASE_URL}/${imagePath}`} alt={room.name} />
                </Link>
              </div>

              <div className="card-info">
                <div className="card-title">
                  <h5 className="text-lg-bold neutral-1000">{room.name}</h5>
                  <p className="text-sm neutral-600">{room.code}</p>
                </div>

                <div className="card-program">
                  <div className="card-facilities">
                    <div className="item-facilities">
                      <p className="text-md-medium neutral-1000">
                        Board: {primaryRate.boardName}
                      </p>
                    </div>
                    <div className="item-facilities">
                      <p className="text-md-medium neutral-1000">
                        Rooms: {primaryRate.rooms}
                      </p>
                    </div>
                    <div className="item-facilities">
                      <p className="text-md-medium neutral-1000">
                        Adults: {primaryRate.adults}
                      </p>
                    </div>
                    {primaryRate.children > 0 && (
                      <div className="item-facilities">
                        <p className="text-md-medium neutral-1000">
                          Children: {primaryRate.children}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="price-section mt-3">
                  <h4 className="text-lg-bold neutral-1000">
                    {formatStays(usdToStays(primaryRate.net))}
                  </h4>
                  {primaryRate.cancellationPolicies.length > 0 && (
                    <p className="text-sm neutral-600">
                      Free cancellation until{" "}
                      {new Date(
                        primaryRate.cancellationPolicies[0].from
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="box-button-book ">
                  {" "}
                  <button
                    className="btn btn-book"
                    onClick={() => onReserve(room)}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
