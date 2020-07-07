import React from "react";
import "../globalcss.css";
import axios from "axios";
import cookie from "react-cookies";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Session-Token": cookie.load("session_token"),
    "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
  },
};

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      open: false,
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.uploadComment = this.uploadComment.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleCommentChange(event) {
    this.setState({ ...this.state, comment: event.target.value });
  }
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };
  uploadComment() {
    var api_string =
      process.env.REACT_APP_API_URL + "api/v2/datacatalog/_table/data_comments";
    var content = {
      resource: [
        {
          dataset_id: this.props.database._id,
          commentor: cookie.load("session_email").split("@")[0],
          comment: this.state.comment,
          date: new Date().toLocaleDateString("en-US", DATE_OPTIONS),
        },
      ],
    };

    //Axios API call
    axios
      .post(api_string, content, options)
      .then((response) => {
        this.setState({ ...this.state, open: true, comment: "" });
        this.getComments();
      })
      .catch((error) => {});
  }
  getComments() {
    var search_string =
      process.env.REACT_APP_API_URL +
      "api/v2/datacatalog/_table/data_comments?filter=dataset_id=" +
      this.props.database._id;

    // Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        this.setState({
          ...this.state,
          comments: response.data.resource,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getComments();
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          onClose={this.handleClose}
          message="Comment Submitted."
        />
        <label className="textColor">
          --- Comments ({this.state.comments.length}) ---
        </label>

        <Paper style={{ padding: "30px 20px" }} className="mb-4">
          {this.state.comments.map((item, key) => (
            <div key={key}>
              {key ? (
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              ) : (
                ""
              )}
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <AccountCircleIcon fontSize="large" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <h4
                    className="textColor"
                    style={{ margin: 0, textAlign: "left" }}
                  >
                    {item.commentor}
                  </h4>
                  <p style={{ textAlign: "left" }}>{item.comment}</p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted on {item.date}
                  </p>
                </Grid>
              </Grid>
            </div>
          ))}
        </Paper>

        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={4}
          onChange={this.handleCommentChange}
          value={this.state.comment}
          variant="filled"
          //   placeholder="Placeholder"
          style={{ width: "100%" }}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          onClick={this.uploadComment}
        >
          Submit Comment
        </Button>
      </div>
    );
  }
}
