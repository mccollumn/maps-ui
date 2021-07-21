import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import "./MapList.css";
import { Ratings } from "../components/Ratings";
import { DisplayModal } from "../components/DisplayModal";
import LinearProgress from "@material-ui/core/LinearProgress";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const locationsReducer = (state, action) => {
  switch (action.type) {
    case "LOCATIONS_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isPopulated: false,
        isError: false,
      };
    case "LOCATIONS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isPopulated: true,
        isError: false,
        data: action.payload,
      };
    case "LOCATIONS_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isPopulated: false,
        isError: true,
      };
    case "REFRESH_LOCATIONS":
      return {
        ...state,
        isPopulated: false,
      };
    default:
      throw new Error();
  }
};

export const MapList = ({ user }) => {
  const [locations, dispatchLocations] = React.useReducer(locationsReducer, {
    data: [],
    isLoading: false,
    isPopulated: false,
    isError: false,
  });

  React.useEffect(() => {
    if (locations.isPopulated) return;
    dispatchLocations({ type: "LOCATIONS_FETCH_INIT" });

    (async () => {
      try {
        const result = await user.functions.getAllLocations();
        dispatchLocations({
          type: "LOCATIONS_FETCH_SUCCESS",
          payload: result,
        });
      } catch {
        dispatchLocations({ type: "LOCATIONS_FETCH_FAILURE" });
      }
    })();
  }, [locations.isPopulated, user.functions]);

  const refreshList = () => {
    dispatchLocations({ type: "REFRESH_LOCATIONS" });
  };

  async function addLocation(values) {
    dispatchLocations({ type: "LOCATIONS_FETCH_INIT" });
    await user.functions.addLocation(values);
    refreshList();
  }

  async function deleteLocation(id) {
    dispatchLocations({ type: "LOCATIONS_FETCH_INIT" });
    await user.functions.deleteLocation(id);
    refreshList();
  }

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
        <MapForm addLocation={addLocation} />
      </DisplayModal>
      {locations.isError && <p>Oops... Something went wrong.</p>}
      {locations.isLoading ? (
        <LinearProgress />
      ) : (
        <LocationTable data={locations.data} onDelete={deleteLocation} />
      )}
    </div>
  );
};

const MapForm = ({ addLocation, handleClose }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (values) => {
    await addLocation(values);
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

const LocationTable = ({ data = [], onDelete }) => {
  const rows = data.map((row, index) => LocationTableRow(row, index, onDelete));
  return <div className="location-table">{rows}</div>;
};

const LocationTableRow = (row, index, onDelete) => {
  let history = useHistory();
  const openMap = () => {
    history.push(`/map?id=${row._id}`);
  };

  const deleteHandler = (event) => {
    event.stopPropagation();
    onDelete(row._id);
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
      <div className="location-control-panel">
        <DeleteForeverIcon onClick={deleteHandler} />
      </div>
    </div>
  );
};
