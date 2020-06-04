import React from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import cookie from "react-cookies";

// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Session-Token": cookie.load("session_token"),
    "X-DreamFactory-Api-Key":
      "cd080889bfe864cba1145ce111825d8ca7e176d3bf8c0f44d658cd5bf6ad0fc2",
  },
};
export const ExportCsvButton = ({ dataUrl, fileName }) => {
  const [data, setData] = React.useState([
    ["name", "dat"],
    ["fdf", "ddd"],
  ]);

  return (
    <CSVLink
      style={{ color: "#264c8c", textDecoration: "none" }}
      data={data}
      onClick={() => {
        var download = false;
        axios
          .get(dataUrl, options)
          .then((response) => {
            setData(response.data.resource);
            download = true;
          })
          //if error
          .catch((error) => {
            download = false;
          });
        return download;
      }}
    >
      Download me
    </CSVLink>
  );
};
