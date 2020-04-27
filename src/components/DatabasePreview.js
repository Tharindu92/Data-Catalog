import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
// Card component for search results, takes in a database dict and display as a card
// input example, {name:'db name',description:'sample text',}
const col_headers = ["Name", "Data Type", "% Missing", "Description"];
// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Api-Key":
      "ff36aa23e74ec3839f246d4b06e08e1243b2dda56935885c3dd3c2e8b5731e39",
  },
};
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databasePreview: {
        headers: [],
        preview: [],
        num_rows: 0,
        num_col: 0,
      }, //database info based on id
    };
  }
  componentDidMount() {
    var search_string =
      "http://localhost:8080/api/v2/datacatalog2/_table/database_preview?filter=_id%20%3D%20" +
      this.props.selected_id;

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;

        this.setState({ databasePreview: data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <label>
          {this.state.databasePreview.num_cols} Columns x{" "}
          {this.state.databasePreview.num_rows} Rows
        </label>
        <Table bordered hover size="sm">
          <thead>
            <tr className="bgColor" style={{ fontSize: 12 }}>
              {Object.entries(this.state.databasePreview.headers).map(
                ([key, info], id) => (
                  <th key={id}>{key}</th>
                )
              )}
            </tr>
          </thead>
          <tbody className="textColor" style={{ fontSize: 12 }}>
            {this.state.databasePreview.preview.map((row, id) => (
              <tr key={id}>
                {Object.entries(row).map(([key, value]) => (
                  <td key={key}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
