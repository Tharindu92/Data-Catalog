import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

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
        <Chip label={tag} color="primary" onClick={handleClick} size="small" />
      ))}
    </div>
  );
}
