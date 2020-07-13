import cookie from "react-cookies";

// headers for api call
export const apiHeader = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Session-Token": cookie.load("session_token"),
    "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
  },
};
