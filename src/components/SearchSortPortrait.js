import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SearchSortPortrait({ sortBy, onChange }) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={onChange}
          inputProps={{
            name: "Sort By",
            id: "sortBy",
          }}
        >
          <MenuItem value={1}>Name Ascending</MenuItem>
          <MenuItem value={2}>Name Descending</MenuItem>
          <MenuItem value={3}>Date Ascending</MenuItem>
          <MenuItem value={4}>Date Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
