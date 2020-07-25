import React from "react";
import SearchDisplay from "../components/SearchDisplay";
import SearchBar from "../components/SearchBar";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import SearchSort from "../components/SearchSort";
import SearchFilter from "../components/SearchFilter";
import SearchSortPortrait from "../components/SearchSortPortrait";
import SearchFilterPortrait from "../components/SearchFilterPortrait";
import cookie from "react-cookies";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseList: [{ Collection_Biz_Label: "" }], //database list related to keyword
      searchResult: [], //filtered version based on selected filters/sorts
      loading: true,
      error: false,
      all_filters: ["All"], //All unique tags from search results
      filter_selection: ["All"], //Selected filter list
      sortBy: "",
      searchValue: "",
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSearchChange(value) {
    this.setState({ ...this.state, searchValue: value.toLowerCase() });
  }

  //Sorting
  handleSort(e) {
    let value = e.target.value;
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

  sortByNameAsc() {
    const sorted = this.state.searchResult.sort((a, b) =>
      a.Collection_business_name.localeCompare(b.Collection_business_name)
    );
    this.setState({ ...this.state, searchResult: sorted, sortBy: 1 });
  }

  sortByNameDesc() {
    const sorted = this.state.searchResult.sort((a, b) =>
      b.Collection_business_name.localeCompare(a.Collection_business_name)
    );
    this.setState({ ...this.state, searchResult: sorted, sortBy: 2 });
  }

  // sortByDateAsc() {
  //   const sorted = this.state.searchResult.sort(
  //     (a, b) => new Date(a.last_updated) - new Date(b.last_updated)
  //   );
  //   this.setState({ ...this.state, searchResult: sorted, sortBy: 3 });
  // }

  // sortByDateDesc() {
  //   const sorted = this.state.searchResult.sort(
  //     (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
  //   );
  //   this.setState({ ...this.state, searchResult: sorted, sortBy: 4 });
  // }

  //Filtering
  handleFilterChange(e) {
    //Update state on each filter change

    let { id, checked, value } = e.target;
    //Check if its portrait mode
    if (value !== "on") {
      //Portrait mode filtering
      if (
        !this.state.filter_selection.includes("All") &&
        value.includes("All")
      ) {
        this.setState({
          ...this.state,
          filter_selection: ["All"],
          searchResult: this.state.databaseList,
        });
        value = ["All"];
      } else {
        if (value.includes("All")) {
          value = value.filter((x) => x !== "All");
        }

        const filtered = this.state.databaseList.filter(
          (database) =>
            database.Tags.filter((item) => value.includes(item)).length > 0
        );

        this.setState({
          ...this.state,
          filter_selection: value,
          searchResult: filtered,
          sortBy: "",
        });
      }
    } else {
      //Landscape mode filtering
      if (id === "All") {
        this.setState({
          ...this.state,
          filter_selection: ["All"],
          searchResult: this.state.databaseList,
          sortBy: "",
        });
      } else {
        if (checked) {
          const filtered = this.state.databaseList.filter(
            (database) =>
              database.Tags.filter(
                (value) =>
                  this.state.filter_selection.includes(value) || value === id
              ).length > 0
          );
          var selected = this.state.filter_selection.filter((x) => x !== "All");

          this.setState({
            ...this.state,
            filter_selection: selected.concat([id]),
            searchResult: filtered,
            sortBy: "",
          });
        } else {
          if (
            this.state.filter_selection.length < 2 &&
            this.state.filter_selection.includes(id)
          ) {
            this.setState({
              ...this.state,
              filter_selection: ["All"],
              searchResult: this.state.databaseList,
              sortBy: "",
            });
          } else {
            const filtered = this.state.databaseList.filter(
              (database) =>
                database.Tags.filter(
                  (value) =>
                    this.state.filter_selection.includes(value) && value !== id
                ).length > 0
            );
            const remainder = this.state.filter_selection.filter(
              (item) => item !== id
            );

            this.setState({
              ...this.state,
              filter_selection: remainder,
              searchResult: filtered,
              sortBy: "",
            });
          }
        }
      }
    }
  }
  //Get data from API
  //sample result, [{'name':'db1,'description:'sample text',...},{'name':'db2,'description:'sample text',...}]
  getSearchResult() {
    // headers for api call
    var apiHeader = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": cookie.load("session_token"),
        "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
      },
    };
    var query = "";
    if (this.props.location.search.indexOf("session") < 0) {
      query = this.props.location.search.replace("?", "");
    }

    var unique_tags = ["All"];
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/collection_metadata/";
    if (query) {
      search_string +=
        "?filter=(Collection_Biz_Label%20like%20" +
        query +
        ")%20or%20(Collection_Definition%20like%20" +
        query +
        ")%20or%20(Tags%20like%20" +
        query +
        ")";
    }

    //Axios API call
    axios
      .get(search_string, apiHeader)
      .then((response) => {
        var data = response.data.resource;
        //Get Unique Tags
        data.map((row) =>
          row.Tags.map((tag) =>
            unique_tags.includes(tag) ? "" : unique_tags.push(tag)
          )
        );
        this.setState({
          databaseList: data,
          searchResult: data,
          loading: false,
          all_filters: unique_tags,
        });
      })
      //if error
      .catch((error) => {
        // this.setState({ error: true });
        console.log(error);
      });
  }

  //update components when screen size changes, from landscape to portrait or vice versa
  resize = () => this.forceUpdate();

  //When page loads, call api to get an array of database dict that matches the entered keyword
  componentDidMount() {
    this.getSearchResult();
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  render() {
    if (this.state.loading) {
      // Loading
      return (
        <div>
          <p> Loading... </p>
        </div>
      );
    } else if (this.state.error) {
      // if request failed
      return (
        <div>
          <p> An error occured </p>
        </div>
      );
    } else if (this.state.databaseList.length < 1) {
      // if no matching results returned.
      return (
        <div>
          {/* Screen size <= 760 width */}
          <Hidden mdUp>
            <Row className="align-items-center mb-3 mt-3 ">
              <Col md={5} className="ml-2">
                <SearchBar dataSets={this.state.databaseList} />
              </Col>
              <Col>
                <SearchSortPortrait
                  sortBy={this.state.sortBy}
                  onChange={this.handleSort}
                />
              </Col>
              <Col>
                <SearchFilterPortrait
                  filters={this.state.all_filters}
                  handleChange={this.handleFilterChange}
                  selectedFilters={this.state.filter_selection}
                />
              </Col>
            </Row>

            <div
              style={{
                backgroundColor: "#f2f2f2",
                minHeight: "90vh",
                maxHeight: "90%vh",
              }}
            >
              <div className="ml-2 mr-2 mt-2">
                <p
                  className="textColor"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  No Results Found
                </p>
              </div>
            </div>
          </Hidden>

          {/* Screen size > 760 width */}
          <Hidden smDown>
            <Row
              style={{
                backgroundColor: "#f2f2f2",
                minHeight: "90vh",
                maxHeight: "90%vh",
              }}
            >
              <Col md={3} style={{ backgroundColor: "#fff" }}>
                <div className="mt-3 ml-1">
                  <SearchBar dataSets={this.state.databaseList} />

                  <h4 className="textColor ml-2 mt-4">Sort By:</h4>
                  <SearchSort
                    sortBy={this.state.sortBy}
                    onChange={this.handleSort}
                  />

                  <h4 className="textColor ml-2 mt-4">Filter By:</h4>
                  <SearchFilter
                    filters={this.state.all_filters}
                    handleClick={this.handleFilterChange}
                    selectedFilters={this.state.filter_selection}
                  />
                </div>
              </Col>
              <Col className="ml-2 mr-2 mt-2">
                <label className="textColor ">No Results Found</label>
              </Col>
            </Row>
          </Hidden>
        </div>
      );
    }
    return (
      //When there are results found
      <div>
        {/* Top bar when screen size <= 760 width */}
        <div className="container-fluid">
          <Hidden mdUp>
            <div
              className="align-items-center  mb-3 mt-3 row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div className="ml-2 " style={{ width: "50%", minWidth: 280 }}>
                <SearchBar
                  dataSets={this.state.databaseList}
                  handleSearchChange={this.handleSearchChange}
                />
              </div>
              <div className="">
                <SearchSortPortrait
                  sortBy={this.state.sortBy}
                  onChange={this.handleSort}
                />
              </div>
              <div className="">
                <SearchFilterPortrait
                  filters={this.state.all_filters}
                  handleChange={this.handleFilterChange}
                  selectedFilters={this.state.filter_selection}
                />
              </div>
            </div>
          </Hidden>

          <div
            className="row"
            style={{
              backgroundColor: "#f2f2f2",
              minHeight: "90vh",
              maxHeight: "90%vh",
            }}
          >
            {/* Side bar when screen size > 760 width */}
            <Hidden smDown>
              <div className="col-3" style={{ backgroundColor: "#fff" }}>
                <div className="mt-3 ml-1">
                  <SearchBar
                    dataSets={this.state.databaseList}
                    handleSearchChange={this.handleSearchChange}
                  />

                  <h4 className="textColor ml-2 mt-4">Sort By:</h4>
                  <SearchSort
                    sortBy={this.state.sortBy}
                    onChange={this.handleSort}
                  />

                  <h4 className="textColor ml-2 mt-4">Filter By:</h4>
                  <SearchFilter
                    filters={this.state.all_filters}
                    handleClick={this.handleFilterChange}
                    selectedFilters={this.state.filter_selection}
                  />
                </div>
              </div>
            </Hidden>

            {/* Search Result List */}
            <div className="ml-2 mr-2 mt-2 col">
              <label className="textColor ">
                {this.state.databaseList.length} Results
              </label>
              <SearchDisplay
                databaseList={this.state.searchResult.filter(
                  (item) =>
                    JSON.stringify(item)
                      .toLocaleLowerCase()
                      .indexOf(this.state.searchValue) > -1
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
