import React from "react";
import "../index.css";
import CardDeck from "react-bootstrap/CardDeck";
import DatabaseCard from "./DatabaseCard";
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
      <CardDeck
        style={{
          display: "flex",
          flexDirection: "col",
          justifyContent: "left"
        }}
      >
        {databaseList.map(database => (
          <a onClick={toggleDrawer(true, database)}>
            <DatabaseCard key={database.id} database={database} />
          </a>
        ))}
      </CardDeck>

      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer(false, { tags: [] })}
      >
        {list()}
      </Drawer>
    </div>
  );
}
