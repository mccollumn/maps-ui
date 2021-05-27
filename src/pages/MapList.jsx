import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { DataTable } from "../components/DataTable";
import useAxios from "axios-hooks";
import { useHistory } from "react-router-dom";
import "./MapList.css";

export const MapList = ({ user }) => {
  let history = useHistory();
  // const [{ data = { data: [] }, loading, error }] = useAxios({
  //   url: "/locationData",
  //   method: "get",
  //   baseURL: "http://localhost:3001",
  //   headers: { "Access-Control-Allow-Origin": "*" },
  // });

  const [locations, setLocations] = React.useState();
  const [counter, setCounter] = React.useState(0);
  const isPopulated = Array.isArray(locations);

  React.useEffect(() => {
    if (isPopulated) return;
    async function getLocations() {
      const resp = await user.functions.getAllLocations();
      console.log("getLocations Call");
      setLocations(resp);
      setCounter(counter + 1);
    }
    getLocations();
  }, [isPopulated, counter, user.functions]);
  console.log("Locations:", locations, counter);

  const refreshList = () => {
    setLocations(undefined);
    setCounter(counter + 1);
  };

  const custom = {
    lat: { name: "Latitude" },
    long: { name: "Longitude" },
    rowClick: (row) => {
      history.push(`/map?id=${row._id}`);
    },
  };

  return (
    <div>
      <button onClick={refreshList}>Refresh List</button>
      <MapForm />
      <DataTable data={locations} custom={custom} />
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
