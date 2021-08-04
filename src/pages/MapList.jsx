import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import "./MapList.css";
import { Ratings } from "../components/Ratings";
import { DisplayModal } from "../components/DisplayModal";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Autocomplete from "@material-ui/lab/Autocomplete";

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const SORT = {
  NAME: {
    value: "NAME",
    label: "Name",
    key: "name",
    order: "asc",
    handler: (l) => l.name.toLowerCase(),
  },
  RATING: {
    value: "RATING",
    label: "Rating",
    key: "rating",
    order: "desc",
    handler: "rating",
  },
};

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

  const [sort, setSort] = React.useState(SORT.NAME);

  const getData = React.useCallback(
    async (searchTerm = "") => {
      try {
        const result = await user.functions.getLocations(searchTerm);
        dispatchLocations({
          type: "LOCATIONS_FETCH_SUCCESS",
          payload: result,
        });
      } catch {
        dispatchLocations({ type: "LOCATIONS_FETCH_FAILURE" });
      }
    },
    [user.functions]
  );

  React.useEffect(() => {
    if (locations.isPopulated) return;
    dispatchLocations({ type: "LOCATIONS_FETCH_INIT" });
    getData();
  }, [locations.isPopulated, user.functions, getData]);

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

  async function searchLocations(data) {
    getData(data.search);
  }

  const ModalAction = ({ onClick }) => {
    return (
      <button type="button" onClick={onClick} className="primary">
        Add Location
      </button>
    );
  };

  const sortedLocations = _.orderBy(locations.data, [sort.handler], sort.order);

  return (
    <div>
      <button onClick={refreshList}>Refresh List</button>
      <DisplayModal>
        <ModalAction />
        <MapForm addLocation={addLocation} />
      </DisplayModal>
      <SearchBox searchHandler={searchLocations} />
      <SortBox setSort={setSort} />
      {locations.isError && <p>Oops... Something went wrong.</p>}
      {locations.isLoading ? (
        <LinearProgress />
      ) : (
        <LocationTable data={sortedLocations} onDelete={deleteLocation} />
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
        <DisplayModal height="200px" width="300px">
          <DeleteForeverIcon />
          <DeleteConfirmation deleteHandler={deleteHandler} />
        </DisplayModal>
      </div>
    </div>
  );
};

const DeleteConfirmation = ({ deleteHandler, handleClose }) => (
  <>
    <div>Are you sure?</div>
    <button onClick={deleteHandler}>Yes</button>
    <button onClick={handleClose}>Cancel</button>
  </>
);

const SearchBox = ({ searchHandler }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(searchHandler)}>
      <InputElement
        type="text"
        placeholder="Search"
        name="search"
        register={register}
      />

      <button>Search</button>
    </form>
  );
};

const SortBox = ({ setSort }) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={[SORT.NAME, SORT.RATING]}
      getOptionLabel={(option) => option.label}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Sort By" variant="outlined" />
      )}
      onChange={(event, value) => setSort(value)}
    />
  );
};
