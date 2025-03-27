"use client";

import GlobalLoader from "@/components/Loader";
import { useState } from "react";

export default function HelpCenter() {
  const [loading, setLoading] = useState(false);
  const handleLoadHotels = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hotelAPi/load-hotels");
      console.log(response);
    } catch (err: any) {
      console.log("Error occured in hotels load", err.message);
    } finally {
      setLoading(false);
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
        <GlobalLoader
          visible={loading}
          variant="pulse"
          size="lg"
          message="loading..."
          color="#4f46e5" // indigo-600
        />
        <section className="box-section box-location-shop box-location-shop-2 background-body">
          <div className="container d-flex gap-2">
            <div className="d-inline-block">
              {" "}
              <button
                className="btn btn-black-lg-square"
                onClick={handleLoadHotels}
                disabled={loading}
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
