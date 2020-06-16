import React from "react";
import SearchBar from "../components/SearchBar";
import { Row, Col } from "react-bootstrap";
import ApartmentIcon from "@material-ui/icons/Apartment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StorageIcon from "@material-ui/icons/Storage";
import LandscapeIcon from "@material-ui/icons/Landscape";
import history from "../history";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      session: "",
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, value: e.target.value });
  };

  render() {
    return (
      <div className="align-items-center">
        {/* Search bar  */}

        <row
          className="align-items-center mt-4 pt-4  "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col id="Search bar" xs={8}>
            <h2
              className="textColor mb-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              JTC Data Catalog
            </h2>
            <SearchBar session_token={this.state.session} />
          </Col>
        </row>

        {/* Topics  */}
        <h3
          className="mt-4 textColor"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Topics
        </h3>
        <row className="pt-4 mt-4">
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="categories mr-2 mobile-only"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5,
              }}
              onClick={() =>
                history.push({
                  pathname: "/Search",
                  search: "Transaction",
                })
              }
            >
              <ReceiptIcon />
              <br />
              Transaction
            </button>
            <button
              className="categories mr-2"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5,
              }}
              onClick={() =>
                history.push({
                  pathname: "/Search",
                  search: "Building",
                })
              }
            >
              <ApartmentIcon />
              <br />
              Building
            </button>
            <button
              className="categories mr-2"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5,
              }}
              onClick={() =>
                history.push({
                  pathname: "/Search",
                  search: "System",
                })
              }
            >
              <StorageIcon />
              <br />
              System
            </button>
            <button
              className="categories"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5,
              }}
              onClick={() =>
                history.push({
                  pathname: "/Search",
                  search: "Land",
                })
              }
            >
              <LandscapeIcon />
              <br />
              Land
            </button>
          </Col>
        </row>
      </div>
    );
  }
}
