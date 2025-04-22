"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimate } from "@/util/swiperOption";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHotelImages } from "@/util/hotelImages";
export default function TopRatedHotels() {
  const [hotels, setHotels] = useState<any>([]);

  // Home page auto fetch Top ten hotels...
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch("/api/hotelAPi/checkroute");
  //       const data = await response.json();
  //       console.log("Response, top10  ", response);
  //       console.log("Data, top10 ", data);
  //       const { hotels } = data;
  //       if (hotels) {
  //         setHotels(hotels);
  //       }
  //     } catch (err) {
  //       console.log("Error while fetching top rated hotels...");
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/db/tophotels");
        const data = await response.json();
        console.log("DB DATA hotel ", data);
        const hotels = data?.data;
        if (hotels) {
          setHotels(hotels);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const displayHotels = () => {
    let updatedHotels = hotels;
    if (hotels.length > 10) {
      updatedHotels = getFirstTenUniqueNames(hotels);
    }
    return updatedHotels.map((hotel: any, index: number) => {
      const hotelImages = getHotelImages(hotel.api_hotel_images, "original");
      const hotelImagePath = hotelImages[1]?.url;

      !hotelImagePath &&
        console.log("NOT IMAGE found for " + hotel.name_content);

      const hotelname = hotel?.name_content;

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
              <img src={hotelImagePath ? hotelImagePath : ""} alt="StayChain" />
            </div>
            <div className="card-info">
              <div className="card-rating">
                <div className="card-left"> </div>
                <div className="card-right">
                  {" "}
                  <span className="rating">
                    {hotel?.rating}{" "}
                    <span className="text-sm-medium neutral-500">
                      ({hotel?.reviews} reviews)
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
                  {hotelname}
                </Link>
              </div>
              <div className="card-program">
                <div className="card-location">
                  <p className="text-location text-md-medium neutral-500">
                    {hotel?.city_content}, {hotel?.country_code}
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
                      {hotel?._count?.api_hotel_rooms || 0}
                    </h6>
                    <p className="text-md-medium neutral-500">Rooms</p>
                  </div>
                  <div className="card-button">
                    {" "}
                    <Link
                      className="btn btn-gray"
                      href={`/hotel-detail-3/${hotel?.code}`}
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
              <h2 className="neutral-1000">Top Rated Hotels</h2>
              <p className="text-xl-medium neutral-500">
                Quality as judged by customers. Book at the ideal price!
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-end">
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
        </div>
        <div className="container-slider box-swiper-padding">
          <div className="box-swiper mt-30">
            <div className="swiper-container swiper-group-animate swiper-group-journey">
              {hotels?.length < 1 ? (
                // {hotels.length > 0 ? (
                <span>hotel not found!</span>
              ) : (
                <Swiper {...swiperGroupAnimate}>{displayHotels()}</Swiper>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// export default function TopRatedHotels() {
//   const [hotels, setHotels] = useState<any>([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetch("/api/customhotels");
//         const data = await response.json();
//         console.log("Hotels data...");
//         console.log(data);

//         if (hotels) {
//           // setHotels(hotels);
//         }
//       } catch (err) {
//         console.log("Error while fetching top rated hotels...");
//       }
//     })();
//   }, []);
//   const displayHotels = () => {
//     let updatedHotels = hotels;
//     if (hotels.length > 10) {
//       updatedHotels = getFirstTenUniqueNames(hotels);
//     }
//     return updatedHotels.map((hotel: any, index: number) => {
//       return (
//         <SwiperSlide key={index}>
//           <div className="card-journey-small background-card">
//             <div className="card-image">
//               {" "}
//               <Link className="wish" href={`/hotel-detail-3/${hotel.code}`}>
//                 <svg
//                   width={20}
//                   height={18}
//                   viewBox="0 0 20 18"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z"
//                     stroke=""
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     fill="none"
//                   />
//                 </svg>
//               </Link>
//               <img src={hotel.imageSource} alt="StayChain" />
//             </div>
//             <div className="card-info">
//               <div className="card-rating">
//                 <div className="card-left"> </div>
//                 <div className="card-right">
//                   {" "}
//                   <span className="rating">
//                     {hotel?.rating}{" "}
//                     <span className="text-sm-medium neutral-500">
//                       ({hotel?.reviews} reviews)
//                     </span>
//                   </span>
//                 </div>
//               </div>
//               <div className="card-title">
//                 {" "}
//                 <Link
//                   className="heading-6 neutral-1000"
//                   href={`/hotel-detail-3/${hotel.code}`}
//                 >
//                   {hotel?.name || "Hotel"}
//                 </Link>
//               </div>
//               <div className="card-program">
//                 <div className="card-location">
//                   <p className="text-location text-md-medium neutral-500">
//                     {}, {hotel?.countryCode}
//                   </p>
//                   <p className="text-star">
//                     {" "}
//                     <img
//                       className="light-mode"
//                       src="/assets/imgs/template/icons/star-black.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="light-mode"
//                       src="/assets/imgs/template/icons/star-black.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="light-mode"
//                       src="/assets/imgs/template/icons/star-black.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="light-mode"
//                       src="/assets/imgs/template/icons/star-black.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="light-mode"
//                       src="/assets/imgs/template/icons/star-black.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="dark-mode"
//                       src="/assets/imgs/template/icons/star-w.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="dark-mode"
//                       src="/assets/imgs/template/icons/star-w.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="dark-mode"
//                       src="/assets/imgs/template/icons/star-w.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="dark-mode"
//                       src="/assets/imgs/template/icons/star-w.svg"
//                       alt="StayChain"
//                     />
//                     <img
//                       className="dark-mode"
//                       src="/assets/imgs/template/icons/star-w.svg"
//                       alt="StayChain"
//                     />
//                   </p>
//                 </div>
//                 <div className="endtime">
//                   <div className="card-price">
//                     <h6 className="heading-6 neutral-1000">
//                       {hotel?.rooms?.length}
//                     </h6>
//                     <p className="text-md-medium neutral-500">Rooms</p>
//                   </div>
//                   <div className="card-button">
//                     {" "}
//                     <Link
//                       className="btn btn-gray"
//                       href={`/hotel-detail-3/${hotel.code}`}
//                     >
//                       Book Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       );
//     });
//   };
//   return (
//     <>
//       <section className="section-box box-top-rated background-1">
//         <div className="container">
//           <div className="row align-items-end">
//             <div className="col-md-6">
//               <h2 className="neutral-1000">Top Rated Hotels</h2>
//               <p className="text-xl-medium neutral-500">
//                 Quality as judged by customers. Book at the ideal price!
//               </p>
//             </div>
//             <div className="col-md-6">
//               <div className="d-flex justify-content-end">
//                 <Link className="btn btn-black-lg" href="#">
//                   View More
//                   <svg
//                     width={16}
//                     height={16}
//                     viewBox="0 0 16 16"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M8 15L15 8L8 1M15 8L1 8"
//                       stroke=""
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       fill="none"
//                     />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container-slider box-swiper-padding">
//           <div className="box-swiper mt-30">
//             <div className="swiper-container swiper-group-animate swiper-group-journey">
//               {hotels?.length < 1 ? (
//                 // {hotels.length > 0 ? (
//                 <span>hotel not found!</span>
//               ) : (
//                 <Swiper {...swiperGroupAnimate}>{displayHotels()}</Swiper>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

function getFirstTenUniqueNames<T extends { name: string }>(items: T[]): T[] {
  const uniqueNames = new Set<string>(); // To track unique names
  const result: T[] = []; // Array to store the result

  for (const item of items) {
    if (!uniqueNames.has(item.name)) {
      // Check if the name is unique
      uniqueNames.add(item.name); // Add the name to the Set
      result.push(item); // Add the entire object to the result array

      if (result.length === 10) {
        // Stop when we have 10 unique items
        return result; // Return immediately
      }
    }
  }

  // If there are fewer than 10 unique items, return all unique items
  return result;
}

function getRandomIndex(n: number) {
  return Math.floor(Math.random() * n);
}
