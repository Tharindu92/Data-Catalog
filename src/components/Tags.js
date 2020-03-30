import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import "../globalcss.css";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

export default function Tags({ tags }) {
  const classes = useStyles();
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <div className={classes.root}>
      {tags.map(tag => (
        <Chip
          label={tag}
          style={{ backgroundColor: "#264C8C", color: "white", fontSize: 10 }}
          onClick={handleClick}
          size="small"
        />
      ))}
    </div>
  );
}
