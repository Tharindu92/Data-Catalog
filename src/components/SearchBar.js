import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import history from "../history";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globalcss.css";

export default function SearchBar({ getSearchResult }) {
  const [state, setState] = React.useState({ value: "" });
  const handleChange = (e) => {
    setState({ value: e.target.value });
  };
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
      <InputBase
        placeholder="Search internal data"
        inputProps={{
          "aria-label": "Search internal data",
        }}
        className="ml-4"
        style={{ flex: 1 }}
        onChange={handleChange}
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
