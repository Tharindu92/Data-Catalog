import React from "react";
import SearchDisplay from "../components/SearchDisplay";
import SearchBar from "../components/SearchBar";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// var databaseList = [
// {
//   name: "Database 1",
//   description:
//     "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam auctor tellus ut dolor congue"
// },
//   {
//     name: "Database 2",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   },
//   {
//     name: "Database 3",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   },
//   {
//     name: "Database 4",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   },
//   {
//     name: "Database 5",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   },
//   {
//     name: "Database 6",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   },
//   {
//     name: "Database 7",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   },
//   {
//     name: "Database 8",
//     description:
//       "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consecteturadipiscing elit.Nam auctor tellus ut dolor congue"
//   }
// ];

const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Api-Key":
      "ff36aa23e74ec3839f246d4b06e08e1243b2dda56935885c3dd3c2e8b5731e39"
  }
};
export default class extends React.Component {
  state = {
    databaseList: [
      {
        name: "Database 1",
        description:
          "Some descriptiongs of Data. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam auctor tellus ut dolor congue"
      }
    ],
    loading: true,
    error: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/api/v2/datacatalog/_table/databases", options)
      .then(response => {
        var data = response.data.resource;
        this.setState({ databaseList: data, loading: false });
        // console.log(response.data.resource);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error);
      });
  }
  render() {
    const query = this.props.location.search;
    if (this.state.loading) {
      return (
        <div>
          <p> Loading... </p>
        </div>
      );
    }
    if (this.state.error) {
      // if request failed or data is empty don't try to access it either
      return (
        <div>
          <p> An error occured </p>
        </div>
      );
    }
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
          <SearchDisplay databaseList={this.state.databaseList} />
        </div>
      </div>
    );
  }
}
