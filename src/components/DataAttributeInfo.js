import React from "react";
import "../globalcss.css";
import { Row, Col } from "react-bootstrap";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory";

export default function ({ column_info }) {
  if (column_info !== undefined) {
    return (
      <div>
        <label>Additional info</label>
        <br />
        <label>Coming soon</label>
        <br />
        {/* <Row className="mt-2">
          <Col>
            <label className="textColor">Empty Values:</label>
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
              data={[
                { x: 1, y: 1, label: "Empty" },
                { x: 1, y: 9, label: "Non-Empty" },
              ]}
            />
          </Col>
          <Col>
            <label className="textColor">Most occurence:</label>
            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
              <VictoryBar
                style={{ data: { strokeWidth: 0, fill: "#264c8c" } }}
                data={[
                  { x: "Category A", y: 8 },
                  { x: "Category AA", y: 3 },
                  { x: "Category AB", y: 2 },
                ]}
              />
            </VictoryChart>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label className="textColor">Unique Values:</label>
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
              data={[
                { x: 1, y: 2, label: "Non-Unique" },
                { x: 2, y: 8, label: "Unique" },
              ]}
            />
          </Col>
          
        </Row> */}
      </div>
    );
  }
}
