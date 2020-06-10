import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function sendMail(session_token) {
    var mailOptions = {
      service_id: "wadawiz_gmail_com",
      template_id: "otp",
      user_id: "user_fRgH9aiv9ZgBqcL8D9tWV",
      template_params: {
        toMail: state.email,
        token: session_token,
      },
    };
    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", mailOptions)
      .then(() => {
        console.log("Mail sent!");
      })
      .catch((error) => {
        console.log("Oops... " + error);
      });
  }

  function processLogin() {
    var login = {
      email: state.email,
      password: "123qweasD",
      duration: 5,
    };
    var search_string = "http://127.0.0.1/api/v2/user/session";
    //Axios API call
    axios
      .post(search_string, login)
      .then((response) => {
        // sendMail(response.data.session_token);
        console.log(response.data.session_token);
      })
      //if error
      .catch((error) => {
        setState({ ...state, open: true });
        console.log(error);
      });

    console.log(state.session_token);
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
      <CssBaseline />
      <div className={classes.paper}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={state.open}
          onClose={handleClose}
          message="Unregistered email, please contact administrator."
        />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          JTC Data Catalog
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
