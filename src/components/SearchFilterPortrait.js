import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 250,
  },
  noLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function SearchFilterPortrait({
  filters,
  handleChange,
  selectedFilters,
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Filter</InputLabel>
        <Select
          id="filterProtrait"
          multiple
          value={selectedFilters}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {filters.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                checked={selectedFilters.indexOf(name) > -1}
                color="primary"
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          {/* {Object.entries(filters).map(([key, value]) => (
            <MenuItem key={key} value={key} id={key}>
              <Checkbox checked={value} color="primary" />
              <ListItemText primary={key} />
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  );
}
