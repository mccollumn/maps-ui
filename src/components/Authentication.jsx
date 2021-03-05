import * as Realm from "realm-web";

const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
const app = new Realm.App({ id: REALM_APP_ID });

export const Authentication = ({ children }) => {
  return children;
};
