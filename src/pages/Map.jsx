import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import "./marker.css";

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const Map = ({ user }) => {
  const [location, setLocation] = React.useState({});
  const params = useLocation();
  const locationId = new URLSearchParams(params.search).get("id");

  React.useEffect(() => {
    async function getLocation() {
      const resp = await user.functions.getLocationById(locationId);
      setLocation(resp);
    }
    getLocation();
  }, [locationId, user.functions]);

  console.log(location);

  //   {
  //     "_id": "603463dc77daec17b182abc0",
  //     "name": "test1",
  //     "rating": "5",
  //     "comment": "yayers",
  //     "lat": "45.2",
  //     "long": "-122.1"
  // }

  if (!location.lat || !location.long) {
    return null;
  }

  const defaultProps = {
    center: {
      lat: Number(location.lat),
      lng: Number(location.long),
    },
    zoom: 10,
  };
  console.log("Default Props:", defaultProps);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_MAP_API_KEY,
          libraries: ["places", "geometry", "drawing", "visualization"],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          backgroundColor: "red",
          mapTypeControl: true,
          clickableIcons: true,
          streetViewControl: true,
        }}
      >
        <Marker
          lat={location.lat}
          lng={location.long}
          name={location.name}
          color={"blue"}
        />
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ color, name }) => {
  return (
    <div
      className="marker"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
};
