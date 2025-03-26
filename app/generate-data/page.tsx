"use client";
export default function HelpCenter() {
  const handleLoadHotels = async () => {
    try {
      const response = await fetch("/api/hotelAPi/load-hotels");
      console.log(response);
    } catch (err: any) {
      console.log("Error occured in hotels load", err.message);
    }
  };
  const handleLoadProperties = async () => {
    try {
      const response = await fetch("/api/gateway-casas/load-properties");
      console.log(response);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      {/* <Layout headerStyle={1} footerStyle={1}> */}
      <main className="main">
        <section className="box-section box-location-shop box-location-shop-2 background-body">
          <div className="container d-flex gap-2">
            <div className="d-inline-block">
              {" "}
              <button
                className="btn btn-black-lg-square"
                onClick={handleLoadHotels}
              >
                Load Hotels
              </button>
            </div>
            <div className="d-inline-block">
              {" "}
              <button
                className="btn btn-black-lg-square"
                onClick={handleLoadProperties}
              >
                Load Properties
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* </Layout> */}
    </>
  );
}
