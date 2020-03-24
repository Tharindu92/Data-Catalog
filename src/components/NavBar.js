import React from "react";
import "./NavBarCss.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = props => {
  console.log(props);
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">JTC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto justify-content-end" style={{ width: "100%" }}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Publish">Publish</Nav.Link>
          <Nav.Link href="/Contact">My Downloads</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
