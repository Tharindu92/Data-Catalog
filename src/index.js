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

function App() {
  //authenicate user with token
  function authenticate(session_token) {
    // headers for api call
    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": session_token,
        "X-DreamFactory-Api-Key":
          "ff36aa23e74ec3839f246d4b06e08e1243b2dda56935885c3dd3c2e8b5731e39",
      },
    };
    axios
      .get("http://localhost:8080/api/v2/datacatalog/_schema", options)
      .then(() => {
        console.log("Authentication passed");
      })
      //if error
      .catch((error) => {
        // this.setState({ error: true });
        console.log("Authentication failed");
        // history.push({ pathname: "/Login" });
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
