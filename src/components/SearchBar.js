import React from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import history from "../history";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globalcss.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";

export default function SearchBar({ dataSets, handleSearchChange }) {
  const location = useLocation();
  const [state, setState] = React.useState({ value: "" });
  //update value shown in search bar input
  const handleChange = (e) => {
    setState({ value: e.target.value });
    handleSearchChange(e.target.value);
  };

  //Navigate to search page
  const handleClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/Search",
      search: state.value,
    });

    if (location.pathname === "/Search") {
      window.location.reload();
    }
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
        className="ml-4 mb-2"
        options={dataSets}
        getOptionLabel={(option) => option.Collection_Biz_Label}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Search data"
            style={{ border: "none" }}
            onChange={handleChange}
          />
        )}
      />

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
