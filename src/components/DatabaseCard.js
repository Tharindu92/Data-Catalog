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
        style={
          window.innerWidth < 450
            ? { width: "100%", height: "15em" }
            : { width: "13.1em", height: "15em" }
        }
      >
        <Card.Body onClick={this.props.function}>
          {/* Data table Name/title */}
          <Card.Title className="textColor">
            {this.props.database.Collection_Biz_Label}
          </Card.Title>

          {/* Description */}
          <Card.Text style={{ fontSize: 11 }}>
            {this.props.database.Collection_Definition.length > 80
              ? this.props.database.Collection_Definition.slice(0, 80) + "..."
              : this.props.database.Collection_Definition}
          </Card.Text>
        </Card.Body>

        {/* Tags and download */}
        <Card.Body>
          <Tags tags={this.props.database.Tags} />
          <div className="float-right textColor mt-1">
            <ExportCsvButton
              dataUrl="http://127.0.0.1:82/api/v2/datacatalog/_table/data_classified"
              fileName={this.props.database.Collection_Biz_Label}
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
            Last updated {this.props.database.Last_Updated_Date.split(" ")[0]}
          </span>
        </Card.Footer>
      </Card>
    );
  }
}
