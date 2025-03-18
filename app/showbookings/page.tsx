'use client'

import { useEffect, useState } from "react"

export default function ShowBookings() {
    const [bookings, setBookings] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        (async function(){
            try{
                setLoading(true);
                const store:any = localStorage.getItem('dynamic_store');
                const storeJson = JSON.parse(store);
                const email = storeJson?.state?.user?.email;
                if(!email){
                  alert("You are not logged in.");
                  return;
                }
                const response = await fetch(`/api/booking?id=${email}`);
                const json = await response.json();
                console.log("Set bookings...");
                console.log(json.bookings);
                setBookings(json.bookings);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }

        })();

    }, []);
	
	return (
		<>
            <div className="container mt-4">
                <h2>Your Bookings</h2>
                {
                    loading ? <div className="alert alert-info">Loading....</div>: (<>

                        {bookings.length > 0 ? (
                            bookings.map((booking:any, index:number) => (
                                <BookingCard key={index} {...booking} />
                            ))
                            ) : (
                                <div className="alert alert-info">No bookings found.</div>
                            )}
                    </>)
                }
            </div>
            
		</>
	)
}

// components/BookingCard.tsx
import React from 'react';

interface Booking {
  hotelId: string;
  roomId: string;
  startTime: string;
}



const BookingCard: React.FC<Booking> = ({ hotelId, roomId, startTime }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Booking Details</h5>
        <p className="card-text">
          <strong>Hotel ID:</strong> {hotelId}
        </p>
        <p className="card-text">
          <strong>Room ID:</strong> {roomId}
        </p>
        <p className="card-text">
          <strong>Start Time:</strong> {new Date(startTime).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
