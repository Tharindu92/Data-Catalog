import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../globalcss.css";
import { Form } from "react-bootstrap";

const sortOptions = {
  1: "Name Ascending",
  2: "Name Decending",
  3: "Date Ascending",
  4: "Date Decending",
};

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

export default function SearchSort({ onChange, sortBy }) {
  const classes = useStyles();
  const selectedStyle = {
    backgroundColor: "#264c8c",
    color: "#fff",
    transition: "background-color 0.5s, color 0.5s",
    border: "2px solid #46674",
  };
  return (
    <div className={classes.root}>
      {/* Create a checkbox for each sort option input */}
      {Object.entries(sortOptions).map(([key, value]) => (
        <Form.Check
          key={key}
          id={key}
          checked={sortBy - key === 0}
          value={key}
          label={value}
          onChange={onChange}
          style={sortBy - key === 0 ? selectedStyle : {}}
          className="sortCategories"
        />
      ))}
    </div>
  );
}
