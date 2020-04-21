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
    minWidth: 120,
    maxWidth: 200,
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
        <InputLabel id="mutiple-checkbox-label">Filter</InputLabel>
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
        </Select>
      </FormControl>
    </div>
  );
}
