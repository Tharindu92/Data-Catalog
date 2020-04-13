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
import SearchSort from "../components/SearchSort";
const sort_options = [
  "Date Published",
  "Rating",
  "Name Ascending",
  "Name Descending",
];
const filter_options = {
  All: true,
  Transaction: false,
  Building: false,
  System: false,
  Land: false,
  2019: false,
  JMAP: false,
  Customer: false,
};

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
      searchResult: [],
      loading: true,
      error: false,
      filter: {},
      filter_selection: [],
      sortBy: 1,
    };

    this.sortByNameAsc = this.sortByNameAsc.bind(this);
    this.sortByNameDesc = this.sortByNameDesc.bind(this);
    this.sortByDateAsc = this.sortByDateAsc.bind(this);
    this.sortByDateDesc = this.sortByDateDesc.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  //update filter checkbox value
  reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }
  handleSort(e) {
    let value = e.target.value;
    console.log(value);

    if (value < 2) {
      this.sortByNameAsc();
    } else if (value < 3) {
      this.sortByNameDesc();
    } else if (value < 4) {
      this.sortByDateAsc();
    } else {
      this.sortByDateDesc();
    }
  }
  //Sorting
  sortByNameAsc() {
    const sorted = this.state.databaseList.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    this.setState({ ...this.state, databaseList: sorted, sortBy: 1 });
  }

  sortByNameDesc() {
    const sorted = this.state.databaseList.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.setState({ ...this.state, databaseList: sorted, sortBy: 2 });
  }

  sortByDateAsc() {
    const sorted = this.state.databaseList.sort(
      (a, b) => new Date(a.last_updated) - new Date(b.last_updated)
    );
    this.setState({ ...this.state, databaseList: sorted, sortBy: 3 });
  }

  sortByDateDesc() {
    const sorted = this.state.databaseList.sort(
      (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
    );
    this.setState({ ...this.state, databaseList: sorted, sortBy: 4 });
  }

  //Filtering
  handleFilterChange(e) {
    //Update state on each filter chips
    let { id, checked } = e.target;
    if (id === "All") {
      this.setState({
        ...this.state.filter,
        filter: filter_options,
        filter_selection: [],
        searchResult: this.state.databaseList,
      });
    } else {
      if (checked) {
        const filtered = this.state.databaseList.filter(
          (database) =>
            database.tags.filter(
              (value) =>
                this.state.filter_selection.includes(value) || value === id
            ).length > 0
        );
        console.log(filtered);
        this.setState({
          ...this.state.filter,
          filter: { ...this.state.filter, [id]: true, All: false },
          filter_selection: this.state.filter_selection.concat([id]),
          searchResult: filtered,
        });
      } else {
        if (
          this.state.filter_selection.length < 2 &&
          this.state.filter_selection.includes(id)
        ) {
          this.setState({
            ...this.state.filter,
            filter: filter_options,
            filter_selection: [],
            searchResult: this.state.databaseList,
          });
        } else {
          const filtered = this.state.databaseList.filter(
            (database) =>
              database.tags.filter(
                (value) =>
                  this.state.filter_selection.includes(value) && value !== id
              ).length > 0
          );
          const remainder = this.state.filter_selection.filter(
            (item) => item !== id
          );

          this.setState({
            ...this.state.filter,
            filter: { ...this.state.filter, [id]: false },
            filter_selection: remainder,
            searchResult: filtered,
          });
        }
      }
    }
    console.log(this.state.filter_selection);
  }

  getSearchResult() {
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
        this.setState({
          databaseList: data,
          searchResult: data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });

    //Set all filters being passed over into the state
    this.setState({ ...this.state, filter: filter_options });
  }
  //When page loads, call api to get an array of database dict that matches the entered keyword
  //sample input, [{'name':'db1,'description:'sample text',...},{'name':'db2,'description:'sample text',...}]
  componentDidMount() {
    this.getSearchResult();
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
              <SearchBar onClick={this.getSearchResult()} />
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
              <SearchSort age={this.state.sortBy} onChange={this.handleSort} />

              {/* <Button
                variant="outline-primary"
                style={{
                  borderColor: "#264c8c",
                  color: "#264c8c",
                  borderRadius: 5,
                }}
              >
                Filter
              </Button> */}
              {/* <Button
                variant="outline-primary"
                className="ml-4"
                style={{
                  borderColor: "#264c8c",
                  color: "#264c8c",
                  borderRadius: 5,
                }}
              >
                Sort
              </Button> */}
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
              </div>
            </Col>
          </Hidden>

          {/* Search Result List */}
          <Col className="ml-2 mr-2 mt-2">
            <label className="textColor ">
              {this.state.databaseList.length} Results
            </label>
            <SearchDisplay databaseList={this.state.searchResult} />
          </Col>
        </Row>
      </div>
    );
  }
}
