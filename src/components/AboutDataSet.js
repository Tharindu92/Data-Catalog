import React from "react";
import "../globalcss.css";
import axios from "axios";
import cookie from "react-cookies";
import RatingDisplay from "./RatingDisplay";
import Tags from "./Tags";
import { apiHeader } from "../connectionInfo";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databasePreview: {
        headers: [],
      },
      rating: 0,
    };
    this.getRating = this.getRating.bind(this);
  }
  getRating() {
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/database_rating?filter=_id%20like%20" +
      this.props.database._id;

    //Axios API call
    axios
      .get(search_string, apiHeader)
      .then((response) => {
        var average_rating =
          response.data.resource.rating / response.data.resource.count;
        this.setState({ ...this.state, rating: average_rating });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getRating();
  }

  render() {
    return (
      <div>
        <h3 className="textColor">Name:</h3>
        <label>{this.props.database.Collection_Tech_Label}</label>
        <h3 className="textColor">Description:</h3>
        <p>{this.props.database.Collection_Definition}</p>
        <h3 className="textColor">Tags:</h3>
        <Tags tags={this.props.database.Tags} />
        <br />

        <br />

        <RatingDisplay
          rating={this.state.rating}
          database_id={this.props.database._id}
          getRating={this.getRating}
        />
        <br />

        <br />
        <h3 className="textColor">Connection Info</h3>
        <label>Creation Date: {this.props.database.Creation_Date}</label>
        <br />
        <label>File Size: {this.props.database.File_Size}</label>
        <br />
        <label>
          Formats Available: {this.props.database.Formats_Available}
        </label>
        <br />
        <label>Last Updated: {this.props.database.Last_Updated_Date}</label>
      </div>
    );
  }
}
