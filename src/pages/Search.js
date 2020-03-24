import React from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";

export default class extends React.Component {
  render() {
    return (
      <div id="Search bar">
        <label className="text-primary">Search Results</label>
        <CardDeck>
          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Data Name</Card.Title>
              <Card.Text>
                Some descriptiongs of Data. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nam auctor tellus ut dolor congue,
                in facilisis leo rhoncus. Nunc metus nunc, hendrerit a orci et,
                porttitor aliquet diam. Nunc magna massa, pulvinar id facilisis
                ultricies, ultricies eget purus.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Data Name</Card.Title>
              <Card.Text>
                Some descriptiongs of Data. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nam auctor tellus ut dolor congue,
                in facilisis leo rhoncus. Nunc metus nunc, hendrerit a orci et,
                porttitor aliquet diam. Nunc magna massa, pulvinar id facilisis
                ultricies, ultricies eget purus.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Data Name</Card.Title>
              <Card.Text>
                Some descriptiongs of Data. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nam auctor tellus ut dolor congue,
                in facilisis leo rhoncus. Nunc metus nunc, hendrerit a orci et,
                porttitor aliquet diam. Nunc magna massa, pulvinar id facilisis
                ultricies, ultricies eget purus.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Data Name</Card.Title>
              <Card.Text>
                Some descriptiongs of Data. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nam auctor tellus ut dolor congue,
                in facilisis leo rhoncus. Nunc metus nunc, hendrerit a orci et,
                porttitor aliquet diam. Nunc magna massa, pulvinar id facilisis
                ultricies, ultricies eget purus.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );
  }
}
