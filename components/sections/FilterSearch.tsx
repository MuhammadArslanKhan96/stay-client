"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimate } from "@/util/swiperOption";
import Link from "next/link";
import { getImageLink } from "@/util/getImageLink";

export default function GlobalHotelSearch() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        setIsLoading(true);
        setError(null);

        const res1 = await fetch(
          "https://api.apify.com/v2/datasets/z1obKFLPGtd8SLyOY/items?token=apify_api_AbF8egMaHyMjh3Hdhtq1CnNjst9QwE2fQM0F&fields=name,stars,rating,reviews,image&format=json"
        );
        const apyHotels = await res1.json();

        const res2 = await fetch("/api/hotels");
        const topRatedHotels = await res2.json();

        const normalizedTopRated = Array.isArray(topRatedHotels)
          ? topRatedHotels.map((hotel: any) => ({
              name: hotel.name || hotel.hotelName,
              stars: hotel.stars || "N/A",
              rating: hotel.rating || "No rating",
              reviews: hotel.reviews || 0,
              image: hotel.image || "/default-hotel.jpg",
            }))
          : [];

        const combinedHotels = [
          ...(Array.isArray(apyHotels) ? apyHotels : []),
          ...normalizedTopRated,
        ];

        setHotels(combinedHotels);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error.message);
        setError("Failed to load hotels. Please try again.");
        setIsLoading(false);
      }
    }

    fetchHotels();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredHotels([]);
      return;
    }

    const filtered = hotels.filter((hotel) =>
      hotel.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHotels(filtered);
  }, [searchQuery, hotels]);

  return (
        <>
            <section className="section-box box-filter-search background-body">
				<div className="container">
					<div className="block-filter-search">
						<div className="filter-left">
							<form className="form-search-filter" action="#">
								<input className="form-control" type="text" name="key" placeholder="What are you looking for?"  value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
							</form>
						</div>
						<div className="filter-right">							
							<Link className="category-link btn-click" href="#">Hotels</Link>
							<Link className="category-link btn-click" href="#">Activities</Link>
						</div>
					</div>
				</div>
			</section>

            <section className="section-box box-top-rated background-body">
                <div className="container">

                    {error && <div className="text-center text-red-500">{error}</div>}

                    <div className="container-slider box-swiper-padding ">
                    {isLoading ? (
                        <div className="flex justify-center"></div>
                    ) : filteredHotels.length > 0 ? (
                        <Swiper
                            {...swiperGroupAnimate}
                            slidesPerView={2} 
                            spaceBetween={20} 
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 }, 
                                1024: { slidesPerView: 3 }, 
                            }}
                            >
                            {filteredHotels.map((hotel, index) => (
                                <SwiperSlide key={index}>
                                <div className="card-journey-small background-card p-0">
                                    <div className="card-image">
                                    <img
                                        src={(hotel.image)}
                                        alt={hotel.name || "Hotel Image"}
                                    />
                                    </div>
                                    <div className="card-info height-for-text">
                                    <div className="card-title heading-6 neutral-1000 hotel-names">
                                        {hotel.name}
                                    </div>
                                    <div className="card-button">
                                        <Link className="btn btn-gray" href="/hotel-detail">
                                        Book Now
                                        </Link>
                                    </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                            ))}
                            </Swiper>

                    ) : searchQuery ? (
                        <div className="flex justify-center">No hotels found.</div>
                    ) : (
                        <div className="flex justify-center">
                        
                        </div>
                    )}
                    </div>
                </div>
            </section>
    </>
  );
}
