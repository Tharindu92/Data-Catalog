import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Routes from "./Routes";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import history from "./history";
import axios from "axios";

const api_key =
  "cd080889bfe864cba1145ce111825d8ca7e176d3bf8c0f44d658cd5bf6ad0fc2";

function App() {
  //authenicate user with token
  function authenticate(session_token) {
    // headers for api call
    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": session_token,
        "X-DreamFactory-Api-Key": api_key,
      },
    };
    axios
      .get("http://127.0.0.1:82/api/v2/datacatalog/_schema", options)
      .then(() => {
        console.log("Authentication passed");
      })
      //if error
      .catch((error) => {
        history.push({ pathname: "/Login" });
      });
  }
  const expires = new Date();
  expires.setDate(Date.now() + 60 * 30);
  var session_token = cookie.load("session_token"); //get session token from cookie

  if (window.location.href.indexOf("?session=") > 0) {
    //if  url as token
    //save token
    session_token = window.location.href.split("?session=")[1];
    cookie.save("session_token", session_token, {
      path: "/",
      expires,
    });
    cookie.save("api_key", api_key, {
      path: "/",
      expires,
    });
    authenticate(session_token);
    console.log(session_token);
  } else if (session_token) {
    //if token exist
    authenticate(session_token);
  } else {
    //else return user to login page
    history.push({ pathname: "/Login" });
  }
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
}

ReactDOM.render(React.createElement(App), document.querySelector("#root"));
