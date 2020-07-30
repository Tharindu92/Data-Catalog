import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import cookie from "react-cookies";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databasePreview: [], //10 samplerows from dataset
      header: [],
      filter: "",
    };
  }

  componentDidMount() {
    // headers for api call
    var apiHeader = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": cookie.load("session_token"),
        "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
      },
    };
    //API url
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/PRD_LDS/_table/" +
      this.props.selected_dataset +
      "?limit=10";

    //Axios API call
    axios
      .get(search_string, apiHeader)
      .then((response) => {
        var data = response.data.resource;

        this.setState({ header: Object.keys(data[0]), databasePreview: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <label>Previewing first 10 rows.</label>

        <Table bordered hover size="sm">
          {/* Data table headers */}
          <thead>
            <tr className="bgColor" style={{ fontSize: 12 }}>
              {Object.entries(this.state.header).map(([key, name], id) => (
                <th key={id}>{name}</th>
              ))}
            </tr>
          </thead>

          {/* Data table rows */}
          <tbody className="textColor" style={{ fontSize: 12 }}>
            {this.state.databasePreview
              .filter(
                (item) =>
                  JSON.stringify(item)
                    .toLocaleLowerCase()
                    .indexOf(this.state.filter) > -1
              )
              .map((row, id) => (
                <tr key={id}>
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key}>{value.toString()}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
