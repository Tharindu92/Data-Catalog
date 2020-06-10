import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import DatabaseColumnInfo from "./DatabaseColumnInfo";
import cookie from "react-cookies";
const col_headers = ["Name", "Data Type", "% Missing", "Description"];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databasePreview: {
        headers: [],
      },
      selected: undefined,
    };
  }
  componentDidMount() {
    // headers for api call
    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": cookie.load("session_token"),
        "X-DreamFactory-Api-Key": cookie.load("api_key"),
      },
    };
    var search_string =
      "http://127.0.0.1/api/v2/datacatalog/_table/database_preview?filter=_id%20%3D%20" +
      this.props.selected_id;

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;
        this.setState({ ...this.state, databasePreview: data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Table bordered hover size="sm">
          {/* Header */}
          <thead>
            <tr className="bgColor" style={{ fontSize: 12 }}>
              {col_headers.map((header, id) => (
                <th key={id}>{header}</th>
              ))}
            </tr>
          </thead>
          {/* Content */}
          <tbody className="textColor" style={{ fontSize: 12 }}>
            {Object.entries(this.state.databasePreview.headers).map(
              ([key, info], id) => (
                <tr
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      selected: info,
                    })
                  }
                  key={id}
                >
                  <td>{info.display_name}</td>
                  <td>{info.data_type}</td>
                  <td
                    style={{
                      color: info.percent_missing > 0.2 ? "#80000D" : "#264c8c",
                    }}
                  >
                    {info.percent_missing * 100 + "%"}
                  </td>
                  <td>{info.description}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        <DatabaseColumnInfo column_info={this.state.selected} />
      </div>
    );
  }
}
