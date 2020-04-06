import React from "react";
import "../index.css";
import CardDeck from "react-bootstrap/CardDeck";
import DatabaseCard from "./DatabaseCard";
import Drawer from "@material-ui/core/Drawer";
import DrawerContent from "./DrawerContent";

//Display search results, takes in array of database dict and out put as individual cards
//sample input, [{'name':'db1,'description:'sample text',...},{'name':'db2,'description:'sample text',...}]
export default function SearchDisplay({ databaseList }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [selectedDatabase, setDatabase] = React.useState({
    name: "test",
    description: "test description",
  });

  // toggle function for the right drawer to slide out when individual database card is clicked.
  const toggleDrawer = (open, database) => (event) => {
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
          justifyContent: "left",
        }}
      >
        {/* for each database dict, input into database card component, and display the information on cards */}
        {databaseList.map((database, id) => (
          <div key={id}>
            <DatabaseCard
              database={database}
              function={toggleDrawer(true, database)}
            />
          </div>
        ))}
      </CardDeck>
      {/* takes in single database dict to display infromation*/}
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
