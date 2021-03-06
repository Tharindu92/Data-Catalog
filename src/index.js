import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Routes from "./Routes";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import history from "./history";
import axios from "axios";
// import { apiHeader } from "./connectionInfo";
function App() {
  //authenicate user with token
  function authenticate(sessionToken) {
    // headers for api call
    var apiHeader = {
      headers: {
        "Content-Type": "application/json",
        "X-DreamFactory-Session-Token": sessionToken,
        "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
      },
    };
    axios
      .get(
        process.env.REACT_APP_DIRECT_API + "/api/v2/datacatalog/_schema",
        apiHeader
      )
      .then((response) => {
        console.log(response);
        console.log("Authentication passed");
      })
      //if error
      .catch((error) => {
        history.push({
          pathname: "/Login",
        });
      });

    //Check if user email is logged in cookie
    if (!cookie.load("session_email")) {
      axios
        .get(
          process.env.REACT_APP_DIRECT_API + "/api/v2/user/session",
          apiHeader
        )
        .then((response) => {
          cookie.save("session_email", response.data.email, {
            path: "/",
            expires,
          });
        });
    }
  }
  const expires = new Date();
  expires.setDate(Date.now() + 60 * 30);
  var session_token = cookie.load("session_token"); //get session token from cookie

  if (window.location.href.indexOf("?session=") > 0) {
    //if  url has token
    //save token
    session_token = window.location.href.split("?session=")[1];
    cookie.save("session_token", session_token, {
      path: "/",
      expires,
    });

    authenticate(session_token);
  } else if (session_token) {
    //if token exist
    authenticate(session_token);
  } else {
    //else return user to login page
    history.push({ pathname: "/Login" });
  }

  return (
    <Router>
      <div className="App" id="page-container">
        <div id="content-wrap">
          <NavBar />
          <Routes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
