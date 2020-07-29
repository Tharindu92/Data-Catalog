import React from "react";
import "../globalcss.css";
import axios from "axios";
import cookie from "react-cookies";
import RatingDisplay from "./RatingDisplay";
import Tags from "./Tags";
import ApiGuide from "./ApiGuide";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
    this.getRating = this.getRating.bind(this);
  }
  getRating() {
    // headers for api call
    const apiHeader = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": cookie.load("session_token"),
        "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
      },
    };
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/collection_rating?filter=parent_id=" +
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
    var source = "";
    if (this.props.database.Source) {
      source = this.props.database.Source.map((tag, id) =>
        id ? "," + tag : "" + tag
      );
    }

    return (
      <div>
        <h3 className="textColor">Name:</h3>
        <label>{this.props.database.Collection_name}</label>
        <h3 className="textColor">Description:</h3>
        <p>{this.props.database.Collection_description}</p>
        <h3 className="textColor">Tags:</h3>
        <Tags tags={this.props.database.Tags} />
        <br />
        <RatingDisplay
          rating={this.state.rating}
          database_id={this.props.database._id}
          getRating={this.getRating}
        />
        <br />
        <h3 className="textColor">Connection Info</h3>

        <label>
          Data Classification: {this.props.database.Collection_classification}
        </label>
        <br />
        <label>
          Data Sensitivity: {this.props.database.Collection_sensitivity}
        </label>
        <br />
        <label>
          Formats Available: {this.props.database.Formats_availability}
        </label>
        <br />
        <label>Source: {source}</label>

        <br />
        <label>Last Updated: {this.props.database.Last_updated_date}</label>
        <ApiGuide datasetName={this.props.database.Collection_name} />
        <br />
      </div>
    );
  }
}
