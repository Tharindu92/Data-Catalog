import React from "react";
import Card from "react-bootstrap/Card";
import Tags from "./Tags";

export default function DatabaseCard({ database }) {
  return (
    <Card
      border="primary"
      className="mt-2"
      style={{ width: "14em", height: "15em" }}
    >
      <Card.Body>
        <Card.Title>{database.name}</Card.Title>
        <Card.Text style={{ fontSize: 11 }}>
          {database.description}. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Tags tags={database.tags} />
        <Card.Link className="float-right" href="#">
          Download
        </Card.Link>
        <br />
        {/* <span className="float-left">Rating: </span> */}
        <p className="float-right" style={{ fontSize: 10 }}>
          Last updated {database.last_updated}
        </p>
      </Card.Body>
    </Card>
  );
}
