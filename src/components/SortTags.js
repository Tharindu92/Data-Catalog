import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import "../globalcss.css";

//style for the tag chips
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
//Tags display for databases, takes in array of tags and display each tag as pill shape(chips)
// sample input, ['tag 1', 'tag 2',...]
export default function SortTags({ tags }) {
  const classes = useStyles();
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <div className={classes.root}>
      {tags.map(tag => (
        <Chip
          label={tag}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #264C8C",
            color: "#264C8C",
            fontSize: 9,
            width: "45%"
          }}
          onClick={handleClick}
          size="small"
        />
      ))}
    </div>
  );
}
