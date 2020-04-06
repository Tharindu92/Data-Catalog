import React from "react";
import SearchDisplay from "../components/SearchDisplay";
import SearchBar from "../components/SearchBar";
import { Row, Col, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import SortTags from "../components/SortTags";
import FilterTags from "../components/FilterTags";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
const sort_options = [
  "Date Published",
  "Rating",
  "Name Ascending",
  "Name Descending",
];
const filter_options = {
  transaction: false,
  building: false,
  System: false,
  Land: false,
  2019: false,
  JMAP: false,
};
// const filter_options = [
//   { option: "Transaction", click: false },
//   { option: "Building", click: false },
//   { option: "System", click: false },
//   { option: "Land", click: false },
//   { option: "2019", click: false },
//   { option: "JMAP", click: false },
//   // "Transaction",
//   // "Building",
//   // "System",
//   // "Land",
//   // "2019",
//   // "JMAP",
// ];

// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Api-Key":
      "ff36aa23e74ec3839f246d4b06e08e1243b2dda56935885c3dd3c2e8b5731e39",
  },
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseList: [],
      loading: true,
      error: false,
      filter: {},
    };

    this.sortByNameAsc = this.sortByNameAsc.bind(this);
    this.sortByNameDesc = this.sortByNameDesc.bind(this);
    this.sortByDateAsc = this.sortByDateAsc.bind(this);
    this.sortByDateDesc = this.sortByDateDesc.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    // let filters = filter_options;
    // this.setState({
    //   ...this.state, databaseList: {
    //   let
    // }})
  }

  reducer(state, { field, value, type }) {
    return {
      ...state,
      [field]: value,
    };
  }

  sortByNameAsc() {
    const sorted = this.state.databaseList.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    this.setState({ ...this.state, databaseList: sorted });
  }

  sortByNameDesc() {
    const sorted = this.state.databaseList.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.setState({ ...this.state, databaseList: sorted });
  }

  sortByDateAsc() {
    const sorted = this.state.databaseList.sort(
      (a, b) => new Date(a.last_updated) - new Date(b.last_updated)
    );
    this.setState({ ...this.state, databaseList: sorted });
  }

  sortByDateDesc() {
    const sorted = this.state.databaseList.sort(
      (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
    );
    this.setState({ ...this.state, databaseList: sorted });
  }
  handleFilterChange(e) {
    let { id, checked } = e.target;
    console.info(this.state);
    this.setState({
      ...this.state,
      filter: this.reducer(this.state.filter, {
        field: id,
        value: checked,
        type: "filter",
      }),
    });
  }

  //When page loads, call api to get an array of database dict that matches the entered keyword
  //sample input, [{'name':'db1,'description:'sample text',...},{'name':'db2,'description:'sample text',...}]
  componentDidMount() {
    const query = this.props.location.search.replace("?", "");
    var search_string =
      "http://localhost:8080/api/v2/datacatalog/_table/databases";
    if (query) {
      search_string += "?filter=name%20like%20" + query;
    }
    console.log(search_string);

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;
        this.setState({ databaseList: data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });

    //Set all filters being passed over into the state
    this.setState({ ...this.state, filter: filter_options });
  }

  render() {
    // const query = this.props.location.search;

    if (this.state.loading) {
      // Loading
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
    if (this.state.databaseList.length < 1) {
      // if no matching results returned.
      return (
        <div>
          <Row
            className="align-items-center mb-3 mt-3 "
            style={{ height: "90%vh" }}
          >
            <Col className="ml-2">
              <SearchBar />
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                style={{
                  borderColor: "#264c8c",
                  color: "#264c8c",
                  borderRadius: 5,
                }}
              >
                Filter
              </Button>
              <Button
                variant="outline-primary"
                className="ml-4"
                style={{
                  borderColor: "#264c8c",
                  color: "#264c8c",
                  borderRadius: 5,
                }}
              >
                Sort
              </Button>
            </Col>
          </Row>

          <div style={{ backgroundColor: "#f2f2f2" }}>
            <div className="ml-2 mr-2 mt-2">
              <p
                className="textColor"
                style={{ display: "flex", justifyContent: "center" }}
              >
                No Results Found
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {/* Top bar when screen size <= 760 width */}
        <Hidden mdUp>
          <Row className="align-items-center mb-3 mt-3 ">
            <Col className="ml-2">
              <SearchBar />
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                style={{
                  borderColor: "#264c8c",
                  color: "#264c8c",
                  borderRadius: 5,
                }}
              >
                Filter
              </Button>
              <Button
                variant="outline-primary"
                className="ml-4"
                style={{
                  borderColor: "#264c8c",
                  color: "#264c8c",
                  borderRadius: 5,
                }}
              >
                Sort
              </Button>
            </Col>
          </Row>
        </Hidden>

        <Row
          style={
            this.state.databaseList.length < 8
              ? {
                  backgroundColor: "#f2f2f2",
                  height: "90vh",
                }
              : {
                  backgroundColor: "#f2f2f2",
                  height: "90%vh",
                }
          }
        >
          {/* Side bar when screen size > 760 width */}
          <Hidden smDown>
            <Col md={3} style={{ backgroundColor: "#fff" }}>
              <div className="mt-3 ml-1">
                <SearchBar />

                <h4 className="textColor ml-2 mt-4">Sort By:</h4>
                <Chip
                  label="Name Ascending"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #264C8C",
                    color: "#264C8C",
                    fontSize: 9,
                    width: "45%",
                  }}
                  onClick={this.sortByNameAsc}
                  size="small"
                />

                <Chip
                  label="Name Descending"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #264C8C",
                    color: "#264C8C",
                    fontSize: 9,
                    width: "45%",
                  }}
                  onClick={this.sortByNameDesc}
                  size="small"
                />

                <Chip
                  label="Date Ascending"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #264C8C",
                    color: "#264C8C",
                    fontSize: 9,
                    width: "45%",
                  }}
                  onClick={this.sortByDateAsc}
                  size="small"
                />

                <Chip
                  label="Date Descending"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #264C8C",
                    color: "#264C8C",
                    fontSize: 9,
                    width: "45%",
                  }}
                  onClick={this.sortByDateDesc}
                  size="small"
                />

                <h4 className="textColor ml-2 mt-4">Filter By:</h4>
                <FilterTags
                  tags={this.state.filter}
                  handleClick={this.handleFilterChange}
                />
                <button value="asd" id="test" onClick={this.handleFilterChange}>
                  test
                </button>
              </div>
            </Col>
          </Hidden>

          {/* Search Result List */}
          <Col className="ml-2 mr-2 mt-2">
            <label className="textColor ">
              {this.state.databaseList.length} Results
            </label>
            <SearchDisplay databaseList={this.state.databaseList} />
          </Col>
        </Row>
      </div>
    );
  }
}
