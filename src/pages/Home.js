import React from "react";
import SearchBar from "../components/SearchBar";
import { Row, Col } from "react-bootstrap";

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
      <div className="align-items-center">
        <Row
          className="align-items-center mt-4 pt-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Col id="Search bar" xs={8}>
            <h3
              className="textColor mb-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              JTC Data Catalog
            </h3>
            <SearchBar />
          </Col>
        </Row>
        <Row className="pt-4 mt-4">
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <button
              className="categories mr-2"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5
              }}
            >
              Transaction
            </button>
            <button
              className="categories mr-2"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5
              }}
            >
              Building
            </button>
            <button
              className="categories mr-2"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5
              }}
            >
              System
            </button>
            <button
              className="categories"
              style={{
                borderColor: "#264c8c",
                color: "#264c8c",
                borderRadius: 5
              }}
            >
              Land
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}
