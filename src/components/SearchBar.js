import React from "react";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
export class SearchBar extends React.Component {
  render() {
    return (
      <div id="Search bar">
        <label className="text-primary">Search for database</label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter Keyword"
            aria-label="Enter Keyword"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary">Button</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}
