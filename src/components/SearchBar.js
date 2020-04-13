import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import history from "../history";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globalcss.css";

export default class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = { value: "" };
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/Search",
      search: this.state.value,
    });
  };

  render() {
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
          placeholder="Search JTC's internal data"
          inputProps={{
            "aria-label": "Search JTC's internal data",
          }}
          className="ml-4"
          style={{ flex: 1 }}
          onChange={this.handleChange}
        />
        <IconButton
          type="submit"
          aria-label="search"
          style={{ padding: 10 }}
          onClick={this.handleClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}
