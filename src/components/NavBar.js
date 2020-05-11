import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../globalcss.css";
const Navigation = (props) => {
  const location = useLocation();
  return location.pathname === "/Login" ? null : (
    <Navbar className="bgColor" variant="dark">
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
