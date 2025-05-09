'use client'
import ByActivities from '@/components/Filter/ByActivities'
import ByAttraction from '@/components/Filter/ByAttraction'
import ByDuration from '@/components/Filter/ByDuration'
import ByLanguage from '@/components/Filter/ByLanguage'
import ByPagination from '@/components/Filter/ByPagination'
import ByPrice from '@/components/Filter/ByPrice'
import ByRating from '@/components/Filter/ByRating'
import SortToursFilter from '@/components/elements/SortToursFilter'
import TourCard3 from '@/components/elements/tourcard/TourCard3'
import Layout from "@/components/layout/Layout"
import SwiperGroup3Slider from '@/components/slider/SwiperGroup3Slider'
import rawToursData from "@/util/tours.json"
import useTourFilter from '@/util/useTourFilter'
import Link from "next/link"
const toursData = rawToursData.map(tour => ({
	...tour,
	duration: parseFloat(tour.duration as string),
	groupSize: parseInt(tour.groupSize as unknown as string),
	rating: parseFloat(tour.rating as string)
}))
export default function Activities() {
	const {
		filter,
		sortCriteria,
		itemsPerPage,
		currentPage,
		uniqueActivities,
		uniqueLanguages,
		uniqueAttractions,
		uniqueRatings,
		sortedTours,
		totalPages,
		paginatedTours,
		handleCheckboxChange,
		handleSortChange,
		handlePriceRangeChange,
		handleDurationRangeChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useTourFilter(toursData)

	return (
		<>

			{/* <Layout headerStyle={1} footerStyle={1}> */}
				<main className="main">
					<section className="box-section block-banner-tourlist block-banner-activities">
						<div className="container">
							<div className="text-start">
								<h3>Adventure Activities</h3>
								<h6 className="heading-6-medium">Easily search for top tours offered by our professional network</h6>
							</div>
							<div className="box-list-populars">
								<div className="row">
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Venice</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination2.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Amsterdam</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination3.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Budapest</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination4.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Lisbon</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination5.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">London</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination6.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Ottawa</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination7.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Paris</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination8.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="#">Paris</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="#">356 Tours</Link></div>
													<div className="card-button"> <Link href="#">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="box-section block-content-tourlist box-border-bottom background-body">
						<div className="container">
							<div className="box-content-main">
								<div className="content-right">
									<div className="box-filters mb-25 pb-5 border-bottom border-1">
										<SortToursFilter
											sortCriteria={sortCriteria}
											handleSortChange={handleSortChange}
											itemsPerPage={itemsPerPage}
											handleItemsPerPageChange={handleItemsPerPageChange}
											handleClearFilters={handleClearFilters}
											startItemIndex={startItemIndex}
											endItemIndex={endItemIndex}
											sortedTours={sortedTours}
										/>
									</div>
									<div className="box-grid-tours wow fadeIn">
										<div className="row">
											{paginatedTours.map((tour) => (
												<div className="col-xl-4 col-lg-6 col-md-6" key={tour.id}>
													<TourCard3 tour={tour} />
												</div>
											))}
										</div>
									</div>
									<ByPagination
										handlePreviousPage={handlePreviousPage}
										totalPages={totalPages}
										currentPage={currentPage}
										handleNextPage={handleNextPage}
										handlePageChange={handlePageChange}
									/>
								</div>
								<div className="content-left order-lg-first">
									<div className="sidebar-left border-1 background-brand-2">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse">Select Your Dates</h6>
												<div className="box-collapse scrollFilter mb-10">
													<div className="pt-0">
														<div className="box-input-date">
															<div className="input-calendar"><span className="clear-input" />
																<input className="form-control calendar-date" type="text" defaultValue="17/02/2024" />
																<svg width={18} height={18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
																	<path d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z" />
																</svg>
															</div>
														</div>
														<p className="text-xs-medium text-found">32 Tours found</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Filter Price </h6>
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
												<h6 className="text-lg-bold item-collapse neutral-1000">By Activities</h6>
												<ByActivities
													uniqueActivities={uniqueActivities}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">By Attractions</h6>
												<ByAttraction
													uniqueAttractions={uniqueAttractions}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">By Durations</h6>
												<ByDuration
													filter={filter}
													handleDurationRangeChange={handleDurationRangeChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Review Score </h6>
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
												<h6 className="text-lg-bold item-collapse neutral-1000">By Language </h6>
												<ByLanguage
													uniqueLanguages={uniqueLanguages}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<h6 className="text-lg-bold neutral-1000">Popular Tours</h6>
										<div className="box-popular-posts">
											<ul>
												<li>
													<div className="card-post">
														<div className="card-image"> <Link href="#"> <img src="/assets/imgs/page/tour/post.png" alt="StayChain" /></Link></div>
														<div className="card-info"> <Link className="text-xs-bold" href="#">Singapore Skylines: Urban Exploration</Link><span className="price text-sm-bold neutral-1000">$48.25</span><span className="price-through text-sm-bold neutral-500">$60.75</span></div>
													</div>
												</li>
												<li>
													<div className="card-post">
														<div className="card-image"> <Link href="#"> <img src="/assets/imgs/page/tour/post2.png" alt="StayChain" /></Link></div>
														<div className="card-info"> <Link className="text-xs-bold" href="#">Singapore Skylines: Urban Exploration</Link><span className="price text-sm-bold neutral-1000">$48.25</span><span className="price-through text-sm-bold neutral-500">$60.75</span></div>
													</div>
												</li>
												<li>
													<div className="card-post">
														<div className="card-image"> <Link href="#"> <img src="/assets/imgs/page/tour/post3.png" alt="StayChain" /></Link></div>
														<div className="card-info"> <Link className="text-xs-bold" href="#">Singapore Skylines: Urban Exploration</Link><span className="price text-sm-bold neutral-1000">$48.25</span><span className="price-through text-sm-bold neutral-500">$60.75</span></div>
													</div>
												</li>
												<li>
													<div className="card-post">
														<div className="card-image"> <Link href="#"> <img src="/assets/imgs/page/tour/post4.png" alt="StayChain" /></Link></div>
														<div className="card-info"> <Link className="text-xs-bold" href="#">Singapore Skylines: Urban Exploration</Link><span className="price text-sm-bold neutral-1000">$48.25</span><span className="price-through text-sm-bold neutral-500">$60.75</span></div>
													</div>
												</li>
												<li>
													<div className="card-post">
														<div className="card-image"> <Link href="#"> <img src="/assets/imgs/page/tour/post5.png" alt="StayChain" /></Link></div>
														<div className="card-info"> <Link className="text-xs-bold" href="#">Singapore Skylines: Urban Exploration</Link><span className="price text-sm-bold neutral-1000">$48.25</span><span className="price-through text-sm-bold neutral-500">$60.75</span></div>
													</div>
												</li>
											</ul>
										</div>
										<div className="box-see-more mt-20 mb-25"> <Link className="link-see-more" href="#">See more
											<svg width={8} height={6} viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg">
												<path d="M7.89553 1.02367C7.75114 0.870518 7.50961 0.864815 7.35723 1.00881L3.9998 4.18946L0.642774 1.00883C0.490387 0.86444 0.249236 0.870534 0.104474 1.02369C-0.0402885 1.17645 -0.0338199 1.4176 0.118958 1.56236L3.73809 4.99102C3.81123 5.06036 3.90571 5.0954 3.9998 5.0954C4.0939 5.0954 4.18875 5.06036 4.26191 4.99102L7.88104 1.56236C8.03382 1.41758 8.04029 1.17645 7.89553 1.02367Z" />
											</svg></Link></div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-news background-body">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-md-6 mb-30 wow fadeInLeft">
									<h2 className="neutral-1000">News, Tips  Guides</h2>
									<p className="text-xl-medium neutral-500">Favorite destinations based on customer reviews</p>
								</div>
								<div className="col-md-6 mb-30 wow fadeInRight">
									<div className="d-flex justify-content-center justify-content-md-end"><Link className="btn btn-black-lg" href="#">View More
										<svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
										</svg></Link></div>
								</div>
							</div>
							<div className="box-list-news wow fadeInUp">
								<div className="box-swiper mt-30">
									<div className="swiper-container swiper-group-3">
										<SwiperGroup3Slider />
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-media background-body">
						<div className="container-media wow fadeInUp"> <img src="/assets/imgs/page/homepage5/media.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media2.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media3.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media4.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media5.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media6.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media7.png" alt="StayChain" /></div>
					</section>
				</main>

			{/* </Layout> */}
		</>
	)
}