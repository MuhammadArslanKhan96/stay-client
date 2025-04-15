"use client";
import { useEffect, useState } from "react";

export default function ShowBookings() {
  const [bookings, setBookings] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const store: any = localStorage.getItem("dynamic_store");
        const storeJson = JSON.parse(store);
        const email = storeJson?.state?.user?.email;
        if (!email) {
          alert("You are not logged in.");
          return;
        }
        const response = await fetch(`/api/db/show-bookings?id=${email}`);
        const data = await response.json();
        console.log(data);
        const bookings = data.bookings;

        setBookings(bookings);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        const res = await fetch("/api/db/cancel-booking", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId }),
        });

        const result = await res.json();
        const newBookings = bookings.filter(
          (booking: any) => booking.id !== bookingId
        );
        setBookings(newBookings);
      } catch (err: any) {
        console.log("Error occured while deleting the booking.");
        console.log(err.message);
      }
      console.log("Cancel booking with ID:", bookingId);
    }
  };

  console.log("Bookings: ", bookings);
  return (
    <div className="background-body">
      <div className="container mt-4">
        <h2 className="neutral-1000 my-1">Your Bookings</h2>
        {loading ? (
          <div className="alert alert-info">Loading....</div>
        ) : (
          <div className="row">
            {bookings.length > 0 ? (
              bookings.map((booking: any, index: number) => (
                <div
                  key={booking.id || index}
                  className="col-12 col-md-6 col-lg-4 mb-4"
                >
                  <div className="card-journey-small background-card">
                    <div className="card-info mt-1">
                      <div className="card-title">
                        <div className="heading-6 neutral-1000">
                          {booking?.api_hotels?.name_content}
                        </div>
                      </div>

                      <div className="card-program">
                        <div className="card-location">
                          <p className="text-location text-md-medium neutral-500">
                            Check-in:{" "}
                            {new Date(booking.check_in).toLocaleDateString()}{" "}
                            <br />
                            Check-out:{" "}
                            {new Date(booking.check_out).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="endtime">
                          <div className="card-price">
                            <h6 className="heading-6 neutral-1000">
                              {booking.total_amount}
                            </h6>
                            <p className="text-md-medium neutral-500">
                              Total Stay
                            </p>
                          </div>

                          <div className="card-button">
                            <div
                              className="btn btn-gray"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Section */}
                      <div className="text-md-medium neutral-500 mt-2">
                        <p>
                          <strong>Status:</strong>{" "}
                          <span
                            style={{
                              color:
                                booking.status === "CONFIRMED"
                                  ? "green"
                                  : "gray",
                            }}
                          >
                            {booking.status === "CONFIRMED"
                              ? "Confirmed"
                              : booking.status}
                          </span>
                        </p>
                        <p>
                          <strong>Payment:</strong>{" "}
                          <span
                            style={{
                              color:
                                booking.payment_status === "pending"
                                  ? "orange"
                                  : "green",
                            }}
                          >
                            {booking.payment_status === "pending"
                              ? "Pending Payment"
                              : "Paid"}
                          </span>
                        </p>
                      </div>

                      {/* Cancel Button */}
                      <div className="mt-3">
                        {booking.status === "CONFIRMED" && (
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#ff4d4f",
                              color: "#fff",
                              border: "none",
                              padding: "10px 16px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info">No bookings found.</div>
            )}
          </div>
        )}
      </div>
      {selectedBooking && (
        <DataViewComponent
          data={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

interface DataViewProps {
  data: any;
  onClose: () => void;
}

const DataViewComponent: React.FC<DataViewProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content background-body neutral-1000">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3 className="modal-title">Booking Details</h3>

        <div className="modal-section">
          <h5>Hotel Info</h5>
          <p>
            <strong>Name:</strong> {data.api_hotels?.name_content}
          </p>
          <p>
            <strong>Address:</strong> {data.api_hotels?.address_content},{" "}
            {data.api_hotels?.city_content}
          </p>
          <p>
            {/* <strong>Description:</strong> {data.api_hotels?.description_content} */}
          </p>
        </div>

        <div className="modal-section">
          <h5>Room Info</h5>
          <p>
            <strong>Room Type:</strong> {data.api_hotel_rooms?.room_type}
          </p>
          <p>
            <strong>Max Pax:</strong> {data.api_hotel_rooms?.max_pax}
          </p>
          <p>
            <strong>Max Adults:</strong> {data.api_hotel_rooms?.max_adults}
          </p>
          <p>
            <strong>Max Children:</strong> {data.api_hotel_rooms?.max_children}
          </p>
        </div>

        <div className="modal-section">
          <h5>Booking Info</h5>
          <p>
            <strong>Reference:</strong> {data.reference}
          </p>
          <p>
            <strong>Check-in:</strong>{" "}
            {new Date(data.check_in).toLocaleDateString()}
          </p>
          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(data.check_out).toLocaleDateString()}
          </p>
          <p>
            <strong>Total Amount:</strong> {data.total_amount} {data.currency}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Payment:</strong>{" "}
            {data.payment_status === "pending" ? "Pending" : "Paid"}
          </p>
        </div>

        <div className="modal-section">
          <h5>Holder Info</h5>
          <p>
            <strong>Name:</strong> {data.holder_name} {data.holder_surname}
          </p>
          <p>
            <strong>Email:</strong> {data.holder_email}
          </p>
          <p>
            <strong>Phone:</strong> {data.holder_phone}
          </p>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: #fff;
          padding: 2rem;
          max-width: 600px;
          width: 95%;
          border-radius: 8px;
          overflow-y: auto;
          max-height: 90vh;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .modal-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .modal-section {
          margin-bottom: 1.5rem;
        }

        .modal-section h5 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};
