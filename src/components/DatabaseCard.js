import React from "react";
import Card from "react-bootstrap/Card";
import Tags from "./Tags";
import "../globalcss.css";

export default function DatabaseCard({ database }) {
  return (
    <Card
      // border="primary"
      className="mb-1 mt-2 borderColor"
      style={{ width: "14em", height: "15em" }}
    >
      <Card.Body>
        <Card.Title className="textColor">{database.name}</Card.Title>
        <Card.Text style={{ fontSize: 11 }}>
          {database.description}. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Tags tags={database.tags} />
        <Card.Link className="float-right textColor mt-1" href="#">
          Download
        </Card.Link>
        <br />
        {/* <span className="float-left">Rating: </span> */}
      </Card.Body>
      <Card.Footer
        style={{
          backgroundColor: "#fff",
          border: 0
        }}
      >
        <span className="float-right textColor" style={{ fontSize: 10 }}>
          Last updated {database.last_updated}
        </span>
      </Card.Footer>
    </Card>
  );
}
