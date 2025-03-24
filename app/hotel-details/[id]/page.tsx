"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
export default function HotelDetail2() {
  const router = usePathname();
  const [hotel, setHotel] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [propertyID, setPropertyID] = useState("");

  useEffect(() => {
    async function getHotel() {
      if (router) {
        setLoading(true);
        const url = router.split("/");
        const id = url[url.length - 1];
        const response = await fetch(`/api/gateway-casas/hotels/${id}`, {
          method: "GET",
        });
        console.log("Response from GET Property...");
        console.log(response);
        if (response.status == 404) {
          redirect("/not-found");
        }
        const hotel = await response.json();
        setHotel(hotel);
        setPropertyID(id);
        setLoading(false);
      }
    }
    getHotel();
  }, []);

  function handleReserveBooking() {
    alert("Reserve the booking.");
  }
  console.log("Hotel , ", hotel);
  if (loading) {
    return <h1>Wait, for a moment...</h1>;
  }
  return (
    <>
      {/* <Layout headerStyle={1} footerStyle={1}> */}
      <main className="main gap-3">
        {/* <section className="box-section box-breadcrumb background-body">
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
                <Link href="/destination">Hotels</Link>
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
                <span className="text-breadcrumb">{hotel?.propertyName}</span>
              </li>
            </ul>
          </div>
        </section> */}

        {/* Name Address */}
        <section className="box-section background-body py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-10">
                <h4 className="neutral-1000">{hotel?.propertyName}</h4>
                <div className="d-flex align-items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.72 4 7.87 7 12 3-4.13 7-8.28 7-12 0-3.87-3.13-7-7-7zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                  <p className="neutral-1000">{hotel?.propertyAddress}</p>
                </div>
              </div>
              <div className="col-md-2 text-end d-flex align-items-center">
                <button
                  className="btn btn-primary rounded"
                  onClick={handleReserveBooking}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pictures Grid */}
        <section className="box-section box-banner-tour-detail background-body pt-3">
          <div className="block-banner-tour-detail">
            <div className="row">
              <div className="col-xl-4 col-lg-6">
                <div className="row">
                  <div className="col-lg-12 col-sm-6">
                    <div className="banner-detail-1">
                      {" "}
                      <img
                        src={
                          hotel?.housePictures[0]?.urlImageOriginal ||
                          "/assets/imgs/page/tour-detail/banner.png"
                        }
                        alt="Travile"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6">
                    <div className="banner-detail-2">
                      {" "}
                      <img
                        src={
                          hotel?.housePictures[1]?.urlImageOriginal ||
                          "/assets/imgs/page/tour-detail/banner2.png"
                        }
                        alt="Travile"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12">
                <div className="banner-detail-3">
                  {" "}
                  <img
                    src={
                      hotel?.housePictures[2]?.urlImageOriginal ||
                      "/assets/imgs/page/tour-detail/banner3.png"
                    }
                    alt="Travile"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-12">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="banner-detail-4">
                      {" "}
                      <img
                        src={
                          hotel?.housePictures[3]?.urlImageOriginal ||
                          "/assets/imgs/page/tour-detail/banner4.png"
                        }
                        alt="Travile"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="banner-detail-5">
                      {" "}
                      <img
                        src={
                          hotel?.housePictures[4]?.urlImageOriginal ||
                          "/assets/imgs/page/tour-detail/banner5.png"
                        }
                        alt="Travile"
                      />
                    </div>
                  </div>
                </div>
                <div className="banner-detail-6">
                  {" "}
                  <img
                    src={
                      hotel?.housePictures[5]?.urlImageOriginal ||
                      "/assets/imgs/page/tour-detail/banner6.png"
                    }
                    alt="Travile"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="box-section box-banner-tour-detail background-body pt-3">
          <div className="block-banner-tour-detail">
            <div className="row">
              <p
                className="neutral-500"
                dangerouslySetInnerHTML={{ __html: hotel?.propertyDescription }}
              />
            </div>
            <div className="row mt-4 pb-2">
              <div className="card-tags my-2">
                <h6 className="neutral-1000 mb-2">Popular Facilities</h6>
                {hotel?.amenities?.map((am: any) => (
                  <Link className="btn btn-tag-border m-1" key={am.id} href="#">
                    {am?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="box-section block-content-tourlist background-body pt-3">
          <div className="container">
            <div className="box-content-main-detail">
              <div className="box-grid-hotels box-list-hotels-detail wow fadeIn">
                <div className="card-flight card-hotel background-card">
                  <div className="card-image">
                    {" "}
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
                        src={
                          hotel?.featuredPicture?.urlImageRegular ||
                          "/assets/imgs/page/hotel/hotelRoom.png"
                        }
                        alt="StayChain"
                      />
                    </Link>
                  </div>
                  <div className="card-info">
                    {/* <label className="sale-lbl">-25%</label> */}
                    <div className="tour-rate">
                      <div className="rate-element">
                        <span className="rating">
                          {hotel?.stars}
                          <span className="text-sm-medium neutral-500">
                            (672 reviews)
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="card-title">
                      {" "}
                      <Link
                        className="heading-6 neutral-1000"
                        href="/room-detail"
                      >
                        {hotel?.propertyName}
                      </Link>
                    </div>
                    <div className="card-hotel-2-col">
                      <div className="card-program">
                        {/* <div className="card-tags">
                          {hotel?.amenities?.map((am: any, index: number) => (
                            <Link
                              className="btn btn-tag-border"
                              key={am.id}
                              href="#"
                            >
                              {am?.name}
                            </Link>
                          ))}
                        </div> */}
                        <div className="card-facilities">
                          <ul className="list-tick-green">
                            <li>King Size Bed</li>
                            <li>Safety Box</li>
                            <li>Balcony</li>
                            <li>48 Inch TV</li>
                            <li>Disable Access</li>
                            <li>Pet Allowed</li>
                          </ul>
                        </div>
                        <div className="card-hotel-desc">
                          <p className="text-md-medium neutral-500">
                            The dark wood paneling and furnishings, deluxe
                            red-draped four-poster bed, and magnificent black
                            stone bathroom. The intimate scale and finish give
                            the room a distinctly personal feel.
                          </p>
                        </div>
                      </div>
                      <div className="card-hotel-price">
                        <div className="box-hotel-price">
                          {/* <p className="price-throught text-20-medium neutral-500">
                            $250
                          </p> */}
                          <h4 className="price-main neutral-1000">
                            ${hotel?.priceBase}
                          </h4>
                          <p className="text-md-medium neutral-500">
                            Per Night
                          </p>
                          <div className="card-button">
                            {" "}
                            <Link
                              hrefLang="#reserveFormID"
                              className="btn btn-gray"
                              href="#"
                            >
                              Reserve now
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="d-flex justify-content-center pt-3 background-body"
          id="reserveFormID"
        >
          <div className="col-lg-4">
            <div className="booking-form">
              <div className="head-booking-form">
                <p className="text-xl-bold neutral-1000">Booking Form</p>
              </div>
              <BookingForm propertyID={propertyID} price={hotel?.priceBase} />
            </div>
          </div>
        </section>
      </main>
      {/* </Layout> */}
    </>
  );
}

function BookingForm({ propertyID, price }: any) {
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(false);
  console.log(propertyID, price);

  const handleBooking = async (event: any) => {
    try {
      event.preventDefault();
      const body = {
        checkin: startTime,
        checkout: endTime,
        propertyID,
        currencyWished: "BRL",
        language: "en",
      };

      console.log(body);

      const response = await fetch("/api/gateway-casas/reserve-booking", {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log("receive data from the booking endpoint ", data);
      // console.log("Handle Reserve Booking");
    } catch (err) {
      console.log("Error while adding booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="content-booking-form">
        <div className="item-line-booking">
          {" "}
          <strong className="text-md-bold neutral-1000">Check In:</strong>
          <div className="input-calendar">
            <input
              className="form-control calendar-date"
              type="date"
              required={true}
              onChange={(e) => {
                e.preventDefault();
                setStartTime(new Date(e.target.value).toISOString());
              }}
            />
            {/* <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z" fill="#9CA3AF" />
            </svg> */}
          </div>
        </div>

        <div className="item-line-booking">
          {" "}
          <strong className="text-md-bold neutral-1000">Check Out:</strong>
          <div className="input-calendar">
            <input
              className="form-control calendar-date"
              type="date"
              required={true}
              onChange={(e) => {
                e.preventDefault();
                setEndTime(new Date(e.target.value).toISOString());
              }}
            />
            {/* <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z" fill="#9CA3AF" />
            </svg> */}
          </div>
        </div>

        {/* <div className="item-line-booking">
          <div className="box-tickets">
            <strong className="text-md-bold neutral-1000">Room</strong>
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-md-medium neutral-500 mr-30">
                  {"Room Name"}
                </p>
              </div>
            </div>
          </div>
          <div className="box-tickets">
            <strong className="text-md-bold neutral-1000">Location</strong>
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-md-medium neutral-500 mr-30">
                  {"hotel?.city?.toUpperCase()"}
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="item-line-booking last-item">
          {" "}
          <strong className="text-md-bold neutral-1000">Total:</strong>
          <div className="line-booking-right">
            <p className="text-xl-bold neutral-1000">${price}</p>
          </div>
        </div>
        {loading ? (
          <>
            <div className="box-button-book">
              <a className="btn btn-book">Loading...</a>
            </div>
          </>
        ) : (
          <div className="box-button-book" onClick={handleBooking}>
            {" "}
            <a className="btn btn-book" href="#">
              Reserve
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 15L15 8L8 1M15 8L1 8"
                  stroke="#0D0D0D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}

        <div className="box-need-help">
          {" "}
          <a href="help-center.html">
            <svg
              width={12}
              height={14}
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z"
                fill="#0D0D0D"
              />
            </svg>
            Need some help?
          </a>
        </div>
      </div>
    </>
  );
}

/**
 * 
 * <section className="background-body">
          <div className="card-tags m">
            <h6>Popular Facilities</h6>
            {hotel?.amenities?.map((am: any) => (
              <Link className="btn btn-tag-border m-1" key={am.id} href="#">
                {am?.name}
              </Link>
            ))}
          </div>
        </section>
 */
