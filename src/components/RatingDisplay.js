import React from "react";
import "../globalcss.css";
import Rating from "@material-ui/lab/Rating";
import StarIcon from "@material-ui/icons/Star";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
const StyledRating = withStyles({
  iconFilled: {
    color: "#264c8c",
  },
  iconHover: {
    color: "#264c8c",
  },
})(Rating);

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

export default function () {
  const [value, setValue] = React.useState(2);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        message="Rating Submitted."
      />
      <label className="textColor h3">Rating:</label>
      <StyledRating
        name="ratingStars"
        defaultValue={2}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
          setOpen(true);
        }}
        icon={<StarIcon fontSize="inherit" />}
        size="large"
      />

      <label>{value}</label>
    </div>
  );
}
