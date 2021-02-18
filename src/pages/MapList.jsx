import React from 'react';
import { useForm } from "react-hook-form";
import _ from "lodash";
import { DataTable } from '../components/DataTable';
import useAxios from 'axios-hooks';

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
    const [{ data = { data: [] }, loading, error }, executePost] = useAxios(
        {
            url: '/locationData',
            method: 'post',
            baseURL: 'http://localhost:3001',
            headers: { 'Access-Control-Allow-Origin': '*' },
        },
        { manual: true }
    );
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
        executePost({
            data: values
        });
    }
    console.log(errors);
    let ratingValue = _.get(errors, "rating.ref.value");
    console.log(`${ratingValue} is not a valid rating`);

    return (
        <div className='location-form' >
            <form onSubmit={handleSubmit(onSubmit)} style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '24px'
            }}>
                <div>
                    <input type='text' placeholder='Location Name' name='name' ref={register} />
                </div>
                <div>
                    <input type='number' placeholder='Rating' name='rating' ref={register({
                        max: 5
                    })} />
                </div>
                <div>
                    <input type='text' placeholder='Comments' name='comment' ref={register} />
                </div>
                <div>
                    <input type='number' step='any' placeholder='Latitude' name='lat' ref={register} />
                </div>
                <div>
                    <input type='number' step='any' placeholder='Longitude' name='long' ref={register} />
                </div>
                <br />
                <div>
                    <input type='submit' value='Add Location' />
                </div>
            </form>
        </div>
    )
}