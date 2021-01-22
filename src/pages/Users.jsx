import React from "react";
import useAxios from 'axios-hooks';

export const Users = () => {
  const [{ data = { data: [] }, loading, error }, refetch] = useAxios(
    'https://reqres.in/api/users?delay=1'
  )

  console.log("Axios: ", data, loading, error);

  const UserList = data.data.map(User);

  return (
    <div
      className="users"
      style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <div
        className="list"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          background: "aqua"
        }}>
        {UserList}
      </div>
    </div>
  );
};

/* background: aqua;
display: flex;
flex-direction: column;
align-items: flex-start; */

const User = ({
  avatar,
  email,
  first_name,
  last_name,
  id
}) => {
  return (
    <div
      key={id}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

      <img src={avatar} />
      <div style={{ margin: "10px" }}>
        <div>{first_name}</div>
        <div>{last_name}</div>
        <div>{email}</div>
      </div>
    </div>
  )
}