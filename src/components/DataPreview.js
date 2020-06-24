import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import cookie from "react-cookies";
import TextField from "@material-ui/core/TextField";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databasePreview: [], //10 samplerows from dataset
      header: [],
      filter: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      filter: value,
    });
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
    //API url
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/" +
      this.props.selected_dataset;
    console.log(search_string);

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;

        this.setState({ header: Object.keys(data[0]), databasePreview: data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <TextField
          variant="standard"
          label="Filter"
          value={this.state.filter}
          onChange={this.handleChange}
        />

        {/* Number of rows and columns of data table */}
        <h5>
          {/* {this.state.databasePreview.num_cols} Columns x{" "}
          {this.state.databasePreview.num_rows} Rows */}
        </h5>

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
