import React from "react";
import "../globalcss.css";
import axios from "axios";
import cookie from "react-cookies";
import RatingDisplay from "./RatingDisplay";
import Tags from "./Tags";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databasePreview: {
        headers: [],
      },
      rating: 0,
    };
  }
  componentDidMount() {
    // headers for api call
    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": cookie.load("session_token"),
        "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
      },
    };
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/database_rating?filter=_id%20like%20" +
      this.props.database._id;

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var average_rating =
          response.data.resource.rating / response.data.resource.count;
        this.setState({ ...this.state, rating: average_rating });
      })
      .catch((error) => {
        console.log(error);
      });
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
        />
        <br />

        <br />
        <h3 className="textColor">Connection Info</h3>
        <label>Data Source: {this.props.database.Last_Updated_Date}</label>
        <br />
        <label>Database Name: {this.props.database.Last_Updated_Date}</label>
        <br />
        <label>Last Updated: {this.props.database.Last_Updated_Date}</label>
        <br />
        <label>Last Updated By: {this.props.database.Last_Updated_Date}</label>
      </div>
    );
  }
}
