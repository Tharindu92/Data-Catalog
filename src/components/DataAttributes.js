import React from "react";
import "../globalcss.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import DataAttributeInfo from "./DataAttributeInfo";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { apiHeader } from "../connectionInfo";

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
      chart_data: [],
      selected: undefined,
      target: null,
      filter: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value.toLowerCase();
    this.setState({
      ...this.state,
      filter: value,
    });
  }
  getAttribute() {
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/attribute_metadata?filter=Parent_id=" +
      this.props.selected_dataset;

    //Axios API call
    axios
      .get(search_string, apiHeader)
      .then((response) => {
        var data = response.data.resource;

        this.setState({ ...this.state, databAttributes: data });
        console.log(data);
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
      .get(search_string, apiHeader)
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
              <TextField
                variant="standard"
                label="Filter"
                value={this.state.filter}
                onChange={this.handleChange}
              />
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
                  {Object.entries(this.state.databAttributes)
                    .filter(
                      (item) =>
                        JSON.stringify(item)
                          .toLocaleLowerCase()
                          .indexOf(this.state.filter) > -1
                    )
                    .map(([key, attributes], id) => (
                      <tr {...bindTrigger(popupState)} key={id}>
                        <td>{attributes.Attribute_name}</td>
                        <td>{attributes.Business_name}</td>
                        <td>{attributes.Data_type}</td>
                        <td>{attributes.Attribute_definition}</td>
                        <td>{attributes.Attribute_classification}</td>
                      </tr>
                    ))}
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
