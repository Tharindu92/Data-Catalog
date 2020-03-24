import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Routes from "./Routes";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { SearchBar } from "./components/SearchBar";
// import { Categories } from "./components/Categories";
// import NavBar from "./NavBar";

function App() {
  return (
    // <div>
    //   <NavBar />
    //   <Welcome name="Jay" />
    //   <SearchBar />
    //   <Categories />
    // </div>
    <Router>
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
}

ReactDOM.render(React.createElement(App), document.querySelector("#root"));
