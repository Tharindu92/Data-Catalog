import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import DataAttributeInfo from "./DataAttributeInfo";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import cookie from "react-cookies";
import Box from "@material-ui/core/Box";
const col_headers = [
  "Tech Label",
  "Biz Label",
  "Data Type",
  "Definition",
  "Classification",
];
// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Session-Token": cookie.load("session_token"),
    "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
  },
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databAttributes: [],
      chart_data: [],
      selected: undefined,
      target: null,
    };
  }
  getAttribute() {
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/attribute_metadata?filter=Parent_id=" +
      this.props.selected_dataset;

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;

        this.setState({ ...this.state, databAttributes: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getChartData() {
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/chart_data?filter=Parent_id=" +
      this.props.selected_dataset;

    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        var data = response.data.resource;

        this.setState({ ...this.state, chart_data: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getAttribute();
  }

  render() {
    return (
      <div>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
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
                      <tr {...bindTrigger(popupState)} key={id}>
                        <td>{attributes.Attribute_name}</td>
                        <td>{attributes.Business_name}</td>
                        <td>{attributes.Data_type}</td>
                        <td>{attributes.Attribute_definition}</td>
                        <td>{attributes.Attribute_classification}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box width="450px" style={{ maxWidth: "70vw" }}>
                  <DataAttributeInfo column_info={this.state.chart_data} />
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>
        {/* <DataAttributeInfo column_info={this.state.selected} /> */}
      </div>
    );
  }
}
