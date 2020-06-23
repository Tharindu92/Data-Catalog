import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import DataAttributeInfo from "./DataAttributeInfo";
import cookie from "react-cookies";
const col_headers = [
  "Tech Label",
  "Biz Label",
  "Data Type",
  "Definition",
  "Classification",
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databAttributes: [],
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
      "http://127.0.0.1:82/api/v2/datacatalog/_table/attribute_metadata?filter=Parent_id=" +
      this.props.selected_dataset;

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;
        console.log(data);
        this.setState({ ...this.state, databAttributes: data });
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
            {Object.entries(this.state.databAttributes).map(
              ([key, attributes], id) => (
                <tr
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      selected: attributes,
                    })
                  }
                  key={id}
                >
                  <td>{attributes.Attribute_tech_label}</td>
                  <td>{attributes.Attribute_biz_label}</td>
                  <td>{attributes.Data_type}</td>
                  <td>{attributes.Attribute_definition}</td>
                  <td>{attributes.Attribute_classification}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        {/* <DataAttributeInfo column_info={this.state.selected} /> */}
      </div>
    );
  }
}
