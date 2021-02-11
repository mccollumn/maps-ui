import React from 'react';
import { DataTable } from '../components/DataTable';

export const MapList = () => {
    const locations = [
        {
            name: "My place",
            rating: 5,
            comment: "",
            lat: 45.426884908241355,
            long: -122.52172814602221
        },
        {
            name: "Their place",
            rating: 1,
            comment: "",
            lat: 45.426598778936274,
            long: -122.49909030311268
        }
    ]

    const custom = {
        lat: { name: "Latitude" },
        long: { name: "Longitude" },
        rowClick: (row) => {
            const url = `https://www.google.com/maps/search/?api=1&query=${row.lat},${row.long}`;
            window.open(url);
        }
    };

    return (
        <div>
            <MapForm />
            <DataTable data={locations} custom={custom} />
        </div>
    );
}

const MapForm = () => {
    return (
        <div>
            I'm a form.
        </div>
    )
}