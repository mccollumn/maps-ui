import React from "react";
import useAxios from 'axios-hooks';

export const Users = () => {
  const [{ data = {data: []}, loading, error }, refetch] = useAxios(
    'https://reqres.in/api/users?delay=1'
  )

  console.log("Axios: ", data, loading, error);

  const UserList = data.data.map(User);

  return (
    <div>
      {UserList}
    </div>
  );
};

const User = (
  {avatar,
  email,
  first_name,
  last_name,
  id
}
) => {
  return (
    <div key = {id}>
      <img src={avatar}/>
      <div>{first_name}</div>
      <div>{last_name}</div>
      <div>{email}</div>
    </div>
  )
}