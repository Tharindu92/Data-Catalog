import React from "react";
import "../globalcss.css";
import { Row, Col } from "react-bootstrap";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
} from "victory";

export default function (column_info) {
  const info = column_info.column_info;
  if (column_info.column_info !== undefined) {
    return (
      <div>
        <label>Additional info</label>
        <br />
        <Row>
          <Col>
            <label className="textColor">Description:</label>
            <br />
            <label>{info.description}</label>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label className="textColor">Display Name:</label>
            <br />
            <label>{info.display_name}</label>
          </Col>
          <Col>
            <label className="textColor">Variable Name:</label>
            <br />
            <label>{info.variable_name}</label>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label className="textColor">Data Format:</label>
            <br />
            <label>{info.data_format}</label>
          </Col>
          <Col>
            <label className="textColor">Data Sample:</label>
            <br />
            <label>{info.data_sample}</label>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label className="textColor">Unique Values:</label>
            <br />
            <VictoryPie
              colorScale={[
                "#27145B",
                "264c8c",
                "#42759D",
                "#7AB8BD",
                "#97CDC6",
              ]}
              padAngle={({ datum }) => datum.y}
              innerRadius={100}
              data={info.unique_values}
            />
          </Col>
          <Col>
            <label className="textColor">Most occurence:</label>
            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
              <VictoryBar
                style={{ data: { strokeWidth: 0, fill: "#264c8c" } }}
                data={info.most_occurence}
              />
            </VictoryChart>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label className="textColor">Trend:</label>
            <VictoryChart
            // theme={VictoryTheme.material}
            >
              <VictoryLine
                style={{
                  data: { stroke: "#264c8c" },
                  parent: { border: "2px solid #ccc" },
                }}
                data={info.trend}
              />
            </VictoryChart>
          </Col>
          <Col>{/* <label className="textColor">Chart3:</label> */}</Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label className="textColor">Remarks:</label>
            <br />
            <label>{info.remarks}</label>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <label>Select to view more information.</label>;
  }
}
