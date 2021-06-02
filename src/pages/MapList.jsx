import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { DataTable } from "../components/DataTable";
import { useHistory } from "react-router-dom";
import "./MapList.css";

export const MapList = ({ user }) => {
  let history = useHistory();
  const [locations, setLocations] = React.useState();
  const [counter, setCounter] = React.useState(0);
  const isPopulated = Array.isArray(locations);

  React.useEffect(() => {
    if (isPopulated) return;
    async function getLocations() {
      const resp = await user.functions.getAllLocations();
      setLocations(resp);
      setCounter(counter + 1);
    }
    getLocations();
  }, [isPopulated, counter, user.functions]);

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
      <MapForm user={user} refreshList={refreshList} />
      <DataTable data={locations} custom={custom} />
    </div>
  );
};

const MapForm = ({ user, refreshList }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (values) => {
    await user.functions.addLocation(values);
    refreshList();
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
