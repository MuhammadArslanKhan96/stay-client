
import React from 'react';
import Image from 'next/image';
import { Room } from '@/types/types';


interface RoomCardProps {
    room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    return (
        <div className="card mb-3">
            <Image
                src={room.imageSource}
                alt={room.propertyName}
                width={600}
                height={400}
                className="card-img-top"
            />
            <div className="card-body">
                <h5 className="card-title">{room.propertyName}</h5>
                <p className="card-text">{room.propertyDescription.replace(/<[^>]+>/g, '')}</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Type: {room.type}</li>
                    <li className="list-group-item">Rooms: {room.numberRooms}</li>
                    <li className="list-group-item">Bathrooms: {room.bathRooms}</li>
                    <li className="list-group-item">Guests: {room.numberGuests}</li>
                    <li className="list-group-item">Add: {room.propertyAddress}</li>
                    <li className="list-group-item">Rating: {'★'.repeat(room.rateStars)}</li>
                </ul>
                {
                    room?.price && (<div className="card-body">
                        <h6>Price Details</h6>
                        <p>Price per night: {room?.price?.pricePerNightCalculated} {room?.price?.currencyWished}</p>
                        <p>Total for {room?.price?.numberOfNights} nights: {room?.price?.total} {room?.price?.currencyWished}</p>
                    </div>)
                }
                <button className="btn btn-primary">Book Now</button>
            </div>
        </div>
    );
};

export default RoomCard;