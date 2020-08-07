import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../globalcss.css";
import { Form } from "react-bootstrap";

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

//display the filter tags
export default function SearchFilter({
  filters,
  handleClick,
  selectedFilters,
}) {
  const classes = useStyles();
  const selectedStyle = {
    backgroundColor: "#264c8c",
    color: "#fff",
    transition: "background-color 0.5s, color 0.5s",
    border: "2px solid #46674",
  };
  return (
    <div className={classes.root}>
      {/* Create a checkbox for each filter option input */}
      {filters.map((value) => (
        <Form.Check
          key={value}
          id={value}
          checked={selectedFilters.indexOf(value) > -1}
          label={value}
          onChange={handleClick}
          style={selectedFilters.indexOf(value) > -1 ? selectedStyle : {}}
          className="filterCategories"
        />
      ))}
    </div>
  );
}
