import React from "react";
import SearchBar from "../components/SearchBar";

export default class extends React.Component {
  constructor() {
    super();
    this.state = { value: "" };
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div id="Search bar">
        <label className="text-primary">Search for database</label>
        <SearchBar />
      </div>
    );
  }
}
