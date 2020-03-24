import React from "react";
import SearchDisplay from "../components/SearchDisplay";
import SearchBar from "../components/SearchBar";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const databaseList = [
  {
    name: "Database 1",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 2",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 3",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 4",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 5",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 6",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 7",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  },
  {
    name: "Database 8",
    description:
      "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
  }
];

export default class extends React.Component {
  render() {
    return (
      <div>
        <Row className="align-items-center mb-3 mt-3">
          <Col className="ml-2">
            <SearchBar />
          </Col>
          <Col>
            <Button variant="outline-primary">Filter</Button>
            <Button variant="outline-primary" className="ml-4">
              Sort
            </Button>
          </Col>
        </Row>
        <div className="ml-2 mr-2">
          <SearchDisplay databaseList={databaseList} />
        </div>
      </div>
    );
  }
}
