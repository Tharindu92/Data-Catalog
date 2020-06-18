import React from "react";
import Card from "react-bootstrap/Card";
import Tags from "./Tags";
import "../globalcss.css";
import StarIcon from "@material-ui/icons/Star";

import { ExportCsvButton } from "./ExportCsvButton";
// Card component for search results, takes in a database dict and display as a card
// input example, {name:'db name',description:'sample text',}
export default class extends React.Component {
  render() {
    return (
      <Card
        className="mb-1 mt-2 borderColor"
        style={{ width: "13.5em", height: "15em" }}
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
          <div className="float-right textColor mt-1">
            <ExportCsvButton
              dataUrl="http://127.0.0.1:81/api/v2/datacatalog/_table/data_classified"
              fileName={this.props.database.name}
            />
          </div>

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
          <span className="float-right textColor" style={{ fontSize: 10 }}>
            Last updated {this.props.database.last_updated.split(" ")[0]}
          </span>
        </Card.Footer>
      </Card>
    );
  }
}
