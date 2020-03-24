import React from "react";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
import DatabaseCard from "./DatabaseCard";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import DrawerContent from "./DrawerContent";

export default function SearchDisplay({ databaseList }) {
  const [state, setState] = React.useState({
    right: false
  });
  const [selectedDatabase, setDatabase] = React.useState({
    name: "test",
    description: "test description"
  });

  const toggleDrawer = (open, database) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDatabase(database);
    setState({ right: open });
  };

  const list = () => (
    <div style={{ width: 500 }}>
      <DrawerContent database={selectedDatabase} />
    </div>
  );
  return (
    <div>
      <CardColumns>
        {databaseList.map(database => (
          <a onClick={toggleDrawer(true, database)}>
            <DatabaseCard database={database} />
          </a>
        ))}
      </CardColumns>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer(false, {})}
      >
        {list()}
      </Drawer>
    </div>
  );
}
