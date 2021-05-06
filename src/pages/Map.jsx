import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";

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
        <Marker lat={location.lat} lng={location.long} name={location.name} />
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ name }) => {
  return (
    <div className="marker" title={name}>
      <MapPin />
    </div>
  );
};

function MapPin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21.333}
      height={37.218}
      viewBox="0 0 20 34.892"
      {...props}
    >
      <g transform="matrix(1.18559 0 0 1.18559 -965.773 -331.784)">
        <path
          d="M817.112 282.971c-1.258 1.343-2.046 3.299-2.015 5.139.064 3.845 1.797 5.3 4.568 10.592.999 2.328 2.04 4.792 3.031 8.873.138.602.272 1.16.335 1.21.062.048.196-.513.334-1.115.99-4.081 2.033-6.543 3.031-8.871 2.771-5.292 4.504-6.748 4.568-10.592.031-1.84-.759-3.798-2.017-5.14-1.437-1.535-3.605-2.67-5.916-2.717-2.312-.048-4.481 1.087-5.919 2.621z"
          fill="#ff4646"
          stroke="#d73534"
        />
        <circle r={3.035} cy={288.253} cx={823.031} fill="#590000" />
      </g>
    </svg>
  );
}
