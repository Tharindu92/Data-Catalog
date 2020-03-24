import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function DatabaseCard({ database }) {
  return (
    <Card border="primary" style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{database.name}</Card.Title>
        <Card.Text>
          Some descriptiongs of Data. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam auctor tellus ut dolor congue, in facilisis leo
          rhoncus. Nunc metus nunc, hendrerit a orci et, porttitor aliquet diam.
          Nunc magna massa, pulvinar id facilisis ultricies, ultricies eget
          purus.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
