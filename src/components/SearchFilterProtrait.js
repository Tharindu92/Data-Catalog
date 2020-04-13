import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

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

export default function SearchFilterProtrait({
  filters,
  handleChange,
  filterarr,
}) {
  const classes = useStyles();

  var selected_filters = [];
  Object.entries(filters).map(([key, value]) =>
    value === true ? selected_filters.push(key) : "nothing"
  );
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Filter</InputLabel>
        <Select
          id="filterProtrait"
          multiple
          value={selected_filters}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {Object.entries(filters).map(([key, value]) => (
            <MenuItem key={key} value={key} id={key}>
              <Checkbox checked={value} color="primary" />
              <ListItemText primary={key} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
