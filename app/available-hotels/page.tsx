"use client";
import ByAmenities from "@/components/Filter/ByAmenities";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByPropertyType from "@/components/Filter/ByPropertyType";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterTop from "@/components/elements/CheckInSearchFilter";
import SortPropertiesFilter from "@/components/elements/SortPropertiesFilter";
import PropertyCard1 from "@/components/elements/propertycard/PropertyCard1";
import PropertyList from "@/components/elements/propertycard/propertyList";
import { getHotels } from "@/lib/api";
import rawPropertiesData from "@/util/properties.json";
import usePropertyFilter from "@/util/usePropertyFilter";
import { useEffect, useState } from "react";

const propertiesData = rawPropertiesData.map((property) => ({
  ...property,
  rating: parseFloat(property.rating as string),
}));

interface SearchParams {
  locationName?: string;
  lat?: string;
  lng?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  rooms?: string;
}

export default function AvailabilityComponent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [hotels, setHotels] = useState<any>([]);
  const {
    filter,
    setFilter,
    sortCriteria,
    setSortCriteria,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    uniqueNames,
    uniqueAmenities,
    uniqueLocations,
    uniqueRatings,
    uniquePropertyTypes,
    filteredProperties,
    sortedProperties,
    totalPages,
    startIndex,
    endIndex,
    paginatedProperties,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = usePropertyFilter(hotels);

  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    console.log("Search param is changed, ", searchParams);
    loadHotels();
  }, [searchParams]);

  async function loadHotels() {
    try {
      const params = {
        location: searchParams.locationName,
        lat: searchParams.lat,
        lng: searchParams.lng,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        adults: Number(searchParams.adults),
        children: Number(searchParams.children),
        rooms: Number(searchParams.rooms),
      };
      const hotelsData = await getHotels(params);
      console.log("Hotels data is here: ", hotelsData);
      if (hotelsData) setHotels(hotelsData);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  console.log(uniqueLocations);

  return (
    <>
      {/* <Layout headerStyle={1} footerStyle={1}> */}
      <main className="main">
        <SearchFilterTop />
        {/* <section className="section-box box-slide-property background-body">
          <div className="container-fluid">
            <div className="box-slide-property-inner">
              <div className="box-swiper">
                <div className="swiper-container swiper-group-6">
                  <SwiperGroup6Slider />
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="box-section block-content-tourlist background-body">
          <div className="container">
            <div className="box-content-main">
              <div className="content-right">
                <div className="box-filters mb-25 pb-5 border-bottom border-1">
                  <SortPropertiesFilter
                    sortCriteria={sortCriteria}
                    handleSortChange={handleSortChange}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    handleClearFilters={handleClearFilters}
                    startItemIndex={startItemIndex}
                    endItemIndex={endItemIndex}
                    sortedProperties={sortedProperties}
                    setIsGridView={setIsGridView}
                    isGridView={isGridView}
                  />
                </div>

                {/* For Property List */}

                {isGridView ? (
                  <div className="box-grid-property wow fadeIn">
                    <div className="row">
                      {paginatedProperties.map((property) => (
                        <div
                          className="col-lg-4 col-md-6 wow fadeInUp"
                          key={property.id}
                        >
                          <PropertyCard1 property={property} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="box-list-tours list-tours wow fadeIn">
                    <div className="row">
                      {paginatedProperties.map((property) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6"
                          key={property.id}
                        >
                          <PropertyList property={property} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* For property Grid */}

                <ByPagination
                  handlePreviousPage={handlePreviousPage}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handleNextPage={handleNextPage}
                  handlePageChange={handlePageChange}
                />
              </div>
              <div className="content-left order-lg-first">
                <div className="sidebar-left border-1 background-body">
                  <div className="box-filters-sidebar">
                    <div className="block-filter border-1">
                      <h6 className="text-lg-bold item-collapse neutral-1000">
                        Filter Price{" "}
                      </h6>
                      <ByPrice
                        filter={filter}
                        handlePriceRangeChange={handlePriceRangeChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="sidebar-left border-1 background-body">
                  <div className="box-filters-sidebar">
                    <div className="block-filter border-1">
                      <h6 className="text-lg-bold item-collapse neutral-1000">
                        Properties Type
                      </h6>
                      <ByPropertyType
                        uniquePropertyTypes={uniquePropertyTypes}
                        filter={filter}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="sidebar-left border-1 background-body">
                  <div className="box-filters-sidebar">
                    <div className="block-filter border-1">
                      <h6 className="text-lg-bold item-collapse neutral-1000">
                        Amenities
                      </h6>
                      <ByAmenities
                        uniqueAmenities={uniqueAmenities}
                        filter={filter}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Rooms and beds</h6>
												<div className="box-collapse scrollFilter">
													<p className="text-sm-medium neutral-500">Bedrooms</p>
													<div className="list-number-choose"> <Link href="#">1</Link><Link href="#">2</Link><Link href="#">3</Link><Link href="#">4</Link><Link href="#">5+</Link></div>
													<p className="text-sm-medium neutral-500">Beds</p>
													<div className="list-number-choose"> <Link href="#">1</Link><Link href="#">2</Link><Link href="#">3</Link><Link href="#">4</Link><Link href="#">5+</Link></div>
													<p className="text-sm-medium neutral-500">Bathrooms</p>
													<div className="list-number-choose"> <Link href="#">1</Link><Link href="#">2</Link><Link href="#">3</Link><Link href="#">4</Link><Link href="#">5+</Link></div>
												</div>
											</div>
										</div>
									</div> */}
                <div className="sidebar-left border-1 background-body">
                  <div className="box-filters-sidebar">
                    <div className="block-filter border-1">
                      <h6 className="text-lg-bold item-collapse neutral-1000">
                        Review Score{" "}
                      </h6>
                      <ByRating
                        uniqueRatings={uniqueRatings}
                        filter={filter}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="sidebar-left border-1 background-body">
                  <div className="box-filters-sidebar">
                    <div className="block-filter border-1">
                      <h6 className="text-lg-bold item-collapse neutral-1000">
                        Booking Location
                      </h6>
                      <ByLocation
                        uniqueLocations={uniqueLocations}
                        filter={filter}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box block-ads background-body">
          <div className="container wow fadeInUp">
            {" "}
            <img
              src="/assets/imgs/page/homepage9/banner-ads.png"
              alt="StayChain"
            />
          </div>
        </section>
        <div className="pb-110 background-body" />
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
