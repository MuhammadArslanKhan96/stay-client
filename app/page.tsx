import Check from "@/components/elements/CheckInSearchFilter";
import Category from "@/components/sections/Category";
import FilterSearch from "@/components/sections/FilterSearch";
import Payments1 from "@/components/sections/Payments1";
import Subscriber1 from "@/components/sections/Subscriber1";
import Testimonials1 from "@/components/sections/Testimonials1";
import TopRated1 from "@/components/sections/TopRated1";
import TopRated2 from "@/components/sections/TopRated2";
import TopRatedHotels from "@/components/sections/TopRatedHotels";
import WhyChooseUs1 from "@/components/sections/WhyChooseUs1";

export default function Home() {
  return (
    <>
      {/* <Layout headerStyle={1} footerStyle={1}> */}
      <Check />
      <FilterSearch />
      {/* <YourJourney /> */}
      {/* <PopularDestinations1 /> */}
      <TopRatedHotels />

      {/* <WhyChooseUs1 /> */}
      {/* <Category /> */}
      {/* <Payments1 /> */}
      {/* <Testimonials1 /> */}
      {/* <News1 /> */}
      {/* <Subscriber1 /> */}
      {/* </Layout> */}
    </>
  );
}
