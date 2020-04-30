import React from "react";
import button from "react-bootstrap/Button";
export class Categories extends React.Component {
  render() {
    return (
      <div id="Categories">
        <button className="categories">System</button>
        <button className="categories">Building</button>
        <button className="categories">Transaction</button>
        <button className="categories">Land</button>
      </div>
    );
  }
}
