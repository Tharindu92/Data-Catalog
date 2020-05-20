import React from "react";
import Card from "react-bootstrap/Card";
import Tags from "./Tags";
import "../globalcss.css";

// Card component for search results, takes in a database dict and display as a card
// input example, {name:'db name',description:'sample text',}
export default class extends React.Component {
  render() {
    return (
      <Card
        className="mb-1 mt-2 borderColor"
        style={{ width: "14em", height: "15em" }}
      >
        <Card.Body onClick={this.props.function}>
          {/* Data table Name/title */}
          <Card.Title className="textColor">
            {this.props.database.name}
          </Card.Title>

          {/* Description */}
          <Card.Text style={{ fontSize: 11 }}>
            {this.props.database.description}. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Card.Text>
        </Card.Body>

        {/* Tags and download */}
        <Card.Body>
          <Tags tags={this.props.database.tags} />
          {/* <Card.Link className="float-right textColor mt-1" href="#">
            <GetAppIcon />
            Download
          </Card.Link> */}
          <br />
        </Card.Body>

        {/* Rating and last updated */}
        <Card.Footer
          onClick={this.props.function}
          style={{
            backgroundColor: "#fff",
            border: 0,
          }}
        >
          <span className="float-left textColor" style={{ fontSize: 10 }}>
            Rating:
          </span>
          <span className="float-right textColor" style={{ fontSize: 10 }}>
            Last updated {this.props.database.last_updated}
          </span>
        </Card.Footer>
      </Card>
    );
  }
}
