
'use client'; // Mark as Client Component

import FilterForm from '@/components/gateway/FilterForm';
import RoomCard from '@/components/gateway/room-card';
import { Room } from '@/types/types';
import { useState } from 'react';

const RoomsPage = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFilterSubmit = async (filters: any) => {
        console.log(filters)
        setIsLoading(true);
        try {

            const queryParams = new URLSearchParams(filters as Record<string, string>).toString();
            const res = await fetch(`/api/gateway-casas/hotels?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setRooms(data);
            setIsFilterApplied(true);
        } catch (error) {
            console.error('Error fetching filtered rooms:', error);
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className='background-body'>
            <FilterForm onSubmit={handleFilterSubmit} isLoading={isLoading} />
            {
                isFilterApplied && (<div className="container mt-5">
                    <h2>Filtered Hotels</h2>
                    {
                        rooms.length > 0 ? <>
                                {rooms.map((room) => (
                                    <RoomCard key={room.id} room={room} />
                                ))}
                        </> : <p>No Matched found!</p>
                    }
                </div>)
            }
            
        </div>
    );
};

export default RoomsPage;