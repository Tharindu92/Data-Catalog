import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import history from "../history";
import "bootstrap/dist/css/bootstrap.min.css";
export default class SearchBar extends React.Component {
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
      <InputGroup>
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
    );
  }
}
