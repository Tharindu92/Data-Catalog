import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import "../globalcss.css";

//style for the tag chips
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
//Tags display for databases, takes in array of tags and display each tag as pill shape(chips)
// sample input, ['tag 1', 'tag 2',...]
export default function Tags({ tags }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tags.map((tag, id) => (
        <Chip
          key={id}
          label={tag}
          style={{ backgroundColor: "#264C8C", color: "white", fontSize: 10 }}
          size="small"
        />
      ))}
    </div>
  );
}
