import React from "react";
import "../globalcss.css";
import Rating from "@material-ui/lab/Rating";
import StarIcon from "@material-ui/icons/Star";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import cookie from "react-cookies";
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
  ratingNumber: {
    color: "#264c8c",
    fontSize: "1.5em",
  },
});

export default function ({ rating, database_id, getRating }) {
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
        defaultValue={0}
        value={rating}
        precision={0.5}
        onChange={(event, newValue) => {
          var id = cookie.load("session_email").split("@")[0] + database_id;
          // headers for api call
          const options = {
            headers: {
              "Content-Type": "application/json",
              "X-DreamFactory-Session-Token": cookie.load("session_token"),
              "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
            },
          };
          var api_string =
            process.env.REACT_APP_API_URL +
            "api/v2/datacatalog/_table/database_rating";
          var content = {
            resource: [
              {
                _id: id,
                rating: newValue,
              },
            ],
          };

          //Axios API call
          axios
            .put(api_string, content, options)
            .then((response) => {
              getRating();
            })
            .catch((error) => {});
          setOpen(true);
        }}
        icon={<StarIcon fontSize="inherit" />}
        size="large"
      />{" "}
      {/* <label className={classes.ratingNumber}>
        {rating ? rating.toFixed(2) : "Unrated"}
      </label> */}
    </div>
  );
}
