import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import "./MapList.css";
import { Ratings } from "../components/Ratings";
import { DisplayModal } from "../components/DisplayModal";
import LinearProgress from "@material-ui/core/LinearProgress";

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const MapList = ({ user }) => {
  const [locations, setLocations] = React.useState();
  const [counter, setCounter] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const isPopulated = Array.isArray(locations);

  React.useEffect(() => {
    if (isPopulated) return;
    setIsLoading(true);
    async function getLocations() {
      const resp = await user.functions.getAllLocations();
      setLocations(resp);
      setCounter(counter + 1);
      setIsLoading(false);
    }
    getLocations();
  }, [isPopulated, counter, user.functions]);

  const refreshList = () => {
    setLocations(undefined);
    setCounter(counter + 1);
  };

  const ModalAction = ({ onClick }) => {
    return (
      <button type="button" onClick={onClick} className="primary">
        Add Location
      </button>
    );
  };

  return (
    <div>
      <button onClick={refreshList}>Refresh List</button>
      <DisplayModal>
        <ModalAction />
        <MapForm user={user} refreshList={refreshList} />
      </DisplayModal>
      {isLoading ? <LinearProgress /> : <LocationTable data={locations} />}
    </div>
  );
};

const MapForm = ({ user, refreshList, handleClose }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (values) => {
    await user.functions.addLocation(values);
    refreshList();
    handleClose();
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
  const rows = data.map(LocationTableRow);
  return <div className="location-table">{rows}</div>;
};

const LocationTableRow = (row, index) => {
  let history = useHistory();
  const openMap = () => {
    history.push(`/map?id=${row._id}`);
  };
  return (
    <div
      className="location-table-row light-gray"
      key={`row-${index}`}
      onClick={openMap}
    >
      <div className="location-table-image">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?markers=${row.lat},${row.long}&size=128x128&zoom=10&key=${GOOGLE_MAP_API_KEY}`}
          alt="Map Thumbnail"
        />
      </div>
      <div className="location-table-name">{row.name}</div>
      <div className="location-table-rating">
        <Ratings rating={row.rating} />
      </div>
      <div className="location-table-description">{row.comment}</div>
      <div className="location-control-panel">Delete</div>
    </div>
  );
};
