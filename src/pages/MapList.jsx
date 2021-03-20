import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { DataTable } from "../components/DataTable";
import useAxios from "axios-hooks";
import "./MapList.css";

export const MapList = () => {
  const [{ data = { data: [] }, loading, error }] = useAxios({
    url: "/locationData",
    method: "get",
    baseURL: "http://localhost:3001",
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  console.log(data);

  const custom = {
    lat: { name: "Latitude" },
    long: { name: "Longitude" },
    rowClick: (row) => {
      const url = `https://www.google.com/maps/search/?api=1&query=${row.lat},${row.long}`;
      window.open(url);
    },
  };

  return (
    <div>
      <MapForm />
      <DataTable data={data.data} custom={custom} />
    </div>
  );
};

const MapForm = () => {
  const [{ data = { data: [] }, loading, error }, executePost] = useAxios(
    {
      url: "/locationData",
      method: "post",
      baseURL: "http://localhost:3001",
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    { manual: true }
  );
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => {
    console.log(values);
    executePost({
      data: values,
    });
  };
  console.log(errors);
  let ratingValue = _.get(errors, "rating.ref.value");
  console.log(`${ratingValue} is not a valid rating`);

  return (
    <div className="location-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Location Name"
          name="name"
          ref={register}
        />

        <input
          type="number"
          placeholder="Rating"
          name="rating"
          ref={register({
            max: 5,
          })}
        />

        <textarea placeholder="Comments" ref={register} name="comment" />

        <input
          type="number"
          step="any"
          placeholder="Latitude"
          name="lat"
          ref={register}
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude"
          name="long"
          ref={register}
        />

        <button className="primary locationButton">Add Location</button>
      </form>
    </div>
  );
};
