import React from "react";
import { useLocation } from "react-router-dom";

export const Map = ({ user }) => {
  const [location, setLocation] = React.useState({});
  const params = useLocation();
  const locationId = new URLSearchParams(params.search).get("id");

  React.useEffect(() => {
    async function getLocation() {
      const location = await user.functions.getLocationById(locationId);
      setLocation(location);
    }
    getLocation();
  }, [locationId, user.functions]);

  console.log(location);

  return <div>I'm a Map:{locationId}</div>;
};
