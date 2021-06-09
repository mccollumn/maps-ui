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
      <LocationTable data={locations} />
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

  return (
    <div className="location-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputElement
          type="text"
          placeholder="Location Name"
          name="name"
          register={register({ required: "Please enter a name" })}
          errors={errors}
        />

        <InputElement
          type="number"
          placeholder="Rating"
          name="rating"
          register={register({
            max: { value: 5, message: "Rating must be between 1 and 5" },
          })}
          errors={errors}
        />

        <textarea placeholder="Comments" ref={register} name="comment" />

        <InputElement
          type="number"
          step="any"
          placeholder="Latitude"
          name="lat"
          register={register({ required: "Please enter a latitude" })}
          errors={errors}
        />

        <InputElement
          type="number"
          step="any"
          placeholder="Longitude"
          name="long"
          register={register({ required: "Please enter a longitude" })}
          errors={errors}
        />

        <button className="primary locationButton">Add Location</button>
      </form>
    </div>
  );
};

const InputElement = ({ register, errors = {}, ...props }) => {
  const errorMsg = _.get(errors[props.name], "message");
  return (
    <div className="input-element">
      <input ref={register} {...props} />
      <div className="error-msg">{errorMsg}</div>
    </div>
  );
};

const LocationTable = ({ data = [] }) => {
  return data.map(LocationTableRow);
};

const LocationTableRow = (row, index) => {
  return (
    <div className="location-table-row" key={`row-${index}`}>
      <div className="location-table-image">Image</div>
      <div className="location-table-name">{row.name}</div>
      <div className="location-table-rating">{row.rating}</div>
      <div className="location-table-description">{row.comment}</div>
      <div className="location-table-coordinates">
        {row.lat}, {row.long}
      </div>
    </div>
  );
};
