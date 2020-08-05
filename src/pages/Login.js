import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import cookie from "react-cookies";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#264c8c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#264c8c",
    color: "#fff",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    session_token: "",
    error: "",
    open: false,
    userInfo: "",
    loginMessage: "message",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function sendMail(session_token) {
    //send mail function
    //only works in jtc productions
    var headers = {
      "Content-Type": "application/json",
      "X-DreamFactory-Session-Token": session_token,
      "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
    };
    var data = {
      to: [
        {
          name: state.email,
          email: state.email,
        },
      ],
      subject: "Here is your login link to access Data Catalog!",
      body_text:
        "Hello, click this link to login: " +
        process.env.REACT_APP_CATALOG_URL +
        "/Search?session=" +
        session_token,
      from_name: "JTC-Data_Engineering_Dept",
      from_email: "JTC-Data_Engineering_Dept@jtc.gov.sg",
      reply_to_name: "JTC-Data_Engineering_Dept",
      reply_to_email: "alan_chee@jtc.gov.sg",
    };

    axios
      .post(process.env.REACT_APP_PROXY_API + "/api/v2/jtccmg/", data, {
        headers: headers,
      })
      .then(() => {
        console.log("Mail sent!");
      })
      .catch((error) => {
        //console.log("Email Error: " + error);
      });
  }

  function processLogin() {
    var login = {
      email: state.email,
      password: process.env.REACT_APP_DF_PASSWORD,
      duration: 30,
    };
    var api_string = process.env.REACT_APP_PROXY_API + "/api/v2/user/session";
    //Axios API call
    axios
      .post(api_string, login)
      .then((response) => {
        // sendMail(response.data.session_token);
        console.log(
          process.env.REACT_APP_CATALOG_URL +
            "/Search?session=" +
            response.data.session_token
        );

        const expires = new Date();
        expires.setDate(Date.now() + 60 * 30);
        //save user email in cookie
        cookie.save("session_email", response.data.email, {
          path: "/",
          expires,
        });

        //prompt user to close login tab.
        setState({
          ...state,
          open: true,
          loginMessage:
            "Login Successful! Login link has been sent to your email and you may close this tab.",
        });
      })
      //if error
      .catch((error) => {
        setState({
          ...state,
          open: true,
          loginMessage: "Unregistered email, please contact administrator.",
        });
        console.log(error);
      });
  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Container component="main" maxWidth="xs">
      <br />
      <br />
      <br />
      <br />

      <div className={classes.paper}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={state.open}
          onClose={handleClose}
          message={state.loginMessage}
        />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Data Portal
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={state.email}
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={processLogin}
          >
            Get Login Link
          </Button>

          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Request Access"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
