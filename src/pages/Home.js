import React from "react";
import { Redirect } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import history from "../history";

export default class extends React.Component {
  constructor() {
    super();
    this.state = { value: "" };
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  Search() {
    history.push({
      pathname: "/Search",
      search: "?query=" + this.state.value
    });
  }
  render() {
    return (
      <div id="Search bar">
        <label className="text-primary">Search for database</label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter Keyword"
            aria-label="Enter Keyword"
            aria-describedby="basic-addon2"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => this.Search()}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}
