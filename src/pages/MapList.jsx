import React from 'react';

export const MapList = () => {
    const locations = [
        { 
            name: "My place", 
            rating: 5,
            comment: "",
            coords: { lat: 45.426884908241355, long: -122.52172814602221 } 
        },
        { 
            name: "Their place", 
            rating: 1,
            comment: "",
            coords: { lat: 45.426598778936274, long: -122.49909030311268 } 
        }
    ]
    return (
        <div>
            <MapForm />
            <OutputList locations={locations}/>
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

const OutputList = ({locations}) => {
    const Locations = locations.map((location, index) => {
        return (
            <div key={index}>
                <div>{location.name}</div>
                <div>{location.rating}</div>
                <div>{location.comment}</div>
                <div>{location.coords.lat}</div>
                <div>{location.coords.long}</div>
            </div>
        );
    });

    return (
        <div>
            {Locations}
        </div>
    );
}