import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import history from "../history";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globalcss.css";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const dataTables = [
  { name: "Overall Transaction Data 2019" },
  { name: "Housing Data 2019" },
  { name: "JMAP Customer" },
  { name: "JMAP Product" },
  { name: "JMAP Transaction" },
];

export default function SearchBar() {
  const [state, setState] = React.useState({ value: "" });

  //update value shown in search bar input
  const handleChange = (e) => {
    setState({ value: e.target.value });
  };

  //Navigate to search page
  const handleClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/Search",
      search: state.value,
    });
    window.location.reload();
  };
  return (
    <Paper
      component="form"
      style={{
        padding: "2px 4px",
        display: "flex",
        alignitems: "center",
        borderRadius: 50,
        border: "1px solid #264c8c",
      }}
    >
      <Autocomplete
        id="size-small-standard"
        size="small"
        style={{ flex: 1 }}
        className="ml-4"
        options={dataTables}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Search internal data"
            style={{ border: "none" }}
            onChange={handleChange}
          />
        )}
      />
      {/* <InputBase
        placeholder="Search internal data"
        inputProps={{
          "aria-label": "Search internal data",
        }}
        className="ml-4"
        style={{ flex: 1 }}
        onChange={handleChange}
      /> */}
      <IconButton
        type="submit"
        aria-label="search"
        style={{ padding: 10 }}
        onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
